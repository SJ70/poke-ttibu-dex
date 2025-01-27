import './index.css';
import './App.css';
import Seals from './pages/seals';

function App() {
  return (
    <div className='app'>
        <header>
          <div className='nav-bar'>
            <span className='title' to='/'> 포케띠부덱스 </span>
          </div>
        </header>

        <div className='page'>
          <Seals/>
        </div>
    </div>
  );
}

export default App;
