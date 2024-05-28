import React, {useState} from 'react';
import './MainTop.css';

const MainTop = () => {
    //데이터 불러오기(현재 가데이터)
    const genre = "뮤지컬";
    const genreText = "> " + genre;
    const prdTitle = "뮤지컬 〈헤드윅〉"; //상품 제목
    const prdPosterSrc = "//ticketimage.interpark.com/Play/image/large/24/24001020_p.gif"; //포스터 이미지 링크
    const prdCastNum = 7554; //좋아요 수(하트 버튼)


    //티켓캐스트 하트 버튼 이벤트
    const [isTkHeartBtn, setisTkHeartBtn] = useState(false);
        /* 이벤트 함수 */
    const tkHeartBtnHandler = () => {
        setisTkHeartBtn(!isTkHeartBtn); //클릭되면 상태를 반전함
        //숫자 아직 적용 안함
    }

        //p tag 항목
    //데이터 불러오기(가데이터)
    const infoPeriod = "2024.03.22 ~2023.06.23";
    const infoPlace = "샤롯데씨어터"; //장소
    const infoOpenDateTime = "yyyy-MM-dd hh:mm";
    const infoPreOpenDateTime = "정보없음";

    const infoP = [{label: '공연 기간', text: infoPeriod},
        {label: '공연 장소', text: infoPlace},
        {label: '티켓 오픈', text: infoOpenDateTime},
        {label: '선예매 오픈', text: infoPreOpenDateTime}]; //p태그인 info

    const infoItemP = Array.from({length: infoP.length}).map((_, i) => (
        <li className='infoItem' key={`PMT-info-p-${i}`}>
            <strong className='infoLabel'>{infoP[i].label}</strong>
            <div className='infoDesc'>
                <p className={`infoText ${infoP[i].label == '공연 장소' ? 'is-place' : ''}`}>{infoP[i].text}</p>
            </div>
        </li>
    ));

    
    //return
    return (
        <div className='productMainTop'>
            <div className='summary'>
                {/* 장르, 제목 */}
                <div className='summaryTop'>
                    <div className='summaryTopLeft'>
                        <div className='genre'>
                            <div className='genreText'>
                                <span>{genreText}</span>
                            </div>
                        </div>
                        <h2 className='prdTitle'>{prdTitle}</h2>
                    </div>
                    
                    <div className='summaryTopRight'>
                        <div className='regDate'>
                            <div className='regDateText'>
                                <span>등록일: 2024.05.29</span>
                            </div>
                        </div>
                        <div className='view'>
                            <div className='viewText'>
                                <span>조회수: 2222</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 포스터, 정보 */}
                <div className='summaryBody'>
                    <div className='posterBox'>
                        {/* 포스터 이미지 */}
                        <div className='posterBoxTop'>
                            <img className='posterBoxImage' src={prdPosterSrc} alt={prdTitle} />
                        </div>

                        {/* 좋아요 */}
                        <div className='posterBoxBottom'>
                            <div className='prdCast'>
                                <div className='prdCastWrap'>
                                    <a className={`prdCastBtn ${isTkHeartBtn ? 'is-toggled' : ''}`} role='checkbox' onClick={tkHeartBtnHandler}>
                                        좋아요
                                    </a>
                                    <p className='prdCastNum'>{prdCastNum}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='infoBox'>
                        <ul className='info'>
                            {infoItemP}
                        </ul>

                        {/* 예매 버튼 */}
                        <ul className='btnList'>
                            <li className='is-main'>
                                <a className='bookingBtn' href='#'>
                                    <span>예매 사이트 바로가기</span>
                                </a>
                            </li>
                            <li className='is-direct'>
                                <a className='bookingBtn' href='#'>
                                    <span>예매 사이트 바로가기</span>
                                </a>
                            </li>
                            <li className='is-direct'>
                                <a className='bookingBtn' href='#'>
                                    <span>예매 사이트 바로가기</span>
                                </a>
                            </li>
                            <li className='is-direct'>
                                <a className='bookingBtn' href='#'>
                                    <span>예매 사이트 바로가기</span>
                                </a>
                            </li>
                            <li className='is-direct'>
                                <a className='bookingBtn' href='#'>
                                    <span>예매 사이트 바로가기</span>
                                </a>
                            </li>
                        </ul>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default MainTop;