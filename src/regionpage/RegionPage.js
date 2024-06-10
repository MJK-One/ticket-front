import KoreaMap from '../component/koreaMap/koreaMap';
import './RegionPage.css';

const RegionPage =  () => {
    return (
        <div id="mainContainer">
            <div className="contents">

                <div className="leftBox">
                    <div className='leftBoxTop'>
                        <span className='regionTitle'>서울</span>
                    </div>
                    <div className='leftBoxBottom'>
                        <div className='mapImg'>
                            <KoreaMap />
                        </div>
                    </div>
                </div>

                <div className="rightBox">
                    <div className="rightBoxTop">

                        <a href='#'>
                            <div className="wrapBox">
                                <div className="posterImg">
                                </div>
                                <div className="textWrap">
                                    <span className="posterTitle">안녕하세요</span>
                                    <span className="posterDate">2024.05.25 ~ 2024.06.10</span>
                                </div>
                            </div>
                        </a>
                        

                        <div className="wrapBox">
                            <div className="posterImg">
                            </div>
                            <div className="textWrap">
                                <span className="posterTitle">안녕하세요</span>
                                <span className="posterDate">2024.05.25 ~ 2024.06.10</span>
                            </div>
                        </div>

                        <div className="wrapBox">
                            <div className="posterImg">
                            </div>
                            <div className="textWrap">
                                <span className="posterTitle">안녕하세요</span>
                                <span className="posterDate">2024.05.25 ~ 2024.06.10</span>
                            </div>
                        </div>

                        <div className="wrapBox">
                            <div className="posterImg">
                            </div>
                            <div className="textWrap">
                                <span className="posterTitle">안녕하세요</span>
                                <span className="posterDate">2024.05.25 ~ 2024.06.10</span>
                            </div>
                        </div>

                        <div className="wrapBox">
                            <div className="posterImg">
                            </div>
                            <div className="textWrap">
                                <span className="posterTitle">안녕하세요</span>
                                <span className="posterDate">2024.05.25 ~ 2024.06.10</span>
                            </div>
                        </div>

                        <div className="wrapBox">
                            <div className="posterImg">
                            </div>
                            <div className="textWrap">
                                <span className="posterTitle">안녕하세요</span>
                                <span className="posterDate">2024.05.25 ~ 2024.06.10</span>
                            </div>
                        </div>

                    </div>

                    <div className="rightBoxBottom">
                        <button className="regionGoBtn">지역별 공연 전체보기</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default RegionPage;