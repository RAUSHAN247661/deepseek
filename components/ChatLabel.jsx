import { assets } from '@/assets/assets'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const ChatLabel = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const chatLabelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (chatLabelRef.current && !chatLabelRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div ref={chatLabelRef} className='flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer'>
        <p className='group-hover:max-w-5/6 truncate'> Chat Name Here  </p>
        <div className='group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg'>
            <Image src={assets.three_dots} alt="" className='w-4' onClick={() => setMenuOpen((open) => !open)} />
            {menuOpen && (
              <div className='absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2'>
                  <div className='flex items-center gap-3 px-3 py-2  hover:bg-white/10 rounded-lg cursor-pointer'>
                      <Image src={assets.pencil_icon} alt="" className='w-4'/>
                      <p> Rename </p>
                  </div>

                  <div className='flex items-center gap-3 px-3 py-2  hover:bg-white/10 rounded-lg cursor-pointer'>
                      <Image src={assets.delete_icon} alt="" className='w-4'/>
                      <p> Delete </p>
                  </div>
              </div>
            )}
        </div>
    </div>
  )
}

export default ChatLabel