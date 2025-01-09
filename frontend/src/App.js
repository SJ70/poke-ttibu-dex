import './index.css';
import './App.css';
import Change from './pages/change.js';
import Seals from './pages/seals.js';
import MyInfo from './pages/myInfo.js';
import Message from './pages/message.js';
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

        <body>
          <Routes>
            <Route path="/" element={<Seals />} />
            <Route path="/change" element={<Change />} />
            <Route path="/message" element={<Message />} />
            <Route path="/my-info" element={<MyInfo />} />
          </Routes>
        </body>

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
        <span class="material-symbols-outlined"> collections_bookmark </span>
        <p> 도감 </p>
      </Link>
      <Link className='btn' to='/change'>
        <span class="material-symbols-outlined"> store </span>
        <p> 장터 </p>
      </Link>
      <Link className='btn' to='/message'>
        <span class="material-symbols-outlined"> mail </span>
        <p> 메시지 </p>
      </Link>
      <Link className='btn' to='/my-info'>
        <span class="material-symbols-outlined"> account_circle </span>
        <p> 내 정보 </p>
      </Link>
    </div>
  )
}

export default App;
