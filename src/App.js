import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import RegionPage from './regionpage/RegionPage';
import MonthPage from './monthpage/monthpage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFilters } from './store/slice/searchSlice';
import Header from './component/header/home/header';

const Main = lazy(() => import('./mainpage/main/main'));
const Genre = lazy(() => import('./mainpage/genre/genre'));
const DetailPage = lazy(() => import('./detailpage/DetailPage'));
const Search = lazy(() => import('./search/search'));
const Login = lazy(() => import('./login/login'));
const RegisterOne = lazy(() => import('./login/registerone'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {/*<HeaderWithConditionalRendering />*/}
        <ClearFiltersOnNavigation /> {/* 위치 변화 감지용 컴포넌트 */}
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
        </Routes>
      </Suspense>
    </Router>
  );
}

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
