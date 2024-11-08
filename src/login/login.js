//import React, { useState } from "react";
//import { Link, useNavigate } from 'react-router-dom'; // useNavigate import 추가
//import { naverLogin } from '../api/connect'; // naverLogin 함수를 import
//import { useDispatch } from "react-redux";
//import { login } from "../store/slice/userSlice";
//import { API_SERVER_HOST } from "../api/connect";
//import axios from 'axios'; // axios 추가

import './login.css';

// function Login() {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
//     const [email, setEmail] = useState(''); // 이메일 상태
//     const [password, setPassword] = useState(''); // 비밀번호 상태

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword); // 상태 토글
//     };

//     const handleNaverLogin = async () => {
//         const loginUrl = await naverLogin();
//         window.location.href = loginUrl; // 네이버 로그인 URL로 리다이렉션
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault(); // 폼 제출 기본 동작 방지
//         try {
//             const response = await axios.post('http://localhost:8080/login', { email, password });
//             console.log('로그인 성공:', response.data);
//             navigate('/');
//             // 로그인 성공 후 처리
//         } catch (error) {
//             console.error('로그인 실패:', error);
//             // 로그인 실패 처리
//         }
//     };

//     return (
//         <div className="login-con">
//             <Link to="/"><img className="logo-img" alt="" src="/img/TOW.png" /></Link>
//             <form onSubmit={handleLogin}>
//                 <div className="login-box">
//                     <div className="login-id-box">
//                         <i>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
//                                 <path stroke="#999" stroke-linecap="round" d="M7.789 9.867A4.444 4.444 0 0 1 12 4a4.444 4.444 0 1 1 0 8.885c-.947 0-1.945-.167-2.667-.672"></path>
//                                 <path fill="#999" d="M9.489 12.685a.5.5 0 1 0-.311-.95l.31.95Zm10.378 5.822.492-.088-.492.088ZM5.5 20.5h13v-1h-13v1Zm-.885-1.912c.463-2.81 2.293-5.058 4.874-5.903l-.311-.95c-2.965.97-5.031 3.545-5.55 6.69l.987.163Zm9.671-5.903c2.597.85 4.584 3.113 5.089 5.911l.984-.177c-.57-3.156-2.811-5.718-5.762-6.684l-.31.95ZM5.5 19.5c-.58 0-.96-.456-.885-.912l-.987-.163C3.434 19.603 4.423 20.5 5.5 20.5v-1Zm13 1c1.075 0 2.073-.898 1.86-2.081l-.985.177c.08.448-.293.904-.875.904v1Z"></path>
//                             </svg>
//                         </i>
//                         <input 
//                             type="email" 
//                             className="login-id" 
//                             placeholder="아이디" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
//                         />
//                     </div>
//                     <div className="login-pw-box">
//                         <i>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
//                             <path stroke="#999" stroke-linecap="round" d="M19.5 15.6V11A1.5 1.5 0 0 0 18 9.5H6A1.5 1.5 0 0 0 4.5 11v8A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-.75"></path>
//                             <circle cx="12" cy="14" r="1" fill="#999"></circle>
//                             <path fill="#999" d="M11.5 14h1l.5 3h-2l.5-3Z" className="pathFill"></path>
//                             <path stroke="#999" d="M16.5 9.5V8a4.5 4.5 0 0 0-9 0v1.5"></path>
//                         </svg>
//                         </i>
//                         <input 
//                             type={showPassword ? "text" : "password"} 
//                             className="login-pw" 
//                             placeholder="비밀번호" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
//                         />
//                         <button type="button" onClick={togglePasswordVisibility}>
//                         {showPassword ? (
//                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M10 17.3769C14.2059 17.3769 17.7679 14.4912 19 10.4945C17.7633 6.50882 14.2059 3.61768 10 3.61768C5.79413 3.61768 2.23212 6.50882 1 10.5C2.23212 14.4912 5.79413 17.3824 10 17.3824V17.3769Z" fill="#D9D9D9"/>
//                                     <path d="M13.1762 10.5002C13.1762 12.2564 11.7559 13.6767 9.99971 13.6767C8.24352 13.6767 6.82324 12.2564 6.82324 10.5002C6.82324 8.74401 8.24352 7.32373 9.99971 7.32373C11.7559 7.32373 13.1762 8.7499 13.1762 10.5002Z" fill="white"/>
//                                     <path d="M3 3.5L17 17.5" stroke="#D9D9D9" stroke-width="1.5" stroke-linecap="round"/>
//                                     <path d="M4 2.5L18 16.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
//                                 </svg>
                                
