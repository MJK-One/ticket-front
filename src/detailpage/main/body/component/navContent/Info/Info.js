import React from 'react';
import './Info.css';

const NavInfo = () => {
    /*
    데이터 불러오기
     */
    //공연 시간 데이터(가데이터)
    const infoTimeData = {text: '예매가능시간: 관람 4시간 전까지', list: '화,목,금 7시30분 / 수 3시, 7시30분 / 토,일 2시, 6시30분 / 공휴일 3시 (월 공연없음, 일자별 상이)'};

    //공지사항(가데이터)
    const infoNoticeData = {text: '매수제한 : 회차 당 1인 4매', img: 'https://ticketimage.interpark.com/Play/ITM/Data/Modify/2024/3/2024030413134576.jpg'};
    const infoNoticeImgList = infoNoticeData.img.split(/,\s*/);

    //할인정보(가데이터)
    const infoSaleData = {img: 'https://ticketimage.interpark.com/Play/ITM/Data/Modify/2024/3/2024032719245008.jpg'};
    const infoSaleImgList = infoSaleData.img.split(/,\s*/);

    //공연 상세(가데이터): 이미지가 여러개 존재하는 경우 ', '로 구분함, link가 걸린 관련 공연 이미지가 있음
    const infoDetailData = {img: '//ticketimage.interpark.com/Play/image/etc/24/24001020-12.jpg, //ticketimage.interpark.com/Play/image/etc/24/24001020-15.jpg',
        link: 'https://tickets.interpark.com/goods/23017766, https://tickets.interpark.com/goods/24001473',
        link_img: '//ticketimage.interpark.com/Play/image/etc/24/24001020-05.jpg, //ticketimage.interpark.com/Play/image/etc/24/24001020-07.jpg'
    }
    const infoDetailImgList = infoDetailData.img.split(/,\s*/);
    const infoDetailLinkList = infoDetailData.link.split(/,\s*/);
    const infoDetailLImgList = infoDetailData.link_img.split(/,\s*/);

    /* 공연 정보 */
    const infoNoticeImg = infoNoticeImgList.map((src, i) => (
        <React.Fragment key={`MB-info-notice-img-${i}`}>
            <img src={src} style={{ width: '100%' }} alt='' />
            {i % 2 === 1 && <br />}
        </React.Fragment>
    ));

    const infoSaleImg = infoSaleImgList.map((src, i) => (
        <React.Fragment key={`MB-info-sale-img-${i}`}>
            <img src={src} style={{ width: '100%' }} alt=''/>
            {i % 2 === 1 && <br />}
        </React.Fragment>
    ));

    const infoDetailImg = Array.from({length: infoDetailImgList.length}).map((_, i) => (
        <p key={`MB-info-det-img-${i}`}>
            <strong>
                <img src={infoDetailImgList[i]} alt=''/>
            </strong>
        </p>
    ));

    let infoDetailLImg = null;

    if(infoDetailLImgList.length === infoDetailLinkList.length) {
        infoDetailLImg = Array.from({length: infoDetailLImgList.length}).map((_, i) => (
            <p key={`MB-info-det-limg-${i}`}>
                <strong>
                    <a href={infoDetailLinkList[i]} target='_blank'>
                        <img src={infoDetailLImgList[i]} alt=''/>
                    </a>
                </strong>
            </p>
        ));
    }

    //return
    return (
        <div>
            <div className="prdContents detail">
                {/* 공연시간 */}
                <div className='content' key='MB-info-content2'>
                    <h3 className='contentTitle'>공연시간 정보</h3>
                    <div className='contentDetail'>
                        <p className='contentDetailText'>{infoTimeData.text}</p>
                        <ul className='contentDetailList'>
                            <div>
                                {infoTimeData.list}
                            </div>
                        </ul>
                    </div>
                </div>

                {/* 공지사항 */}
                <div className='content' key='MB-info-content3'>
                    <h3 className='contentTitle'>공지사항</h3>
                    <div className='contentDetail'>
                        {(infoNoticeData.text != null) && infoNoticeData.text}{/* text가 null이 아니면 값을 넣음 */}
                        {(infoNoticeData.text != null) && (<br />)}
                        {(infoNoticeData.text != null) && (<br />)}
                        {infoNoticeImg}
                    </div>
                </div>

                {/* 할인정보 */}
                <div className='content' key='MB-info-content4'>
                    <h3 className='contentTitle'>할인정보</h3>
                    <div className='contentDetail'>
                        {infoSaleImg}
                    </div>
                </div>

                {/* 공연 상세/ 캐스팅 일정 */}
                <div className='content description'>
                    <h3 className='contentTitle'>공연상세/ 캐스팅일정</h3>
                    <div className='contentDetail'>
                        {infoDetailImg}
                        {infoDetailLImg}
                    </div>
                </div>

            </div>
        </div>
    );
};
export default NavInfo;