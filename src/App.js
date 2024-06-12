import React, { Suspense, lazy } from 'react';
import './App.css';
import RegionPage from './regionpage/RegionPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/header';

const Main = lazy(() => import('./mainpage/main/main'));
const Genre = lazy(() => import('./mainpage/genre/genre'));
const DetailPage = lazy(() => import('./detailpage/DetailPage'));
const Search = lazy(() => import('./search/search'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Main />} />
          <Route path="/genre/musicall" element={<Genre />} />
          <Route path="/genre/consert" element={<Genre />} />
          <Route path="/genre/exhibitionevent" element={<Genre />} />
          <Route path="/genre/classic" element={<Genre />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/search" element={<Search />} />
=======
          <Route path="/" element={<Main />} /> {/* 기본 경로를 Main 컴포넌트로 설정*/}
          <Route path="/genre/musicall" element={<Main />} />
          <Route path="/genre/consert" element={<Main />} />
          <Route path="/genre/exhibitionevent" element={<Main />} />
          <Route path="/genre/classic" element={<Main />} />
          {/* <Route path="/chlidfamliy" element={<Main />} /> */}
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/region' element={<RegionPage />} />
          {/* <Route path="/" element={<Test />} /> */}
>>>>>>> f8e3a651609fac9a5d420d78e9e5a9a3a802e09b
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;