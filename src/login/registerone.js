import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { API_SERVER_HOST } from "../api/connect";

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
        setIsEmailValid(validateEmail(inputEmailId, emailDomain));
        setIsEmailExists(false);
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

        // 이메일 도메인이 'direct'가 아닐 때 이메일을 처리
        if (newDomain !== "direct") {
            const emailParts = emailId.split('@');
            if (emailParts.length > 1) {
                setEmailId(emailParts[0]); // @ 이전 부분만 남김
            }
            setIsEmailValid(validateEmail(emailParts[0], newDomain));
        } else {
            setIsEmailValid(validateEmail(emailId, newDomain));
        }
    };

    const handleAgeGroupChange = (e) => {
        setAge(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isFormValid = emailId.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== ""
                            && age.trim() !== "" &&
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
                    <div className="registerone-input-box">
                        <div className="registerone-input">
                            <div className="input-line">
                                <label>이메일</label>
                                <input 
                                    type="text" 
                                    className="register-email" 
                                    placeholder="아이디 입력" 
                                    value={emailId} 
                                    onChange={handleEmailIdChange} 
                                />
                                <select 
                                    value={emailDomain} 
                                    onChange={handleEmailDomainChange}
                                >
                                    <option value="direct">직접입력</option>
                                    <option value="naver.com">@naver.com</option>
                                    <option value="gmail.com">@gmail.com</option>
                                    <option value="nate.com">@nate.com</option>
                                    <option value="hanmail.com">@hanmail.com</option>
                                </select>
                            </div>
                        </div>
                        <div className={`register-check ${showEmailError ? 'visible' : ''}`}>
                            올바른 이메일 형식이 아닙니다. (예: example@example.com)
                        </div>
                        <div className={`register-check ${isEmailExists ? 'visible' : ''}`}>
                            이미 사용 중인 이메일입니다.
                        </div>
                    </div>
                    <div className="registerone-input-box">
                        <div className="registerone-input">
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
                        <div className="registerone-input">
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
                        <div className="registerone-input">
                            <div className="input-line">
                                <label>이름</label>
                                <input type="text" className="register-name" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className={`register-check ${name.trim() === "" ? 'visible' : ''}`}>
                            이름을 입력해 주세요.
                        </div>
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
                        <div className="registerone-input">
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