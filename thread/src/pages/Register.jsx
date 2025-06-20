import React from 'react'
import { useNavigate } from 'react-router-dom';
import Thumbnail from '../assets/thumbnails.png'
import Instagramlogo from '../assets/instagramlogo.png'
import FacebookIcon from '@mui/icons-material/Facebook';

const Register = () => {
  const navigate = useNavigate()
  return (
    <section className="w-screen h-screen">
      <div className="w-full h-full flex">
        <article className="flex w-[970px] h-full m-auto pb-[55px] pt-[55px] justify-center items-center">
          <div className="w-[580px] h-full">
            <img className="w-[545px] h-[460px] mt-[100px]" src={Thumbnail} alt="thumbnails" />
          </div>
          <div className="w-[360px] h-full flex flex-col">
            <div className="w-full flex items-center flex-col justify-center">
              <div className="w-[180px] pt-[30px] flex justify-center items-center">
                <img
                  title="Instagram"
                  src={Instagramlogo}
                  alt="Instagram"
                  className="w-full cursor-pointer"
                />
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center space-y-[20px]">
                  <form className='w-full' action="">
                    <div className="w-full flex justify-center items-center pb-[20px]">
                      <h4 className="w-3/4 text-zinc-300 text-center text-[16px]">Sign up to see photos and videos from your friends.</h4>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <div className="w-3/4 bg-blue-600 h-[35px] rounded-md flex justify-center items-center cursor-pointer">
                        <FacebookIcon style={{ fontSize: 25, color: 'white' }} />
                        <span className="text-white text-[14px] font-semibold ml-[10px]">Log in with Facebook</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center py-[15px]">
                      <div className="flex w-3/4 pt-[10px] items-center justify-center">
                        <div className="w-2/5 h-[0.4px] bg-zinc-700"></div>
                        <div className="w-1/5 text-white text-[12px] flex justify-center items-center">OR</div>
                        <div className="w-2/5 h-[0.4px] bg-zinc-700"></div>
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center pb-[10px]">
                      <input 
                        className="text-xs w-3/4 h-[35px] text-white outline-none resize-none bg-zinc-900 rounded-sm border-[1px] border-gray-500 px-3" 
                        type="text" 
                        placeholder="Phone number or email" 
                      />
                    </div>
                    <div className="w-full flex justify-center items-center pb-[10px]">
                      <input 
                        className="text-xs w-3/4 h-[35px] text-white outline-none resize-none bg-zinc-900 rounded-sm border-[1px] border-gray-500 px-3" 
                        type="password" 
                        placeholder="Password" 
                      />
                    </div>
                    <div className="w-full flex justify-center items-center pb-[10px]">
                      <input 
                        className="text-xs w-3/4 h-[35px] text-white outline-none resize-none bg-zinc-900 rounded-sm border-[1px] border-gray-500 px-3" 
                        type="text" 
                        placeholder="Fullname" 
                      />
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <input 
                        className="text-xs w-3/4 h-[35px] text-white outline-none resize-none bg-zinc-900 rounded-sm border-[1px] border-gray-500 px-3" 
                        type="text" 
                        placeholder="Username" 
                      />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center pt-[10px] space-y-[10px]">
                      <span className="w-3/4 text-center text-gray-400 text-[12px]">
                        People who use our service may have uploaded your contact information to Instagram.{' '}
                        <span className="text-blue-400 cursor-pointer hover:text-blue-300">Learn more</span>
                      </span>
                      <span className="w-3/4 text-center text-gray-400 text-[12px]">
                        By signing up, you agree to our{' '}
                        <span className="text-blue-400 cursor-pointer hover:text-blue-300">Terms</span>{' '}
                        {', '}
                        <span className="text-blue-400 cursor-pointer hover:text-blue-300">Privacy Policy</span>{' '}
                        and
                        <span className="text-blue-400 cursor-pointer hover:text-blue-300"> Cookies Policy</span>{'.'}
                      </span>
                    </div>             
                    <div className="w-full flex justify-center items-center pt-[15px]">
                      <button className="w-3/4 h-[30px] text-gray-300 bg-blue-700 rounded-lg border-[1px] border-gray-500">Sign up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center pt-[55px] space-x-1">
              <span className="text-white text-[14px]">Have an account?</span>
              <span
                className="text-blue-400 text-[14px] font-semibold cursor-pointer hover:text-blue-300"
                onClick={() => navigate('/login')}
              >
                Log in
              </span>
            </div>
          </div>
        </article>
      </div>
      <div className="text-white text-[20px] flex justify-center items-center w-full h-1/5 border-[1px]">Footer</div>
    </section>
  )
}

export default Register
