import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/header';
import Main from './mainpage/main/main';
import DetailPage from './detailpage/DetailPage';
import Search from './search/search';
// import Test from './test';

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} /> {/* 기본 경로를 Main 컴포넌트로 설정*/}
          <Route path="/genre/musicall" element={<Main />} />
          <Route path="/genre/consert" element={<Main />} />
          <Route path="/genre/exhibitionevent" element={<Main />} />
          <Route path="/genre/classic" element={<Main />} />
          {/* <Route path="/chlidfamliy" element={<Main />} /> */}
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/search' element={<Search />} />
          {/* <Route path="/" element={<Test />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
