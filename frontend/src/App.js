import './index.css';
import './App.css';

function App() {
  return (
    <div className='app'>
      
      <header>
        <div className='nav-bar'>
          <p className='title'> 포케띠부덱스 </p>
          <div className='btns'>
            <div className='btn'>
              <span class="material-symbols-outlined"> collections_bookmark </span>
            </div>
            <div className='btn'>
              <span class="material-symbols-outlined"> published_with_changes </span>
            </div>
            <div className='btn'>
              <span class="material-symbols-outlined"> mail </span>
            </div>
            <div className='btn'>
              <span class="material-symbols-outlined"> account_circle </span>
            </div>
          </div>
        </div>
      </header>

      <body>
      </body>

      <footer>
          <div className='btn'>
            <span class="material-symbols-outlined"> collections_bookmark </span>
            <p> 내 씰 </p>
          </div>
          <div className='btn'>
            <span class="material-symbols-outlined"> published_with_changes </span>
            <p> 교환 </p>
          </div>
          <div className='btn'>
            <span class="material-symbols-outlined"> mail </span>
            <p> 메시지 </p>
          </div>
          <div className='btn'>
            <span class="material-symbols-outlined"> account_circle </span>
            <p> 내 정보 </p>
          </div>
      </footer>

    </div>
  );
}

export default App;
