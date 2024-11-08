import React, { Suspense, lazy, useEffect } from 'react';
import { API_SERVER_HOST } from './api/connect.js';
import axios from 'axios';
import './App.css';
import RegionPage from './regionpage/RegionPage';
import MonthPage from './monthpage/monthpage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './login/userContext.js';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/slice/userSlice.js';
import { clearFilters } from './store/slice/searchSlice';
import Header from './component/header/home/header';

const Main = lazy(() => import('./mainpage/main/main'));
const Genre = lazy(() => import('./mainpage/genre/genre'));
const DetailPage = lazy(() => import('./detailpage/DetailPage'));
const Search = lazy(() => import('./search/search'));
const Login = lazy(() => import('./login/login'));
const RegisterOne = lazy(() => import('./login/registerone'));
const Mypage = lazy(() => import('./mypage/mypage'));
const ReservationForm = lazy(() => import('./Reservation'));

function App() {
  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          {/*<HeaderWithConditionalRendering />*/}
          <ClearFiltersOnNavigation /> {/* 위치 변화 감지용 컴포넌트 */}
          <CheckLoginSesstion /> {/* 로그인 세션 확인 */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/genre/musicall" element={<Genre />} />
            <Route path="/genre/consert" element={<Genre />} />
            <Route path="/genre/exhibitionevent" element={<Genre />} />
            <Route path="/genre/classic" element={<Genre />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/search" element={<Search />} />
            <Route path='/region' element={<RegionPage />} />
            <Route path='/month' element={<MonthPage />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="registerone" element={<RegisterOne/>} />
            <Route path="/mypage" element={<Mypage/>} />
            <Route path='/reservation' element={<ReservationForm />} />
          </Routes>
        </Suspense>
      </Router>
  );
}

/*
function HeaderWithConditionalRendering() {
  const location = useLocation();
  
  // 로그인 페이지와 회원가입 페이지, 개인 회원가입 페이지 Header를 표시하지 않음
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/registerone';

  return (
    <>
      {!isAuthPage && <Header />} 
    </>
  );
}
*/

// 로그인 세션 체크: 페이지 로드될때마다 체크
function CheckLoginSesstion() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkLogin() {
      try {
        const responseSession = await axios.get(`${API_SERVER_HOST}/checkLoginSession`, { withCredentials: true });

        // 로그인 세션의 존재 여부에 따라 redux 업데이트
        if(responseSession.data.isLoggedIn === true) {
          const responseType = await axios.get(`${API_SERVER_HOST}/checkLoginType?email=${responseSession.data.user}`);
          dispatch(login({
            email: responseSession.data.user,
            type: responseType.data
          }));
        } else {
          dispatch(logout());
        }

      } catch (error) {
        console.log('로그인 체크 실패');
      }
    }
    checkLogin();
  }, []);

  return null;
}


// 위치 변화 감지용 컴포넌트
function ClearFiltersOnNavigation() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // 페이지가 '/search가 아니면 slice 초기화'
    if (location.pathname !== '/search') {
      dispatch(clearFilters());
    }
  }, [location, dispatch]);

  return null;
}

export default App;
