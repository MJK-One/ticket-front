import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_SERVER_HOST } from '../api/connect';
import { useLocation } from 'react-router-dom';
import './resetPwdForm.css';

const ResetPasswordPage = () => {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const resetPassword = async () => {
      try {
        // URL에서 토큰 파라미터 추출
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (!token) {
          throw new Error('토큰이 없습니다.');
        }

        // 백엔드로 토큰 전송
        await axios.get(`${API_SERVER_HOST}/api/pwdToken/resetPassword`, {
          params: { token }
        });

        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err.response?.data?.message || '임시 비밀번호 발급에 실패했습니다.');
      }
    };

    resetPassword();
  }, [location]);

  if (status === 'loading') {
    return (
      <div className="reset-password-container">
        <div className="reset-card">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">임시 비밀번호를 발급하고 있습니다...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="reset-password-container">
        <div className="reset-card">
          <div className="success-container">
            <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h2 className="message-title">임시 비밀번호 발급 완료</h2>
            <p className="message-text">
              이메일로 전송된 임시 비밀번호로 로그인해주세요.
              <br />
              로그인 후 반드시 비밀번호를 변경해주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="reset-password-container">
        <div className="reset-card">
          <div className="error-container">
            <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h2 className="message-title">죄송합니다</h2>
            <p className="message-text">
              {error}
              <br />
              다시 시도하시거나 관리자에게 문의해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ResetPasswordPage;