import { useState, useEffect } from 'react';
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Dialogmore_option from "../modals/dialogmore_option";
import CloseIcon from '@mui/icons-material/Close';
import CommentBox from '../post.component/commentBox';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setPosts, setSelectedPost } from '../../redux/postSlice';

const Dialogcomment = ({ isopen, onClose }) => {
    const [showOptions, setShowOptions] = useState(false)
    const { selectedPost, posts } = useSelector(store => store.post)
    const { user } = useSelector(store => store.auth)
    const [text, setText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [saved, setSaved] = useState(false);
    const dispatch = useDispatch()
    const [comment, setComment] = useState([]);

    // Tính toán liked và postLikes từ selectedPost hiện tại
    const liked = selectedPost?.likes?.includes(user?._id) || false;
    const postLikes = selectedPost?.likes?.length || 0;

    useEffect(() => {
        if (selectedPost) {
            setComment(selectedPost.comments)
        }
    }, [selectedPost]);

    if (!isopen) return null

    const toggleSave = () => {
        setSaved(!saved);
    };

    const handleEmojiClick = (emojiData) => {
        setText((prev) => prev + emojiData.emoji);
    };

    const commentHandler = async () => {
        try {
            const res = await axios.post(`/post/${selectedPost._id}/comment`, { text },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }, withCredentials: true
                }
            );
            if (res.data.success) {
                const updateCommentData = [...comment, res.data.comment];
                setComment(updateCommentData);
                const updatePostData = posts.map(p =>
                    p._id === selectedPost._id ? {
                        ...p,
                        comments: updateCommentData
                    } : p
                );
                dispatch(setPosts(updatePostData));
                
                // Cập nhật selectedPost với dữ liệu mới
                const updatedSelectedPost = {
                    ...selectedPost,
                    comments: updateCommentData
                };
                dispatch(setSelectedPost(updatedSelectedPost));
                
                toast.success(res.data.message);
                setText('');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.post(`/post/${selectedPost._id}/${action}`, {}, { withCredentials: true });
            if (res.data.success) {
                const updatedPostData = posts.map(p =>
                    p._id === selectedPost._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                
                // Cập nhật selectedPost với dữ liệu mới
                const updatedSelectedPost = {
                    ...selectedPost,
                    likes: liked ? selectedPost.likes.filter(id => id !== user._id) : [...selectedPost.likes, user._id]
                };
                dispatch(setSelectedPost(updatedSelectedPost));
                
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <article className="flex text-white mx-auto">
                <div>
                    <img
                        src={selectedPost?.image}
                        alt="imagepost"
                    />
                </div>
                <div className="flex flex-col bg-zinc-800">
                    {/* header */}
                    <div className="w-[500px] flex flex-col">
                        <header className="flex px-[10px] py-[10px] space-x-[5px] items-center">
                            <img
                                className="w-[40px] h-[40px] object-cover rounded-full border-[3px] border-r-pink-500 border-b-purple-400 border-l-yellow-400 border-t-orange-400 cursor-pointer"
                                src={selectedPost?.author.ProfilePicture}
                                alt="avatar"
                            />
                            <div className="inline-flex text-[12px] h-[20px] items-center font-semibold cursor-pointer">{selectedPost?.author.username}</div>
                            <MoreHorizIcon
                                onClick={() => setShowOptions(true)}
                                titleAccess="More options"
                                style={{ fontSize: 22, marginLeft: 'auto', cursor: 'pointer' }}
                            />
                        </header>

                    </div>
                    {/* body */}
                    <div className="w-[500px] h-[500px] overflow-y-auto hide-scrollbar flex flex-col">
                        <div className="flex flex-col space-y-[5px]">
                            <div className="flex items-center px-[10px] py-[10px] space-x-[10px]">
                                <img
                                    className="w-[40px] h-[40px] object-cover rounded-full border-[3px] border-r-pink-500 border-b-purple-400 border-l-yellow-400 border-t-orange-400 cursor-pointer"
                                    src={selectedPost?.author.ProfilePicture}
                                    alt="avatar"
                                />
                                <div className="text-[12px] items-center font-semibold leading-relaxed">
                                    <span className="font-semibold cursor-pointer">{selectedPost?.author.username}</span>{' '}
                                    <span className='font-normal'>{selectedPost?.caption}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-[5px]">
                            {
                                comment.map((comment) =>
                                    <CommentBox key={comment._id} comment={comment} />
                                )
                            }
                        </div>
                    </div>
                    {/* footer */}
                    <div className="w-[500px] flex flex-col mt-auto">
                        <footer className="flex flex-col px-[10px] py-[10px] items-center space-y-2 space-x-[5px]">
                            <div className="w-full">
                                <div className="flex w-full text-[14px] space-x-[10px] items-center">
                                    {
                                        liked ? (<FavoriteRoundedIcon titleAccess="Like" onClick={likeOrDislikeHandler} style={{ fontSize: 27, cursor: 'pointer', color: 'red' }} />)
                                            : (<FavoriteBorderRoundedIcon className="hover:text-gray-400" titleAccess="Like" onClick={likeOrDislikeHandler} style={{ fontSize: 27, cursor: 'pointer' }} />)
                                    }
                                    <ModeCommentOutlinedIcon
                                        onClick={() => setShowComment(true)}
                                        titleAccess="Comment"
                                        className="hover:text-gray-400"
                                        style={{ fontSize: 27, cursor: 'pointer' }}
                                    />
                                    <ShareOutlinedIcon titleAccess="Share" className="hover:text-gray-400" style={{ fontSize: 27, cursor: 'pointer' }} />
                                    {
                                        saved ? (<BookmarkIcon titleAccess="Save" onClick={toggleSave} style={{ fontSize: 27, cursor: 'pointer', color: 'white', marginLeft: 'auto' }} />)
                                            : (<TurnedInNotIcon titleAccess="Save" onClick={toggleSave} className="hover:text-gray-400" style={{ fontSize: 27, cursor: 'pointer', marginLeft: 'auto' }} />)
                                    }
                                </div>
                            </div>
                            {/* likes */}
                            <div className="w-full">
                                <div className="flex w-full">
                                    <div className="inline-flex text-[14px] items-center font-semibold cursor-pointer">{postLikes} likes</div>
                                </div>
                                <div className="flex w-full">
                                    <div className="inline-flex text-[12px] text-zinc-400 items-center cursor-pointer">19 hours ago</div>
                                </div>
                            </div>
                            {/* comments */}
                            <div className="flex w-full">
                                <textarea
                                    className="w-[490px] bg-zinc-800 text-white outline-none resize-none hide-scrollbar"
                                    placeholder="Add a comment..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                {text.trim().length > 0 && (
                                    <div className="w-[45px] h-[30px] flex items-center justify-center">
                                        <button onClick={commentHandler} className="text-sm font-semibold text-blue-500">Post</button>
                                    </div>
                                )}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowEmojiPicker(prev => !prev)}
                                        className="text-sm font-semibold"
                                    >
                                        <EmojiEmotionsIcon titleAccess="Emoji" className="hover:text-gray-400" style={{ fontSize: 20, cursor: 'pointer' }} />
                                    </button>

                                    {showEmojiPicker && (
                                        <div className="absolute bottom-[40px] right-0 z-50 shadow-lg">
                                            <EmojiPicker
                                                onEmojiClick={handleEmojiClick}
                                                theme="dark"
                                                height={350}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </article>
            <div className="flex items-center mb-auto ml-auto pt-[10px] pr-[10px]">
                <CloseIcon onClick={onClose} style={{ fontSize: 30, cursor: 'pointer' }} />
            </div>
            <Dialogmore_option isOpen={showOptions} onClose={() => setShowOptions(false)} />
        </div>
    )
}

export default Dialogcomment
