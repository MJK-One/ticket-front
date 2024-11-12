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


//
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
    // 상단: 프로필
    const [userLikeListCnt, setUserLikeListCnt] = useState(0); //관심 티켓 수
    const [userBellListCnt, setUserBellListCnt] = useState(0); //알림 티켓 수
    // 중앙: 목록
    const [userLikeListInfo, setUserLikeListInfo] = useState(null); //관심 티켓 리스트
    const [userBellListInfo, setUserBellListInfo] = useState(null); //알림 티켓 리스트
    // 하단: pagenation
    const [userLikePaging, setUserLikePaging] = useState({
        curPageNum: 1,
        startPage: 0,
        endPage: 0,
        totalElements: 0,
        totalPages: 0
    });
    const [userBellPaging, setUserBellPaging] = useState({
        curPageNum: 1,
        startPage: 0,
        endPage: 0,
        totalElements: 0,
        totalPages: 0
    });

    // 데이터 불러오기
    async function getUserPicked() {
        try {
            setIsLoading(true);

            // cnt: res
            const likeCntResponse = await axios.get(`${API_SERVER_HOST}/mypage/likeCnt?userId=${user.email}`);
            const bellCntResponse = await axios.get(`${API_SERVER_HOST}/mypage/bellCnt?userId=${user.email}`);

            // 데이터 넣기
            setUserLikeListCnt(likeCntResponse.data);
            setUserBellListCnt(bellCntResponse.data);

            if(activeButton === "interest") {
                // list: res
                const likeListResponse = await axios.get(`${API_SERVER_HOST}/mypage/likeListPage?userId=${user.email}&pagenum=${userLikePaging.curPageNum}`);

                // list info 가공
                // like list
                const likeListInfo = await Promise.all(likeListResponse.data.list.map(async item => {
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

                // paging: like
                const likeListTotalElements = likeListResponse.data.totalElements; // 총 데이터 수
                const likeListTotalPages = likeListResponse.data.totalPages; // 총 페이지 수
                const likeCalcEnd = Math.ceil(userLikePaging.curPageNum / 10) * 10; // 현재 페이지 번호 기준 최대 페이지 번호(10 기준)
                const likeEndPage = Math.min(likeCalcEnd, likeListTotalPages); // 더 작은 값이 endPageNum
                const likeStartPage = likeCalcEnd - 9; // startPageNum

                // 데이터 넣기
                setUserLikeListInfo(likeListInfo);
                setUserLikePaging((prev) => ({
                    ...prev,
                    startPage: likeStartPage,
                    endPage: likeEndPage,
                    totalElements: likeListTotalElements,
                    totalPages: likeListTotalPages
                }));

            }
            else if(activeButton === "alarm") {
                // list: res
                const bellListResponse = await axios.get(`${API_SERVER_HOST}/mypage/bellListPage?userId=${user.email}&pagenum=${userBellPaging.curPageNum}`);

                // list info 가공
                // bell list
                const bellListInfo = await Promise.all(bellListResponse.data.list.map(async item => {
                    const bellItemBellTime = await axios.get(`${API_SERVER_HOST}/mypage/bellTime?ticketId=${item.ticketDB.id}&userId=${user.email}`);
                    return {
                        id: item.ticketDB.id,
                        event_name: item.ticketDB.event_name,
                        pre_open_date: item.ticketDB.pre_sale_date || "정보 없음",
                        open_date: item.ticketDB.ticket_open_date,
                        img_url: item.ticketDB.image_url || "/img/normal_poster.png",
                        bellTime: bellItemBellTime.data
                    };
                }));

                // paging: bell
                const bellListTotalElements = bellListResponse.data.totalElements; // 총 데이터 수
                const bellListTotalPages = bellListResponse.data.totalPages; // 총 페이지 수
                const bellCalcEnd = Math.ceil(userBellPaging.curPageNum / 10) * 10; // 현재 페이지 번호 기준 최대 페이지 번호(10 기준)
                const bellEndPage = Math.min(bellCalcEnd, bellListTotalPages); // 더 작은 값이 endPageNum
                const bellStartPage = bellCalcEnd - 9; // startPageNum

                // 데이터 넣기
                setUserBellListInfo(bellListInfo);
                setUserBellPaging((prev) => ({
                    ...prev,
                    startPage: bellStartPage,
                    endPage: bellEndPage,
                    totalElements: bellListTotalElements,
                    totalPages: bellListTotalPages
                }));

            } else {
                console.log("Mypage Nav Error");
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Mypage Data Loading Fail: ", error);
        }
    }

    useEffect(() => {
        getUserPicked();
    }, [isAuthenticated, user, userLikePaging.curPageNum, userBellPaging.curPageNum, activeButton]);


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

    // 알림 목록 input change
    const BellInputHandler = async (event, tId) => {
        try {
            const apiUrl = `${API_SERVER_HOST}/mypage/bellTimeUpdate?ticketId=${tId}&userId=${user.email}&bellTime=${event.target.value}`;

            await axios.get(apiUrl);
            getUserPicked();

        } catch (error) {
            console.error("Mypage Bell Input Error: ", error);
        }
    };

    // 관심 목록 paging li 핸들러
    const LikePageHandler = (pageNum) => {
        setUserLikePaging((prev) => ({
            ...prev,
            curPageNum: pageNum
        }));
    };

    // 관심 목록 paging li 핸들러
    const BellPageHandler = (pageNum) => {
        setUserBellPaging((prev) => ({
            ...prev,
            curPageNum: pageNum
        }));
    };

    useEffect(() => {
        LikePageHandler(1);
        BellPageHandler(1);
    }, [activeButton]);

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
                                {/*<button>알람 설정</button>*/}
                                {user.type === "naver" && (
                                    <div className="naverlogin">
                                        <svg width="15" height="15" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.0619 5.48535V13.0196L9.9945 5.48535H4.51953V20.4187H9.97713V12.8844L15.0446 20.4187H20.5195V5.48535H15.0619Z" fill="white"/>
                                        </svg>
                                    </div>
                                )}
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
                    <>
                        <div className="cc-list">
                            {activeButton === "interest" ? (
                                <div className="choice-list">
                                    {userLikeListInfo && Array.isArray(userLikeListInfo) && userLikeListInfo.length > 0 ? (
                                        userLikeListInfo.map(item => (
                                            <div className="choice-ticket" key={`mypage-choice-list-c-tk-${item.id}`}>
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
                                    {userBellListInfo && Array.isArray(userBellListInfo) && userBellListInfo.length > 0 ? (
                                        userBellListInfo.map(item => (
                                            <div className="call-ticket" key={`mypage-call-list-c-tk-${item.id}`}>
                                                <Link to={`/detail/${item.id}`} className="call-ticket-a">
                                                    <div className="call-img">
                                                        <img src={item.img_url} key={`mypage-call-list-c-tk-img${item.id}`} />
                                                    </div>
                                                    <div className="call-info">
                                                        <div className="call-info-title">{item.event_name}</div>
                                                        <div className="call-info-pre-open">{`선예매 날짜 : ${item.pre_open_date}`}</div>
                                                        <div className="call-info-open">{`예매 날짜 : ${item.open_date}`}</div>
                                                    </div>
                                                </Link>
                                                <div className="call-option">
                                                    <div className="option-call-btn"
                                                        onClick={() => {
                                                            setIsLoading(true);
                                                            BellBtnHandler(item.id, true);
                                                        }}
                                                    >
                                                        <img src="/img/icon/detail/bell_on.png" />
                                                    </div>
                                                    <div className="call-option-time">
                                                        <input type='number' defaultValue={item.bellTime} min='1' max='24' step='1'
                                                            onChange={(e) => {
                                                                setIsLoading(true);
                                                                BellInputHandler(e, item.id);
                                                            }}
                                                        />
                                                        <span>시간 전에 알림</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>알림 설정 티켓이 없습니다.</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {activeButton === "interest" && userLikePaging.totalElements > 0 && (
                            <div className="choice-list-page">
                                <ul className="choice-list-page-ul">
                                    <ul className="choice-list-page-left-btns">
                                        <li className="choice-list-page-go-first"
                                            onClick={() => {
                                                LikePageHandler(1);
                                            }}
                                        >
                                            {`<<`}
                                        </li>
                                        {userLikePaging.startPage > 1 && (
                                            <li className="choice-list-page-go-prev"
                                                onClick={() => {
                                                    LikePageHandler(userLikePaging.startPage - 1);
                                                }}
                                            >
                                                {`<`}
                                            </li>
                                        )}
                                    </ul>
                                    <ul className="choice-list-page-numbers">
                                        {Array.from({ length: userLikePaging.endPage - userLikePaging.startPage + 1 }, (_, i) => {
                                            const pageNumber = userLikePaging.startPage + i;
                                            return (
                                                <li
                                                    key={`mypage-choice-list-page-numbers-${i}`}
                                                    className={`choice-list-page-num ${pageNumber === userLikePaging.curPageNum ? "active" : ""}`}
                                                    onClick={() => {
                                                        LikePageHandler(pageNumber);
                                                    }}
                                                >
                                                    {pageNumber}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <ul className="choice-list-page-right-btns">
                                        {userLikePaging.endPage < userLikePaging.totalPages && (
                                            <li className="choice-list-page-go-next"
                                                onClick={() => {
                                                    LikePageHandler(userLikePaging.endPage + 1);
                                                }}
                                            >
                                                {`>`}
                                            </li>
                                        )}
                                        <li className="choice-list-page-go-last"
                                            onClick={() => {
                                                LikePageHandler(userLikePaging.totalPages);
                                            }}
                                        >
                                            {`>>`}
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        )}

                        {activeButton === "alarm" && userBellPaging.totalElements > 0 && (
                            <div className="choice-list-page">
                                <ul className="choice-list-page-ul">
                                    <ul className="choice-list-page-left-btns">
                                        <li className="choice-list-page-go-first"
                                            onClick={() => {
                                                BellPageHandler(1);
                                            }}
                                        >
                                            {`<<`}
                                        </li>
                                        {userBellPaging.startPage > 1 && (
                                            <li className="choice-list-page-go-prev"
                                                onClick={() => {
                                                    BellPageHandler(userBellPaging.startPage - 1);
                                                }}
                                            >
                                                {`<`}
                                            </li>
                                        )}
                                    </ul>
                                    <ul className="choice-list-page-numbers">
                                        {Array.from({ length: userBellPaging.endPage - userBellPaging.startPage + 1 }, (_, i) => {
                                            const pageNumber = userBellPaging.startPage + i;
                                            return (
                                                <li
                                                    key={`mypage-bell-list-page-numbers-${i}`}
                                                    className={`choice-list-page-num ${pageNumber === userBellPaging.curPageNum ? "active" : ""}`}
                                                    onClick={() => {
                                                        BellPageHandler(pageNumber);
                                                    }}
                                                >
                                                    {pageNumber}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <ul className="choice-list-page-right-btns">
                                        {userBellPaging.endPage < userBellPaging.totalPages && (
                                            <li className="choice-list-page-go-next"
                                                onClick={() => {
                                                    BellPageHandler(userBellPaging.endPage + 1);
                                                }}
                                            >
                                                {`>`}
                                            </li>
                                        )}
                                        <li className="choice-list-page-go-last"
                                            onClick={() => {
                                                BellPageHandler(userBellPaging.totalPages);
                                            }}
                                        >
                                            {`>>`}
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        )}
                    </>
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