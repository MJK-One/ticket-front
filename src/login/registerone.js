import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './registerone.css';

function RegisterOne() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailDomain, setEmailDomain] = useState("direct");
    const [gender, setGender] = useState(""); // 성별 상태 추가
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailId, setEmailId] = useState("");
    const [showRegisterError, setShowRegisterError] = useState(false);
    const [isEmailExists, setIsEmailExists] = useState(false);
    const [ageGroup, setAgeGroup] = useState(""); // 연령층 상태 추가

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

    const handlePhoneChange = (e) => {
        const inputPhone = e.target.value;
        setPhoneNumber(inputPhone);
        
        const phonePattern = /^(010[- ]?\d{4}[- ]?\d{4})$/;
        setIsPhoneValid(phonePattern.test(inputPhone));
    };

    const handleEmailDomainChange = (e) => {
        const newDomain = e.target.value;
        setEmailDomain(newDomain);
        
        if (newDomain !== "direct") {
            const newEmailId = emailId.split('@')[0];
            setEmailId(newEmailId);
            setIsEmailValid(validateEmail(newEmailId, newDomain));
        } else {
            setIsEmailValid(validateEmail(emailId, newDomain));
        }
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleAgeGroupChange = (e) => {
        setAgeGroup(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

          const isFormValid = emailId.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "" &&
                            phoneNumber.trim() !== "" && ageGroup.trim() !== "" && gender.trim() !== "" &&
                            isEmailValid && isPasswordValid && isPasswordMatch && isPhoneValid;


        if (isFormValid) {
            console.log("가입 완료!");
            setShowRegisterError(false);
        } else {
            console.log("오류가 있습니다. 모든 필드를 확인하세요.");
            setShowRegisterError(true);
        }
    };

    const showPasswordError = !isPasswordValid && password.length > 0;
    const showConfirmPasswordError = confirmPassword.length >= 2 && !isPasswordMatch;
    const showPhoneError = !isPhoneValid && phoneNumber.length > 0;
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
                                <input type="text" className="register-name" placeholder="" />
                            </div>
                        </div>
                        <div className="register-check">
                            빈칸
                        </div>
                    </div>
                    
                    <div className="registerone-input-box">
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
                    </div>
                    
                    <div className="registerone-input-box">
                        <div className="registerone-input">
                            <div className="input-line">
                                <label className="age-group">연령층</label>
                                <div className="registerone-input-age-group">
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="10대" 
                                            checked={ageGroup === "10대"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        10대
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="20대" 
                                            checked={ageGroup === "20대"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        20대
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="30대" 
                                            checked={ageGroup === "30대"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        30대
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="40대" 
                                            checked={ageGroup === "40대"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        40대
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="50대 이상" 
                                            checked={ageGroup === "50대 이상"} 
                                            onChange={handleAgeGroupChange} 
                                        />
                                        50대 이상
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="registerone-input-box">
                        <div className="registerone-input">
                            <div className="input-line">
                                <label className="gender">성별</label>
                                <div className="registerone-input-gender">
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="male" 
                                            checked={gender === "male"} 
                                            onChange={handleGenderChange} 
                                        />
                                        남성
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="female" 
                                            checked={gender === "female"} 
                                            onChange={handleGenderChange} 
                                        />
                                        여성
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

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
