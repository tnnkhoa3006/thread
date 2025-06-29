import sharp from "sharp";
import cloudinary from "cloudinary";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) {
            return res.status(400).json({
                message: "Image is required",
                success: false
            })
        }

        const optimizedImageBuffer = await sharp(image.buffer)
        .resize({width: 800, height: 800, fit:'inside'})
        .toFormat('jpeg', {quality: 90})
        .toBuffer();

        const fileUrl = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUrl);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });

        const user = await User.findById(authorId);
        if(user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({path: 'author', select: '-password'});

        return res.status(200).json({
            message: "Post created successfully",
            post,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
        .populate({path: 'author', select: '-password'})
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'username ProfilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({author: authorId}).sort({createdAt: -1})
        .populate({path: 'author', select: '-password'})
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'username ProfilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const likeUserId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: "Post does not exist",
                success: false
            })
        }

        await post.updateOne({$addToSet: {likes: likeUserId}});
        await post.save();
        return res.status(200).json({
            message: "Post liked successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const disLikePost = async (req, res) => {
    try {
        const likeUserId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: "Post does not exist",
                success: false
            })
        }

        await post.updateOne({$pull: {likes: likeUserId}});
        await post.save();
        return res.status(200).json({
            message: "Post disliked successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (req, res) => {
    try {
        const authorId = req.id;
        const postId = req.params.id;
        const {text} = req.body;
        const post = await Post.findById(postId);
        if (!text) return res.status(400).json({
            message: "Text is required",
            success: false
        })
        if (!post) {
            return res.status(400).json({
                message: "Post does not exist",
                success: false
            })
        }

        const comment = await Comment.create({
            text,
            author: authorId,
            post: postId
        })

        await comment.populate({path: 'author', select: 'username ProfilePicture'});

        post.comments.push(comment._id);
        await post.save();

        return res.status(200).json({
            message: "Comment added successfully",
            comment,
            success: true
        })
    } catch (error) {
        
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(400).json({
            message: "Post does not exist",
            success: false
        })

        if (post.author.toString() !== authorId) return res.status(401).json({
            message: "authorization denied",
        })

        await Post.findByIdAndDelete(postId);

        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        await Comment.deleteMany({post: postId});

        return res.status(200).json({
            message: "Post deleted successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({post: postId}).sort({createdAt: -1}).populate({
            path: 'author',
            select: 'username ProfilePicture'
        });
        return res.status(200).json({
            comments,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);

        if(!post) return res.status(400).json({
            message: "Post does not exist",
            success: false
        })

        const user = await User.findById(authorId);
        if(user.bookmarks.includes(post._id)){
            await user.updateOne({$pull: {bookmarks: post._id}});
            await user.save();
            return res.status(200).json({
                type: "unbookmark",
                message: "Post unbookmarked successfully",
                success: true
            })
        } else {
            await user.updateOne({$addToSet: {bookmarks: post._id}});
            await user.save();
            return res.status(200).json({
                type: "bookmark",
                message: "Post bookmarked successfully",
                success: true
            })
        }
    } catch (error) {
        console.log(error);
    }
}