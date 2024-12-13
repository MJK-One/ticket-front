import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { API_SERVER_HOST } from "../api/connect";
import LoadingComp from "../component/loading/Loading";

import './registerone.css';
import axios from 'axios';

function RegisterOne() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailDomain, setEmailDomain] = useState("direct")
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailId, setEmailId] = useState("");
    const [showRegisterError, setShowRegisterError] = useState(false);
    const [isEmailExists, setIsEmailExists] = useState(false);
    const [age, setAge] = useState("");
    const [name, setName] = useState("");

    // 이메일 인증 관련
    const [emailCanAuth, setEmailCanAuth] = useState(false);
    const [showVerificationInput, setShowVerificationInput] = useState(false); // 인증번호 입력 창 표시 여부
    const [verificationCode, setVerificationCode] = useState(""); // 인증번호 입력값
    const [isEmailSending, setIsEmailSending] = useState(false); //이메일 보내는 중인지 확인(로딩 표시 띄우기)
    const [emailAuthEnd, setEmailAuthEnd] = useState(false);

    // 이메일 인증 타이머
    const [timer, setTimer] = useState(180); // 타이머 초기값 (3분 = 180초)
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null); // 타이머를 멈추기 위한 ID

    //
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmVisibility = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const validateEmail = (emailId, emailDomain) => {
        const fullEmail = emailDomain === "direct" ? emailId : `${emailId}@${emailDomain}`;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(fullEmail);
    };

    const handleEmailIdChange = (e) => {
        const inputEmailId = e.target.value;
        setEmailId(inputEmailId);
        const isValid = validateEmail(inputEmailId, emailDomain);
        setIsEmailValid(isValid);
        if (!isValid) {
            setEmailCanAuth(false); // 이메일이 유효하지 않으면 인증 버튼 비활성화
        }
    };

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        
        const hasNumber = /\d/.test(inputPassword);
        const hasLetter = /[a-zA-Z]/.test(inputPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(inputPassword);
        const isValid = (hasNumber + hasLetter + hasSpecialChar) >= 2 && inputPassword.length >= 8 && inputPassword.length <= 12;

        setIsPasswordValid(isValid);
        setIsPasswordMatch(inputPassword === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const inputConfirmPassword = e.target.value;
        setConfirmPassword(inputConfirmPassword);
        setIsPasswordMatch(password === inputConfirmPassword);
    };

    const handleEmailDomainChange = (e) => {
        const newDomain = e.target.value;
        setEmailDomain(newDomain);
    
        if (newDomain !== "direct") {
            const emailParts = emailId.split('@');
            if (emailParts.length > 1) {
                setEmailId(emailParts[0]);
            }
            const isValid = validateEmail(emailParts[0], newDomain);
            setIsEmailValid(isValid);
            if (!isValid) {
                setEmailCanAuth(false); // 이메일이 유효하지 않으면 인증 버튼 비활성화
            }
        } else {
            const isValid = validateEmail(emailId, newDomain);
            setIsEmailValid(isValid);
            if (!isValid) {
                setEmailCanAuth(false);
            }
        }
    };

    const handleAgeGroupChange = (e) => {
        setAge(e.target.value);
    };

    // 이메일 검증
    async function emailExistCk(email) {
        try {
            const response = await axios.post(`${API_SERVER_HOST}/isEmailExist`, {
                email: email
            });
            setIsEmailExists(response.data);
            setEmailCanAuth(!response.data); // 이메일이 존재하지 않을 때만 인증 가능
            return response.data;
        } catch (error) {
            console.error("이메일 검증 실패:", error);
            setShowRegisterError(true);
            return false;
        }
    };
    useEffect(() => {
        const checkEmail = async () => {
            if (isEmailValid && emailId.trim() !== "") {  // emailId가 비어있지 않은 경우에만 체크
                const fullEmail = emailDomain === "direct" ? emailId : `${emailId}@${emailDomain}`;
                await emailExistCk(fullEmail);
            } else {
                setEmailCanAuth(false);  // 이메일이 유효하지 않으면 인증 버튼 비활성화
            }
        };
        
        checkEmail();
    }, [isEmailValid, emailId, emailDomain]);


    // 타이머 관리
    useEffect(() => {
        if (isTimerRunning && timer > 0) {
            const id = setInterval(() => setTimer((prev) => prev - 1), 1000);
            setIntervalId(id);
            return () => clearInterval(id);
        } else if (timer === 0) { // 타이머 완료시
            setIsTimerRunning(false);
            clearInterval(intervalId);
        } 
        
        // 타이머 초기화시 > 타이머가 완료 or 인증 완료
        if (!isTimerRunning && timer < 180) {
            clearInterval(intervalId);
            setShowVerificationInput(false); // 인증창 안보이게
        }
    }, [isTimerRunning, timer]);

    const startTimer = () => { // 타이머 시작
        setTimer(180); // 타이머를 3분으로 초기화
        setIsTimerRunning(true); // 타이머 실행
    };

    const formatTimer = (seconds) => { // 타이머 포맷(ex.2:56)
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    // 이메일 인증 메일 발송
    const handleEmailVerification = async () => {
        try {
            setIsEmailSending(true); //이메일 보내는 중(로딩 띄우기)
            const fullEmail = emailDomain === "direct" ? emailId : `${emailId}@${emailDomain}`;
            const response = await axios.post(`${API_SERVER_HOST}/sendVerificationEmail`, { email: fullEmail });
            if (response.data.success) {
                setShowVerificationInput(true);
                setIsEmailSending(false);
                startTimer(); // 타이머 시작
                // 사용자에게 이메일 발송 완료 알림
                alert("인증 이메일이 발송되었습니다. 이메일을 확인해주세요.");
            }
        } catch (error) {
            setIsEmailSending(false);
            console.error("이메일 인증 발송 실패:", error);
            alert("이메일 발송에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 인증번호 입력 핸들러
    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    // 인증번호 확인 핸들러
    const handleVerifyCode = async () => {
        try {
            const fullEmail = emailDomain === "direct" ? emailId : `${emailId}@${emailDomain}`;
            const response = await axios.post(`${API_SERVER_HOST}/verifyCode`, {
                email: fullEmail,
                code: verificationCode
            });
            if (response.data.success) {
                alert("이메일 인증이 완료되었습니다.");
                setShowVerificationInput(false); // 인증 완료 후 입력창 숨기기
                setIsTimerRunning(false); // 타이머 정지
                setEmailAuthEnd(true); // 이메일 인증 완료
            } else {
                alert("인증번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error("인증번호 확인 실패:", error);
            alert("인증에 실패했습니다. 다시 시도해주세요.");
        }
    };


    //
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isFormValid = emailId.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== ""
                            && age.trim() !== "" && name.trim() !== "" &&
                            isEmailValid && isPasswordValid && isPasswordMatch;

        if (isFormValid) {
            const fullEmail = emailDomain === "direct" ? emailId : `${emailId}@${emailDomain}`;
            
            const userData = {
                email: fullEmail,
                name: name,
                password: password,
                age: age,
            };
            
            try {
                const response = await axios.post(`${API_SERVER_HOST}/register`, userData);
                console.log("가입 완료!", response.data);
                setShowRegisterError(false);
                navigate('/');
            } catch (error) {
                console.error("가입 실패:", error);
                setShowRegisterError(true);
            }
        } else {
            console.log("오류가 있습니다. 모든 필드를 확인하세요.");
            setShowRegisterError(true);
        }
    };

    const showPasswordError = !isPasswordValid && password.length > 0;
    const showConfirmPasswordError = confirmPassword.length >= 2 && !isPasswordMatch;
    const showEmailError = !isEmailValid && emailId.length > 0;
    
    return (
        <div className="registerone-con">
            <div className="register-header">
                <Link to="/"><img className="logo-img" alt="" src="/img/TOW.png" /></Link>
            </div>
            <div className="registerone-box">
                <form onSubmit={handleSubmit}>
                    <div className={`registerone-input-box r-email-input ${showVerificationInput && "height-up"}`}>
                        <div className={`registerone-input ${isEmailValid && emailCanAuth && emailId.trim() !== "" && !emailAuthEnd && "can-auth"}`}>
                            <div className="input-line">
                                <label>이메일</label>
                                <input 
                                    type="text" 
                                    className="register-email" 
                                    placeholder="아이디 입력" 
                                    value={emailId} 
                                    onChange={handleEmailIdChange}
                                    disabled={emailAuthEnd}
                                />
                                <select 
                                    value={emailDomain} 
                                    onChange={handleEmailDomainChange}
                                    disabled={emailAuthEnd}
                                >
                                    <option value="direct">직접입력</option>
                                    <option value="naver.com">@naver.com</option>
                                    <option value="gmail.com">@gmail.com</option>
                                    <option value="nate.com">@nate.com</option>
                                    <option value="hanmail.com">@hanmail.com</option>
                                </select>
                                {isEmailValid && emailCanAuth && emailId.trim() !== "" && !emailAuthEnd && isEmailSending === false && (
                                    <button 
                                        type="button" 
                                        className="verify-button"
                                        onClick={handleEmailVerification}
                                    >
                                        이메일 인증
                                    </button>
                                )}
                                {isEmailSending && (
                                    <LoadingComp />
                                )}
                            </div>
                            {showVerificationInput && (
                                <div className="verification-input-container">
                                    <div className="input-line">
                                        <input 
                                            type="text" 
                                            placeholder="인증번호 입력"
                                            value={verificationCode}
                                            className="verify-input-line-input"
                                            onChange={handleVerificationCodeChange}
                                        />
                                        <div className="timer-register">
                                            {formatTimer(timer)}
                                        </div>
                                        <button 
                                            type="button" 
                                            className="verify-button"
                                            onClick={handleVerifyCode}
                                        >
                                            인증번호 확인
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={`register-check ${showEmailError ? 'visible' : ''}`}>
                            올바른 이메일 형식이 아닙니다. (예: example@example.com)
                        </div>
                        <div className={`register-check ${isEmailExists ? 'visible' : ''}`}>
                            이미 사용 중인 이메일입니다.
                        </div>
                    </div>

                    <div className="registerone-input-box">
                        <div className={`registerone-input ${isEmailValid && emailCanAuth && emailId.trim() !== "" && !emailAuthEnd && "can-auth"}`}>
                            <div className="input-line">
                                <label>비밀번호</label>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="register-pw" 
                                    placeholder="8~12자 영문, 숫자, 특수문자" 
                                    value={password} 
                                    onChange={handlePasswordChange}
                                />
                                <button type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? '숨기기' : '보기'}
                                </button>
                            </div>                      
                        </div>
                        <div className={`register-check ${showPasswordError ? 'visible' : ''}`}>
                            8~12자의 영문, 숫자, 특수문자 중 2가지 이상으로만 가능합니다.
                        </div>
                    </div>

                    <div className="registerone-input-box">
                        <div className={`registerone-input ${isEmailValid && emailCanAuth && emailId.trim() !== "" && !emailAuthEnd && "can-auth"}`}>
                            <div className="input-line">
                                <label>비밀번호 확인</label>
                                <input 
                                    type={showPasswordConfirm ? "text" : "password"} 
                                    className="register-pw-confirm" 
                                    placeholder="비밀번호 확인" 
                                    value={confirmPassword} 
                                    onChange={handleConfirmPasswordChange}
                                />
                                <button type="button" onClick={togglePasswordConfirmVisibility}>
                                    {showPasswordConfirm ? '숨기기' : '보기'}
                                </button>
                            </div>                      
                        </div>
                        <div className={`register-check ${showConfirmPasswordError ? 'visible' : ''}`}>
                            비밀번호가 일치하지 않습니다.
                        </div>
                    </div>

                    <div className="registerone-input-box">
                        <div className={`registerone-input ${isEmailValid && emailCanAuth && emailId.trim() !== "" && !emailAuthEnd && "can-auth"}`}>
                            <div className="input-line">
                                <label>이름</label>
                                <input type="text" className="register-name" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        {/*<div className={`register-check ${name.trim() === "" ? 'visible' : ''}`}>
                            이름을 입력해 주세요.
                        </div>*/}
                    </div>
                    
                    {/* <div className="registerone-input-box">
                        <div className="registerone-input">
                            <div className="input-line">
                                <label>휴대폰</label>
                                <input 
                                    type="text" 
                                    className="register-phone" 
                                    placeholder="010 1234 5678" 
                                    value={phoneNumber} 
                                    onChange={handlePhoneChange} 
                                />
                            </div>
                        </div>
                        <div className={`register-check ${showPhoneError ? 'visible' : ''}`}>
                            올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)
                        </div>
                    </div> */}
                    
                    <div className="registerone-input-box">
                        <div className={`registerone-input ${isEmailValid && emailCanAuth && emailId.trim() !== "" && !emailAuthEnd && "can-auth"}`}>
                            <div className="input-line">
                                <label className="age-group">연령층</label>
                                <div className="registerone-input-age-group">
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="10-19" 
                                            checked={age === "10-19"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        10대
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="20-29" 
                                            checked={age === "20-29"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        20대
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="30-39" 
                                            checked={age === "30-39"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        30대
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="40-49" 
                                            checked={age === "40-49"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        40대
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="50-59" 
                                            checked={age === "50-59"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        50대
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="registerone-input-box">
                        <div className="registerone-input">
                            <div className="input-line">
                                <label className="gender">성별</label>
                                <div className="registerone-input-gender">
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="M" 
                                            checked={gender === "M"} 
                                            onChange={handleGenderChange} 
                                        />
                                        남성
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="F" 
                                            checked={gender === "F"} 
                                            onChange={handleGenderChange} 
                                        />
                                        여성
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <button className="register-submit" type="submit">가입완료</button>
                    <div className={`register-check ${showRegisterError ? 'visible' : ''}`}>
                        다시 확인해주십시오.
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterOne;