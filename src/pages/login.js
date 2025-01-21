import { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

function Login () {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='login'>
      <h2>
        로그인
      </h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          <p> 이메일 </p>
          <input type='text' placeholder='example@email.com' onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p> 비밀번호 </p>
          <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className={(email !== '' && password !== '') ? 'submit red-btn' : 'submit deactivated-btn'} >
            로그인
        </button>
      </form>

      <Link className='switch' to='/join'> 
        <p> 아이디가 없으신가요? 회원가입하러 가기 </p>
      </Link>
        
    </div>
  );

  function handleSubmit(event) {
    
  }

}

export default Login;