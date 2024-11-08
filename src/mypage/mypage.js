import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from "../component/header/home/header";
import MobileDetailHeader from "../component/header/detail/MobileDetailHeader";
import MobileNav from "../component/header/mobileNav/MobileNav";
//import { useUser } from '../login/userContext'; 
import { API_SERVER_HOST } from "../api/connect";
import './mypage.css'
import axios from "axios";

function PasswordModal({ isOpen, onClose }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부

    const validatePassword = (password) => {
        const minLength = 8;
        const maxLength = 12;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const complexityCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;

        return (
            password.length >= minLength &&
            password.length <= maxLength &&
            complexityCount >= 2
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (!validatePassword(newPassword)) {
            setError("비밀번호는 8~12자, 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.");
            return;
        }

        // 비밀번호 수정 로직 추가
        console.log("새 비밀번호:", newPassword);
        setError(""); // 에러 초기화
        onClose(); // 모달 닫기
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>비밀번호 수정</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            새 비밀번호:
                            <div className="password-input">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "숨기기" : "보기"}
                                </button>
                            </div>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            비밀번호 확인:
                            <div className="password-input">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "숨기기" : "보기"}
                                </button>
                            </div>
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="button-group">
                        <button type="submit">수정하기</button>
                        <button type="button" onClick={onClose}>닫기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


function Mypage() {
    //const { user } = useUser(); //userContext에서 사용자 정보 가져오기
    const [activeButton, setActiveButton] = useState("interest"); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigate = useNavigate();

    // 로그인 확인
    const { isAuthenticated, user } = useSelector((state) => state.user);
    useEffect(() => {
        if(isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    // 유저의 관심, 알림 등록 정보 가져오기
    const [isLoading, setIsLoading] = useState(true);
    const [userLikeListCnt, setUserLikeListCnt] = useState(0); //관심 티켓 수
    const [userBellListCnt, setUserBellListCnt] = useState(0); //알림 티켓 수
    const [userLikeListInfo, setUserLikeListInfo] = useState(null); //관심 티켓 리스트
    const [userBellListInfo, setUserBellListInfo] = useState(null); //알림 티켓 리스트

    // 데이터 불러오기
    async function getUserPicked() {
        try {
            // cnt: res
            const likeCntResponse = await axios.get(`${API_SERVER_HOST}/mypage/likeCnt?userId=${user.email}`);
            const bellCntResponse = await axios.get(`${API_SERVER_HOST}/mypage/bellCnt?userId=${user.email}`);

            // list: res
            const likeListResponse = await axios.get(`${API_SERVER_HOST}/mypage/likeList?userId=${user.email}`);
            const bellListResponse = await axios.get(`${API_SERVER_HOST}/mypage/bellList?userId=${user.email}`);

            // list info 가공
            // like list
            const likeListInfo = await Promise.all(likeListResponse.data.map(async item => {
            // 데이터 가공
            const likeItemSites = item.ticketDB.eventSites.map(site => site.sales_site); // 티켓 사이트 목록 만들기
            const likeItemPeriod = (item.ticketDB.event_start_date === item.ticketDB.event_end_date)
                ? item.ticketDB.event_start_date
                : `${item.ticketDB.event_start_date} ~ ${item.ticketDB.event_end_date}`; // 공연 기간 만들기
            const likeItemBell = await axios.get(`${API_SERVER_HOST}/bellCheck?tId=${item.ticketDB.id}&uId=${user.email}`);

            return {
                id: item.ticketDB.id,
                event_name: item.ticketDB.event_name,
                pre_open_date: item.ticketDB.pre_sale_date || "정보 없음",
                open_date: item.ticketDB.ticket_open_date,
                period: likeItemPeriod || "정보 없음",
                img_url: item.ticketDB.image_url || "/img/normal_poster.png",
                sites: likeItemSites,
                venue: item.ticketDB.venue || "정보 없음",
                bell: likeItemBell.data
            };
            }));

            // 데이터 넣기
            setUserLikeListCnt(likeCntResponse.data);
            setUserBellListCnt(bellCntResponse.data);
            setUserLikeListInfo(likeListInfo);

            setIsLoading(false);
        } catch (error) {
            console.error("Mypage Data Loading Fail: ", error);
        }
    }

    useEffect(() => {
        getUserPicked();
    }, [isAuthenticated, user]);


    // 관심 버튼 핸들러: 버튼이 해제되면 어차피 관심 목록에서 삭제됨
    const HeartBtnHandler = async (tId) => {
        try {
            const apiUrl = `${API_SERVER_HOST}/cancelLike?tId=${tId}&uId=${user.email}`;
            await axios.get(apiUrl);
            getUserPicked();
        } catch (error) {
            console.error("Mypage Heart Btn Error: ", error);
        }
    };

    // 알림 버튼 핸들러
    const BellBtnHandler = async (tId, btnState) => {
        try {
            const apiUrl = btnState
                ? `${API_SERVER_HOST}/cancelBell?tId=${tId}&uId=${user.email}`
                : `${API_SERVER_HOST}/clickBell?tId=${tId}&uId=${user.email}&bellTime=1`; //기본 알림 시간(1시간 전)

            await axios.get(apiUrl);
            getUserPicked();

        } catch (error) {
            console.error("Mypage Bell Btn Error: ", error);
        }
    };

    //
    return(
        <>
            {/* 헤더 */}
            {windowWidth > 1100 && <Header />}
            {windowWidth <= 1100 && <MobileDetailHeader />}

            <div className="mypage">
                <div className="mypage-con">
                    <div className="mypage-info">
                    {isAuthenticated && (
                        <>
                            <div className="mypage-email">{user.email}</div> 
                            <div className="mypage-btn">
                                <button onClick={() => setIsModalOpen(true)}>개인정보 수정</button>
                                <button>알람 설정</button>
                            </div>
                        </>
                    )}
                    </div>
                    <div className="mypage-choice">
                        <div className="choice-title">관심내역</div>
                        <div className="choice-number">{userLikeListCnt}</div>
                    </div>
                    <div className="mypage-call">
                    <div className="call-title">알람내역</div>
                    <div className="call-number">{userBellListCnt}</div>
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
                {isLoading === false ? (
                    <div className="cc-list">
                        {activeButton === "interest" ? (
                            <div className="choice-list">
                                {userLikeListInfo && Array.isArray(userLikeListInfo) && userLikeListInfo.length > 0 ? (
                                    userLikeListInfo.map(item => (
                                        <div className="choice-ticket" key={`mypage-cc-list-c-tk-${item.id}`}>
                                            <Link to={`/detail/${item.id}`} className="choice-ticket-a">
                                                <div className="cho-img">
                                                    <img src={item.img_url} key={`mypage-cc-list-c-tk-img${item.id}`} />
                                                </div>
                                                <div className="cho-info">
                                                    <div className="cho-info-title">{item.event_name}</div>
                                                    <div className="cho-info-pre-open">{`선예매 날짜 : ${item.pre_open_date}`}</div>
                                                    <div className="cho-info-open">{`예매 날짜 : ${item.open_date}`}</div>
                                                    <div className="cho-info-performance">{`공연 날짜 : ${item.period}`}</div>
                                                    <div className="cho-info-region">{`공연 위치 : ${item.venue}`}</div>
                                                    <div className="cho-info-site-list">
                                                        {(item.sites && item.sites.length > 0) && (
                                                            item.sites.map(site => {
                                                                if (site === "Interpark Ticket") {
                                                                    return (
                                                                        <div className="cho-info-site">
                                                                            <img src="/img/siteicon/interpark.jpg" />
                                                                        </div>
                                                                    );
                                                                } else if (site === "Melon Ticket") {
                                                                    return (
                                                                        <div className="cho-info-site">
                                                                            <img src="/img/siteicon/melon.jpg" />
                                                                        </div>
                                                                    );

                                                                } else if (site === "Ticket Link") {
                                                                    return (
                                                                        <div className="cho-info-site">
                                                                            <img src="/img/siteicon/ticketlink.jpg" />
                                                                        </div>
                                                                    );

                                                                } else if (site === "Yes24") {
                                                                    return (
                                                                        <div className="cho-info-site">
                                                                            <img src="/img/siteicon/yes24.png" />
                                                                        </div>
                                                                    );

                                                                } else {
                                                                    return null;
                                                                }
                                                            })
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="call-cho">
                                                <a
                                                    className="cho-tic-call"
                                                    onClick={() => {
                                                        setIsLoading(true);
                                                        HeartBtnHandler(item.id);
                                                    }}
                                                >
                                                    <img src="/img/icon/detail/heart_on.png" />
                                                </a>
                                                <a
                                                    className="cho-tic-cho"
                                                    onClick={() => {
                                                        setIsLoading(true);
                                                        BellBtnHandler(item.id, item.bell);
                                                    }}
                                                >
                                                    <img src={item.bell ? "/img/icon/detail/bell_on.png" : "/img/icon/detail/bell_off.png"} />
                                                </a>
                                            </div>
                                        </div>

                                    ))
                                ) : (
                                <div>관심 티켓이 없습니다.</div>
                                )}
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
                ) : (
                    <div style={{marginTop: '15px'}}>Loading...</div>
                )}
            </div>
            {/* 비밀번호 수정 모달 */}
            <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* 모바일 nav */}
            {windowWidth <= 1100 && <MobileNav />}
        </>
    )
}

export default Mypage;