import React from 'react'

const RightSide = () => {
  return (
    <div className="w-[370px]">
      <div className="w-6/7 pl-[54px] pt-[30px]">
        <div className="flex w-full pl-[15px]">
          <img
            className="w-[50px] h-[50px] object-cover rounded-full border-[3px] border-r-pink-500 border-b-purple-400 border-l-yellow-400 border-t-orange-400" 
            src="https://i1.sndcdn.com/artworks-iNZ7PnppFNtWQrPl-6Uy9jw-t500x500.jpg" 
            alt="" 
          />
          <div className="flex w-[200px] flex-col justify-center pl-[10px]">
            <span className="text-white text-[13px] font-semibold">Gigachad</span>
            <span className="text-gray-400 text-[12px]"> @realChad🗿</span>
          </div>
          <div className='flex items-center justify-center'>
            <span className="text-blue-400 font-medium text-[12px] cursor-pointer ml-[14px] hover:underline hover:text-blue-300">Switch</span>
          </div>
        </div>
        <div className="w-full pl-[15px] pt-[20px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-5/6 items-center space-x-[130px]">
              <span className="text-gray-400 text-[14px]">Suggested for you</span>
            </div>
            <div className="flex w-1/6 items-center justify-center cursor-pointer">
              <span className="text-white text-[12px] ml-[10px] font-semibold hover:text-zinc-500">See All</span>
            </div>
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex w-full space-x-[10px] items-center mt-[10px]">
              <img
                className="w-[50px] h-[50px] object-cover rounded-full border-[3px] border-r-pink-500 border-b-purple-400 border-l-yellow-400 border-t-orange-400 cursor-pointer" 
                src="https://i1.sndcdn.com/artworks-iNZ7PnppFNtWQrPl-6Uy9jw-t500x500.jpg" 
                alt="" 
              />
              <div className="flex w-[200px] flex-col justify-center">
                <span className="text-white text-[13px] font-semibold cursor-pointer">Gigachad</span>
                <span className="text-gray-400 text-[12px]">Suggested for you</span>
              </div>
              <div className='flex items-center justify-center'>
                <span className="text-blue-400 font-medium text-[12px] cursor-pointer ml-[10px] hover:text-blue-300">Follow</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightSide
