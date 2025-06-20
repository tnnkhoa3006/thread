import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileImage from '../../assets/hangnga.jpg'
import Instagramlogo from '../../assets/instagramlogo.png'
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import GestureIcon from '@mui/icons-material/Gesture';

const LeftSide = () => {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen fixed top-0 left-0 w-[245px] z-50 border-r border-zinc-700">
      <div className="w-[100px] relative">
        <img
          title="Instagram"
          src={Instagramlogo}
          alt="Instagram"
          className="absolute top-[40px] left-[30px] cursor-pointer"
          onClick={() => navigate('/')}
        />
        {/* This is above part */}
        <div className="absolute top-[100px] left-[10px] space-y-1.5">
          <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4" onClick={() => navigate('/')}>
            <HomeFilledIcon style={{ fontSize: 30 }} />
            <div className="text-[16px] font-bold">Home</div>
          </div>
          <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
            <SearchIcon style={{ fontSize: 30 }} />
            <div className="text-[16px] font-medium">Search</div>
          </div>
          <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
            <ExploreIcon style={{ fontSize: 30 }} />
            <div className="text-[16px] font-medium">Explore</div>
          </div>
          <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
            <SmartDisplayIcon style={{ fontSize: 30 }} />
            <div className="text-[16px] font-bold">Reels</div>
          </div>
          <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
            <SendIcon style={{ fontSize: 30 }} />
            <div className="text-[16px] font-medium">Messages</div>
          </div>
          <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
            <FavoriteBorderIcon style={{ fontSize: 30 }} />
            <div className="text-[16px] font-medium">Notifications</div>
          </div>
          <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
            <AddCircleOutlineIcon style={{ fontSize: 30 }} />
            <div className="text-[16px] font-medium">Create</div>
          </div>
          <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
            <img className="w-[30px] h-[30px] rounded-full" src={ProfileImage} alt="progile image" />
            <div className="text-[16px] font-medium">Profile</div>
          </div>

          {/* This is below part */}
          <div className="absolute top-[450px] space-y-2">
            <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
              <PanoramaFishEyeIcon style={{ fontSize: 30 }} />
              <div className="text-[16px] font-medium">Meta AI</div>
            </div>
            <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
              <GestureIcon style={{ fontSize: 30 }} />
              <div className="text-[16px] font-medium">Threads</div>
            </div>
            <div className="w-[220px] h-[50px] flex items-center space-x-2 hover:cursor-pointer hover:bg-zinc-800 rounded-md px-4">
              <MenuIcon style={{ fontSize: 30 }} />
              <div className="text-[16px] font-medium">More</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSide
