// components/PostCard.jsx
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const PostCard = ({ data }) => {
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  const handleEmojiClick = (emojiData) => {
    setInputText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="w-[560px] bg-black text-white">
      {/* Header */}
      <div className="w-full h-[50px] flex items-center pl-[80px] space-x-[5px]">
        <img
          className="w-[40px] h-[40px] object-cover rounded-full border-[3px] border-r-pink-500 border-b-purple-400 border-l-yellow-400 border-t-orange-400 cursor-pointer"
          src={data.avatar}
          alt="avatar"
        />
        <div className="inline-flex text-[12px] h-[20px] items-center font-semibold cursor-pointer">{data.user}</div>
        <div className="flex w-[80px] h-[20px] space-x-[3px]">
          <div className="text-gray-400 text-[12px] w-[5px] h-[5px] font-extrabold">•</div>
          <div className="text-gray-400 text-[12px] w-[50px] h-[20px] pt-[1.5px] cursor-pointer">{data.time}</div>
        </div>
        <MoreHorizIcon titleAccess="More options" style={{ fontSize: 22, marginLeft: 'auto', cursor: 'pointer' }} />
      </div>

      {/* Image */}
      <div className="w-full pl-[80px]">
        <img className="w-full object-cover" src={data.image} alt="post" />
        <div className="flex w-full h-[50px] text-[14px] space-x-[10px] items-center">
          {
            liked ?(<FavoriteRoundedIcon titleAccess="Like" onClick={toggleLike} style={{ fontSize: 27, cursor: 'pointer', color: 'red' }}/>) 
            : (<FavoriteBorderRoundedIcon className="hover:text-gray-400" titleAccess="Like" onClick={toggleLike} style={{ fontSize: 27, cursor: 'pointer'}}/>)
          }
          <ModeCommentOutlinedIcon titleAccess="Comment" className="hover:text-gray-400" style={{ fontSize: 27, cursor: 'pointer' }} />
          <ShareOutlinedIcon titleAccess="Share" className="hover:text-gray-400" style={{ fontSize: 27, cursor: 'pointer' }} />
          {
            saved ? (<BookmarkIcon titleAccess="Save" onClick={toggleSave} style={{ fontSize: 27, cursor: 'pointer', color: 'white', marginLeft: 'auto' }} />)
            : (<TurnedInNotIcon titleAccess="Save" onClick={toggleSave} className="hover:text-gray-400" style={{ fontSize: 27, cursor: 'pointer', marginLeft: 'auto' }} />)
          }
        </div>
      </div>

      {/* Content */}
      <div className="w-full pl-[80px] space-y-[5px]">
        <div className="flex w-full h-[35px]">
          <div className="inline-flex h-[35px] text-[14px] items-center font-semibold cursor-pointer">{data.likes} likes</div>
        </div>

        <div className="w-full text-sm font-normal leading-relaxed">
          <span alt="username" className="font-semibold text-sm cursor-pointer">instagram</span>{' '}
          {data.caption}
        </div>

        <div className="w-full text-[15px] text-gray-400 cursor-pointer">View all {data.commentCount} comments</div>

        {/* Comment box */}
        <div className="flex w-full">
          <textarea
            className="w-[490px] bg-black text-white outline-none resize-none hide-scrollbar"
            placeholder="Add a comment..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {inputText.trim().length > 0 && (
            <div className="w-[45px] h-[30px] flex items-center justify-center">
              <button className="text-sm font-semibold text-blue-500">Post</button>
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
        <div className="w-[480px] border-b border-gray-700 mx-auto" />
      </div>
    </div>
  );
};

export default PostCard;
