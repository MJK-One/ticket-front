import React from "react";
import { Link } from 'react-router-dom';
import './register.css';
function Register () {
    return(
        <div className="register-con">
            <div className="register-header">
                <Link to="/"><img className="logo-img" alt="" src="/img/TOW.png" /></Link>
            </div>
            <div className="register-box">
                <div className="register-one">
                    <h1 className="register-one-title">토우 회원가입</h1>
                    <Link to="/registerone"><button>개인 회원가입</button></Link>
                </div>
                <div className="snsRegister">
                    <ul>
                        <li>
                            <div className="kakaologin"></div>
                        </li>
                        <li>
                            <div className="naverlogin"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Register;