import './SideBtns.css';

const SideBtns = () => {
    const nol_link = "https://nol.interpark.com/promotion/nol-promotion?mchtNo=INTERPARK_TICKET&mchtDtlNo=07&eventCode=NOIII";
    const playdb_link = "http://www.playdb.co.kr/playdb/PlaydbDetail.asp?sReqPlayNo=198805";

    return (
        <div className='sideBtnWrap'>
            {/* sideBtns */}
            <a className='sideBtn is-primary' href='#'>
                <span>예매하기</span>
            </a>
            <a className='sideBtn is-foreign' href='#'>
                <span>
                    <i>BOOKING</i>
                    <i className='slash'>/</i>
                    <i>外國語</i>
                </span>
            </a>

            {/* sideLinks */}
            <a className='sideBtnLink is-nolpoint' href={nol_link} target='_blank'>
                NOL 카드로 최대 7만원 혜택받기
            </a>
            <a className='sideBtnLink is-playdb' href={playdb_link} target='_blank'>
                이 공연이 더 궁금하다면
                <span className='logo-playdb'></span>
                <span className='blind'>PLAY DB</span>
            </a>
        </div>
    );
};
export default SideBtns;