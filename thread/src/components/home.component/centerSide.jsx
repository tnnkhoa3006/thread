import { useRef } from 'react';
import PostCard from '../post.component/postCard'; // Assuming PostCard is a separate component

const CenterSide = () => {
  const scrollRef = useRef(null)
  const postData =
  [
    {
      id: 1,
      user: "Gigachad Man Mewing",
      avatar: "https://i1.sndcdn.com/artworks-iNZ7PnppFNtWQrPl-6Uy9jw-t500x500.jpg",
      image: "https://th.bing.com/th/id/OIP.BOvewLhwVkCXVRuFWKgMYgHaLH?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
      time: "5h",
      likes: "60,000",
      caption: `"This means everything. My entire life I wanted to be an actor..."`,
      commentCount: "1,652"
    },
    {
      id: 2,
      user: "Sigma Boss",
      avatar: "https://i1.sndcdn.com/artworks-iNZ7PnppFNtWQrPl-6Uy9jw-t500x500.jpg",
      image: "https://th.bing.com/th/id/OIP.BOvewLhwVkCXVRuFWKgMYgHaLH?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
      time: "2h",
      likes: "41,900",
      caption: `"Never chase. Just attract. What belongs will simply find you."`,
      commentCount: "783"
    }
  ];
  let isDown = false
  let startX
  let scrollLeft

  const handleMouseDown = (e) => {
    isDown = true
    scrollRef.current.classList.add('active')
    startX = e.pageX - scrollRef.current.offsetLeft
    scrollLeft = scrollRef.current.scrollLeft
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1 // tốc độ kéo
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    isDown = false
    scrollRef.current.classList.remove('active')
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="w-full relative">
      {/* Header section */}
      <div 
        className="overflow-x-auto hide-scrollbar overflow-y-hidden w-[643px] relative left-[120px] top-[25px]"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        style={{ cursor: 'grab', userSelect: 'none' }}
      >
        <div className="flex items-center w-max space-x-[13px]">
          {[...Array(15)].map((_, index) => (
            <div key={index} className="w-max h-[100px] space-y-[2px] flex-shrink-0 hover:cursor-pointer">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-[4px] border-r-pink-500 border-b-purple-400 border-l-yellow-400 border-t-orange-400">
                <img
                  src="https://ts3.mm.bing.net/th?id=OIP.0LKDeICeagHJN54PrY-EcwHaEK&pid=15.1"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white text-[10px] w-[80px] h-[20px] text-center">Donald Trump</div>
            </div>
          ))}
        </div>
      </div>
      {/* Post section */}
      <div className="flex flex-col items-center gap-[20px] mt-[50px] pl-[65px]">
        {postData.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
    </div>
  )
}

export default CenterSide
