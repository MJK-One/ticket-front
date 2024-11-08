import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from "../component/header/home/header";
import MobileDetailHeader from "../component/header/detail/MobileDetailHeader";
import MobileNav from "../component/header/mobileNav/MobileNav";
//import { useUser } from '../login/userContext'; 
import './mypage.css'

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
            {/* 비밀번호 수정 모달 */}
            <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* 모바일 nav */}
            {windowWidth <= 1100 && <MobileNav />}
        </>
    )
}

export default Mypage;