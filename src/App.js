import React, { Suspense, lazy } from 'react';
import './App.css';
import RegionPage from './regionpage/RegionPage';
import MonthPage from './monthpage/monthpage';
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
          <Route path="/" element={<Main />} />
          <Route path="/genre/musicall" element={<Genre />} />
          <Route path="/genre/consert" element={<Genre />} />
          <Route path="/genre/exhibitionevent" element={<Genre />} />
          <Route path="/genre/classic" element={<Genre />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/search" element={<Search />} />
          <Route path='/region' element={<RegionPage />} />
          <Route path='/month' element={<MonthPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;