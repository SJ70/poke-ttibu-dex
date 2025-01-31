import './index.css';
import './App.css';
import Seals from './pages/seals';
import GoogleAnalytics from './googleAnalytics/googleAnalytics';

function App() {
  return (
    <div className='app'>
      <GoogleAnalytics />
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
