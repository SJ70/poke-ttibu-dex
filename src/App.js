import './index.css';
import './App.css';
import Market from './pages/market.js';
import Seals from './pages/seals.js';
import MyInfo from './pages/myInfo.js';
import Message from './pages/message.js';
import Login from './pages/login.js';
import Join from './pages/join.js';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className='app'>
      <Router>
        <header>
          <div className='nav-bar'>
            <Link className='title' to='/'> 포케띠부덱스 </Link>
            <Links />
          </div>
        </header>

        <div className='page'>
          <Routes>
            <Route path="/" element={<Seals />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/market" element={<Market />} />
            <Route path="/message" element={<Message />} />
            <Route path="/my-info" element={<MyInfo />} />
          </Routes>
        </div>

        <footer>
          <Links />
        </footer>
      </Router>
    </div>
  );
}

function Links() {
  return (
    <div className='btns'>
      <Link className='btn' to='/'>
        <span className="material-symbols-outlined"> collections_bookmark </span>
        <p> 도감 </p>
      </Link>
      <Link className='btn' to='/market'>
        <span className="material-symbols-outlined"> store </span>
        <p> 장터 </p>
      </Link>
      <Link className='btn' to='/message'>
        <span className="material-symbols-outlined"> mail </span>
        <p> 메시지 </p>
      </Link>
      <Link className='btn' to='/my-info'>
        <span className="material-symbols-outlined"> account_circle </span>
        <p> 내 정보 </p>
      </Link>
    </div>
  )
}

export default App;
