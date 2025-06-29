import React from 'react'
import LeftSide from '../components/home.component/leftSide'
import RightSide from '../components/home.component/rightSide'
import CenterSide from '../components/home.component/centerSide'
import UseGetAllPort from '../hooks/useGetAllPort.jsx'

const Home = () => {
  UseGetAllPort();
  return (
    <div className="flex h-screen w-screen">
      <div className="flex-[1.6] bg-black h-screen text-white">
        <LeftSide />
      </div>
      <div className="flex-[5] bg-black h-screen text-white">
        <CenterSide />
      </div>
      <div className="flex-[3.4] bg-black text-white">
        <RightSide />
      </div>
    </div>
  )
}

export default Home
