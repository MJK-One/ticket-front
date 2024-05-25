import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/header';
import Main from './mainpage/main/main';
import DetailPage from './detailpage/DetailPage';
import Search from './search/search';
// import Test from './test';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} /> {/* 기본 경로를 Main 컴포넌트로 설정*/}
          <Route path="/musicall" element={<Main />} />
          <Route path="/consert" element={<Main />} />
          <Route path="/exhibitionevent" element={<Main />} />
          <Route path="/classicdance" element={<Main />} />
          <Route path="/theater" element={<Main />} />
          <Route path="/chlidfamliy" element={<Main />} />
          <Route path='/detail' element={<DetailPage />} />
          <Route path='/search' element={<Search />} />
          {/* <Route path="/" element={<Test />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;