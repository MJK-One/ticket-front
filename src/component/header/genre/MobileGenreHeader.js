import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FixedHeader from '../FixedHeader';
import './MobileGenreHeader.css';

const MobileGenreHeader = () => {
    // 장르 선택 wrap 표출 여부
    const [isGenreTapVisible, setIsGenreTapVisible] = useState(false);

    // 경로에 따라 장르를 결정하는 함수
    const location = useLocation();
    const getGenreFromPath = (path) => {
        switch(path) {
            case '/genre/musicall':
                return '뮤지컬/연극';
            case '/genre/consert':
                return '콘서트';
            case '/genre/exhibitionevent':
                return '전시/행사';
            case '/genre/classic':
                return '클래식';
            default:
                return ''; // 기본 경로는 전체 데이터를 가져옵니다
        }
    };

    const [selectedGenre, setSelectedGenre] = useState("");
    useEffect(() => {
        let genre = getGenreFromPath(location.pathname);
        setSelectedGenre(genre);
    }, [location.pathname])

    //
    return (
        <FixedHeader>

            <div className='mobile-genre-header'>
                {/* 선택 장르 title */}
                <div className='mobile-genre-title'>
                    <span className='mobile-g-t-span'>
                        {selectedGenre}
                    </span>
                    {isGenreTapVisible ? (
                        <button onClick={() => setIsGenreTapVisible(false)} className='mobile-g-t-btn'>
                            ▲
                        </button>
                    ) : (
                        <button onClick={() => setIsGenreTapVisible(true)} className='mobile-g-t-btn'>
                            ▼
                        </button>
                    )}
                </div>

                {/* 장르 선택 wrap */}
                {isGenreTapVisible && (
                    <div className='mobile-genre-wrap'>
                        <Link to="/genre/musicall" className={`mobile-g-w-a ${selectedGenre === "뮤지컬/연극" && "is-selected"}`}>
                            <img src={selectedGenre === "뮤지컬/연극" ? "/img/icon/genre/musical_on.png" : "/img/icon/genre/musical_off.png"} />
                            뮤지컬/연극
                        </Link>
                        <Link to="/genre/consert" className={`mobile-g-w-a ${selectedGenre === "콘서트" && "is-selected"}`}>
                            <img src={selectedGenre === "콘서트" ? "/img/icon/genre/concert_on.png" : "/img/icon/genre/concert_off.png"} />
                            콘서트
                        </Link>
                        <Link to="/genre/exhibitionevent" className={`mobile-g-w-a ${selectedGenre === "전시/행사" && "is-selected"}`}>
                            <img src={selectedGenre === "전시/행사" ? "/img/icon/genre/exh_on.png" : "/img/icon/genre/exh_off.png"} />
                            전시/행사
                        </Link>
                        <Link to="/genre/classic" className={`mobile-g-w-a ${selectedGenre === "클래식" && "is-selected"}`}>
                            <img src={selectedGenre === "클래식" ? "/img/icon/genre/classic_on.png" : "/img/icon/genre/classic_off.png"} />
                            클래식
                        </Link>
                    </div>
                )}
            </div>

        </FixedHeader>
    );
}
export default MobileGenreHeader;