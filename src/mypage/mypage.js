import React, { useState } from "react";
import './mypage.css'

function Mypage() {
    const [activeButton, setActiveButton] = useState("interest"); 

    return(
        <div className="mypage">
            <div className="mypage-con">
                <div className="mypage-info">
                    <div className="mypage-email">example@naver.com</div>
                    <div className="mypage-btn">
                        <button>개인정보 수정</button>
                        <button>알람 설정</button>
                    </div>
                </div>
                <div className="mypage-choice">
                    <div className="choice-title">관심내역</div>
                    <div className="choice-number">0</div>
                </div>
                <div className="mypage-call">
                <div className="call-title">알람내역</div>
                <div className="call-number">0</div>
                </div>
            </div>
            <div className="mypage-list">
                <div className="list-button-con">
                    <button
                        className={`choice-btn ${activeButton === "interest" ? "active" : ""}`}
                        onClick={() => setActiveButton("interest")}
                    >
                        관심 목록
                    </button>
                    <button
                        className={`call-btn ${activeButton === "alarm" ? "active" : ""}`}
                        onClick={() => setActiveButton("alarm")}
                    >
                        알람 목록
                    </button>
                </div>
            </div>
            <div className="cc-list">
                {activeButton === "interest" ? (
                    <div className="choice-list">
                        <div className="choice-ticket">
                            <div className="cho-img"></div>
                            <div className="cho-info">
                                <div className="cho-info-title">티켓 제목</div>
                                <div className="cho-info-open">예매 날짜 : 2024-10-13</div>
                                <div className="cho-info-performance">공연 날짜 : 2024-10-13</div>
                                <div className="cho-info-region">공연 위치 : 서울 구로동 고척로 동양미래대학교</div> 
                                <div className="cho-info-site">
                            </div>
                            </div>
                            <div className="call-cho">
                                <div className="cho-tic-call"></div>
                                <div className="cho-tic-cho"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="call-list">
                        <div className="call-ticket">
                            <div className="call-img"></div>
                            <div className="call-info">
                                <div className="call-info-title">티켓 제목</div>
                                <div className="call-info-open">예매 날짜 : 2024-10-13</div>
                            </div>
                            <div className="call-option">
                                <div className="option-call-btn"></div>
                            </div>
                            <div className="call-delete">x</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Mypage;