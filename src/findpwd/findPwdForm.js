import React, { useState } from 'react';
import axios from 'axios';
import { API_SERVER_HOST } from '../api/connect';
import './findPwdForm.css';

const FindPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axios.post(`${API_SERVER_HOST}/api/pwdToken/findPassword`, { email });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || '이메일 전송에 실패했습니다. (SNS 로그인 사용자이신가요? SNS 로그인은 비밀번호가 없습니다.)');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="find-password-container">
        <div className="form-card">
          <div className="success-container">
            <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="success-title">메일함을 확인해주세요</p>
            <p className="success-message">임시 비밀번호 발급 링크가 전송되었습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="find-password-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">비밀번호 찾기</h2>
          <div className="title-underline"></div>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
            <div className="email-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <svg className="error-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                처리중...
              </>
            ) : '비밀번호 찾기'}
          </button>
        </form>

        <p className="info-text">
          * 가입하신 이메일 주소를 입력하시면, 임시 비밀번호 발급 링크를 보내드립니다.
        </p>
      </div>
    </div>
  );
};

export default FindPasswordForm;