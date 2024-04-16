import React, {useState} from 'react';
import './MainTop.css';

const MainTop = () => {
    //데이터 불러오기(현재 가데이터)
    const tagText = "뮤지컬 주간 1위"; //필요 없을 시 삭제
    const prdTitle = "뮤지컬 〈헤드윅〉"; //상품 제목
    const prdStarScore = 9.9; //상품 평점
    const prdStar = Math.round(prdStarScore) / 2; //별 5개 기준으로 환산
    const prdPosterSrc = "//ticketimage.interpark.com/Play/image/large/24/24001020_p.gif"; //포스터 이미지 링크
    const prdCastNum = 7554; //좋아요 수(하트 버튼)

    //공유 버튼 만들기
    const shareSns = ['facebook','twitter'];
    const shareItem = Array.from({length: shareSns.length}).map((_, i) => (
        <li className={`shareItem is-${shareSns[i]}`} key={`PMT-share-${shareSns[i]}`}>
            <a className='link' href='#' data-sns={shareSns[i]}></a>
        </li>
    ));
    const shareList = (
        <ul className='shareList'>
            {shareItem}
        </ul>
    );

    //티켓캐스트 하트 버튼 이벤트
    const [isTkHeartBtn, setisTkHeartBtn] = useState(false);
        /* 이벤트 함수 */
    const tkHeartBtnHandler = () => {
        setisTkHeartBtn(!isTkHeartBtn); //클릭되면 상태를 반전함
        //숫자는 안 올라가게(실제 사이트에 적용이 안되므로)
    }

    //info
        //장소
    const infoPlace = "샤롯데씨어터"; //데이터 불러오기(가데이터)
    const infoItemPlace = (
        <li className='infoItem' key='PMT-info-place'>
            <strong className='infoLabel'>장소</strong>
            <div className='infoDesc'>
                <a className='infoBtn' role='button' href='#'>
                    {infoPlace}
                    <i>(자세히)</i>{/* 팝업으로 장소를 띄우지 않는다면 이 부분(i 태그) 삭제 */}
                </a>
            </div>
        </li>
    );

        //p tag 항목
    //데이터 불러오기(가데이터)
    const infoPeriod = "2024.03.22 ~2023.06.23";
    const infoTime = "135분";
    const infoAge = "17세 이상 관람가";

    const infoP = [{label: '공연기간', text: infoPeriod},
        {label: '공연시간', text: infoTime},
        {label: '관람연령', text: infoAge}]; //p태그인 info

    const infoItemP = Array.from({length: infoP.length}).map((_, i) => (
        <li className='infoItem' key={`PMT-info-p-${i}`}>
            <strong className='infoLabel'>{infoP[i].label}</strong>
            <div className='infoDesc'>
                <p className='infoText'>{infoP[i].text}</p>
            </div>
        </li>
    ));

        //가격
    //데이터 불러오기(가데이터)
    const infoPriceData = [{seatType: 'VIP', price: "150,000원"},
    {seatType: 'R', price: "130,000원"},
    {seatType: 'S', price: "100,000원"},
    {seatType: 'A', price: "80,000원"}];

    //전체 가격 -> 이 부분은 팝업을 활용해 각 할인율(카드-재관람-국가유공자-장애인 할인)에 따른 최종 가격을 보여줌. 필요없을 시 삭제
    const infoItemPriceAll = (
        <li className='infoPriceItem is-largePrice' key='PMT-info-price-all'>
            <a className='infoBtn' role='button' href='#'>
                전체가격보기
                <i>(자세히)</i>
            </a>
        </li>
    );

    //각 가격 정보
    const infoItemPriceSeat = Array.from({length: infoPriceData.length}).map((_, i) => (
        <li className='infoPriceItem' key={`PMT-info-price-seat-${i}`}>
            <span className='name'>{`${infoPriceData[i].seatType}석`}</span>
            <span className='price'>{infoPriceData[i].price}</span>
        </li>
    ));

    //최종 가격 리스트
    const infoItemPrice = (
        <li className='infoItem infoPrice' key='PMT-info-price'>
            <strong className='infoLabel'>가격</strong>
            <div className='infoDesc'>
                <ul className='infoPriceList'>
                    {infoItemPriceAll}
                    {infoItemPriceSeat}
                </ul>
            </div>
        </li>
    );

    //혜택 링크: 해당 혜택은 인터파크 기준임. 다른 사이트의 혜택도 긁어오거나, 불가능하면 삭제.
    const infoBenefitNol = "https://nol.interpark.com/promotion/nol-promotion?mchtNo=INTERPARK_TICKET&mchtDtlNo=07&eventCode=NOIII";
    const infoBenefitToping = "https://ticket.interpark.com/Contents/Toping";

    const infoItemBenefit = (
        <li className='infoItem infoBenefit' key='PMT-info-benefit'>
            <strong className='infoLabel'>혜택</strong>
            <div className='infoDesc'>
                <div className='infoBenefitGuide'>
                    <a className='infoBtn' role='button' href='#'>
                        무이자할부
                        <i>(자세히)</i>
                    </a>
                </div>

                <div className='infoBenefitList'>
                    <a className='infoLink' key='PMT-info-benefit-link1' href={infoBenefitNol} target='_blank'>
                        <span className='logo-nolpoint'>놀포인트</span>
                        NOL 카드로 최대 7만원 혜택받기
                    </a>
                    <a className='infoLink' key='PMT-info-benefit-link2' href={infoBenefitToping} target='_blank'>
                        <span className='logo-toping'>토핑</span>
                        가입하고 중복할인 쿠폰받기
                    </a>
                </div>
            </div>
        </li>
    );

    //return
    return (
        <div className='productMainTop'>
            <div className='summary'>
                {/* tag, 제목, 별점 */}
                <div className='summaryTop'>
                    <div className='tag'>
                        <div className='tagText'>
                            <span>{tagText}</span>
                        </div>
                    </div>
                    <h2 className='prdTitle'>{prdTitle}</h2>
                    <div className='prdTitleBottom'>
                        {/* 평점 */}
                        <a href='#'>
                            <div className='prdStar'>
                                {/* 별점 바탕 */}
                                <div className='prdStarBack'>
                                    {/* 별점 칠하기 */}
                                    <div className='prdStarIcon' data-star={prdStar}></div>
                                </div>
                                <div className='prdStarScore'>
                                    <span className='blind'>평점:</span>
                                    {prdStarScore}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* 포스터, 정보 */}
                <div className='summaryBody'>
                    <div className='posterBox'>
                        {/* 포스터 이미지 */}
                        <div className='posterBoxTop'>
                            <img className='posterBoxImage' src={prdPosterSrc} alt={prdTitle} />
                        </div>

                        {/* 좋아요, 공유 */}
                        <div className='posterBoxBottom'>
                            <div className='prdCast'>
                                <div className='prdCastWrap'>
                                    <a className={`prdCastBtn ${isTkHeartBtn ? 'is-toggled' : ''}`} role='checkbox' onClick={tkHeartBtnHandler}>
                                        좋아요
                                    </a>
                                    <p className='prdCastNum'>{prdCastNum}</p>
                                </div>
                            </div>

                            <div className='share'>
                                {shareList}
                            </div>
                        </div>
                    </div>

                    <ul className='info'>
                        {infoItemPlace}
                        {infoItemP}
                        {infoItemPrice}
                        {infoItemBenefit}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default MainTop;