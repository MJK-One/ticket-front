import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/header';
import Main from './mainpage/main';
import Musicall from './mainpage/musicall';
import Consert from './mainpage/consert';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} /> {/* 기본 경로를 Main 컴포넌트로 설정 */}
          <Route path="/musicall" element={<Musicall />} />
          <Route path="/consert" element={<Consert />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;