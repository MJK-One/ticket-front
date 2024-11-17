import React, { useState, useEffect } from 'react';
import './scrollButtons.css';

const ScrollButtons = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  // 페이지 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // '맨 위로 이동' 버튼
      setShowTopButton(scrollTop > 100); // 100px 이상 스크롤했을 때

      // '맨 아래로 이동' 버튼
      setShowBottomButton(scrollTop < scrollHeight - clientHeight - 100); // 페이지 맨 아래에서 100px 떨어져 있을 때
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // '맨 위로 이동' 버튼 함수
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // '맨 아래로 이동' 버튼 함수
  const MoveToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      {showTopButton && (
        <button onClick={MoveToTop} className='scroll-btn'>
            <img src='/img/icon/search/window_up.png' className='scroll-btn-img' />
        </button>
      )}
      {showBottomButton && (
        <button onClick={MoveToBottom} className='scroll-btn'>
            <img src='/img/icon/search/window_down.png' className='scroll-btn-img'/>
        </button>
      )}
    </>
  );
};

export default ScrollButtons;