//                             ) : (
//                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                     <path d="M10 17.3769C14.2059 17.3769 17.7679 14.4912 19 10.4945C17.7633 6.50882 14.2059 3.61768 10 3.61768C5.79413 3.61768 2.23212 6.50882 1 10.5C2.23212 14.4912 5.79413 17.3824 10 17.3824V17.3769Z" fill="#D9D9D9"/>
//                                     <path d="M13.1762 10.5002C13.1762 12.2564 11.7559 13.6767 9.99971 13.6767C8.24352 13.6767 6.82324 12.2564 6.82324 10.5002C6.82324 8.74401 8.24352 7.32373 9.99971 7.32373C11.7559 7.32373 13.1762 8.7499 13.1762 10.5002Z" fill="white"/>
//                                 </svg>
//                             )}
//                         </button>
//                     </div>
//                 </div>
//                 <button className="login-btn" type="submit">로그인</button>
//             </form>
//             <div className="findlist"> 
//                 <ul>
//                     <li>아이디 찾기</li>
//                     <li>비밀번호 찾기</li>
//                     <li><Link to="/registerone">회원가입</Link></li>
//                 </ul>
//             </div>
//             <div className="snslogin">
//                 <ul>
//                     <li>
//                         <div className="kakaologin">
//                             <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path fillRule="evenodd" clipRule="evenodd" d="M0.519531 8.61196C0.519531 11.4975 2.37093 14.0321 5.1607 15.4739L4.21824 19.0958C4.18323 19.203 4.20964 19.3196 4.28698 19.3991C4.3427 19.4564 4.41616 19.4854 4.48968 19.4854C4.55233 19.4854 4.61492 19.4648 4.66753 19.4221L8.72156 16.6072C9.30482 16.693 9.90582 16.7384 10.5195 16.7384C16.0423 16.7384 20.5195 13.1004 20.5195 8.61196C20.5195 4.12404 16.0423 0.485352 10.5195 0.485352C4.99677 0.485352 0.519531 4.12404 0.519531 8.61196Z" fill="#4E2828"/>
//                             </svg>
//                         </div>
//                     </li>
//                     <li>
//                         <div className="naverlogin" onClick={handleNaverLogin}>
//                             <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.0619 5.48535V13.0196L9.9945 5.48535H4.51953V20.4187H9.97713V12.8844L15.0446 20.4187H20.5195V5.48535H15.0619Z" fill="white"/>
//                             </svg>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../store/slice/userSlice";
import './login.css';
import { naverLogin } from '../api/connect';
import axios from 'axios';
import { API_SERVER_HOST } from "../api/connect";
//import { useUser } from './userContext.js'; // UserContext import 추가

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const { setUser } = useUser(); // UserContext에서 setUser 가져오기
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // 상태 토글
    };

    const handleNaverLogin = async () => {
        const loginUrl = await naverLogin();
        window.location.href = loginUrl; // 네이버 로그인 URL로 리다이렉션
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        try {
            const responseEmail = await axios.post(`${API_SERVER_HOST}/login`, { email, password }, { withCredentials: true });
            const responseType = await axios.get(`${API_SERVER_HOST}/checkLoginType?email=${responseEmail.data.user}`);
            dispatch(login({
                email: responseEmail.data.user,
                type: responseType.data
            }));

            navigate('/'); // 메인 페이지로 리다이렉트
        } catch (error) {
            console.error('로그인 실패:', error);
            setErrorMessage('로그인 실패: 이메일 또는 비밀번호를 확인하세요.'); // 에러 메시지 설정
        }
    };

    return (
        <div className="login-con">
            <Link to="/"><img className="logo-img" alt="" src="/img/TOW.png" /></Link>
            <form onSubmit={handleLogin}>
                <div className="login-box">
                    <div className="login-id-box">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                <path stroke="#999" strokeLinecap="round" d="M7.789 9.867A4.444 4.444 0 0 1 12 4a4.444 4.444 0 1 1 0 8.885c-.947 0-1.945-.167-2.667-.672"></path>
                                <path fill="#999" d="M9.489 12.685a.5.5 0 1 0-.311-.95l.31.95Zm10.378 5.822.492-.088-.492.088ZM5.5 20.5h13v-1h-13v1Zm-.885-1.912c.463-2.81 2.293-5.058 4.874-5.903l-.311-.95c-2.965.97-5.031 3.545-5.55 6.69l.987.163Zm9.671-5.903c2.597.85 4.584 3.113 5.089 5.911l.984-.177c-.57-3.156-2.811-5.718-5.762-6.684l-.31.95ZM5.5 19.5c-.58 0-.96-.456-.885-.912l-.987-.163C3.434 19.603 4.423 20.5 5.5 20.5v-1Zm13 1c1.075 0 2.073-.898 1.86-2.081l-.985.177c.08.448-.293.904-.875.904v1Z"></path>
                            </svg>
                        </i>
                        <input 
                            type="email" 
                            className="login-id" 
                            placeholder="아이디" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
                        />
                    </div>
                    <div className="login-pw-box">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                <path stroke="#999" strokeLinecap="round" d="M19.5 15.6V11A1.5 1.5 0 0 0 18 9.5H6A1.5 1.5 0 0 0 4.5 11v8A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-.75"></path>
                                <circle cx="12" cy="14" r="1" fill="#999"></circle>
                                <path fill="#999" d="M11.5 14h1l.5 3h-2l.5-3Z" className="pathFill"></path>
                                <path stroke="#999" d="M16.5 9.5V8a4.5 4.5 0 0 0-9 0v1.5"></path>
                            </svg>
                        </i>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="login-pw" 
                            placeholder="비밀번호" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 17.3769C14.2059 17.3769 17.7679 14.4912 19 10.4945C17.7633 6.50882 14.2059 3.61768 10 3.61768C5.79413 3.61768 2.23212 6.50882 1 10.5C2.23212 14.4912 5.79413 17.3824 10 17.3824V17.3769Z" fill="#D9D9D9"/>
                                    <path d="M13.1762 10.5002C13.1762 12.2564 11.7559 13.6767 9.99971 13.6767C8.24352 13.6767 6.82324 12.2564 6.82324 10.5002C6.82324 8.74401 8.24352 7.32373 9.99971 7.32373C11.7559 7.32373 13.1762 8.7499 13.1762 10.5002Z" fill="white"/>
                                    <path d="M3 3.5L17 17.5" stroke="#D9D9D9" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M4 2.5L18 16.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 17.3769C14.2059 17.3769 17.7679 14.4912 19 10.4945C17.7633 6.50882 14.2059 3.61768 10 3.61768C5.79413 3.61768 2.23212 6.50882 1 10.5C2.23212 14.4912 5.79413 17.3824 10 17.3824V17.3769Z" fill="#D9D9D9"/>
                                    <path d="M13.1762 10.5002C13.1762 12.2564 11.7559 13.6767 9.99971 13.6767C8.24352 13.6767 6.82324 12.2564 6.82324 10.5002C6.82324 8.74401 8.24352 7.32373 9.99971 7.32373C11.7559 7.32373 13.1762 8.7499 13.1762 10.5002Z" fill="white"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <button className="login-btn" type="submit">로그인</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 에러 메시지 표시 */}
            </form>
            <div className="findlist"> 
                <ul>
                    <li>아이디 찾기</li>
                    <li>비밀번호 찾기</li>
                    <li><Link to="/registerone">회원가입</Link></li>
                </ul>
            </div>
            <div className="snslogin">
            <ul>
                    <li>
                        <div className="kakaologin">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.519531 8.61196C0.519531 11.4975 2.37093 14.0321 5.1607 15.4739L4.21824 19.0958C4.18323 19.203 4.20964 19.3196 4.28698 19.3991C4.3427 19.4564 4.41616 19.4854 4.48968 19.4854C4.55233 19.4854 4.61492 19.4648 4.66753 19.4221L8.72156 16.6072C9.30482 16.693 9.90582 16.7384 10.5195 16.7384C16.0423 16.7384 20.5195 13.1004 20.5195 8.61196C20.5195 4.12404 16.0423 0.485352 10.5195 0.485352C4.99677 0.485352 0.519531 4.12404 0.519531 8.61196Z" fill="#4E2828"/>
                            </svg>
                        </div>
                    </li>
                    <li>
                        <div className="naverlogin" onClick={handleNaverLogin}>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.0619 5.48535V13.0196L9.9945 5.48535H4.51953V20.4187H9.97713V12.8844L15.0446 20.4187H20.5195V5.48535H15.0619Z" fill="white"/>
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Login;
