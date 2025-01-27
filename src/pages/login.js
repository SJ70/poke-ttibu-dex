import { useState } from 'react';
import './login.css';
import { login } from '../api/memberApi';
import { Link, useNavigate } from 'react-router-dom';
import { decodeSeals } from '../util/sealsUtil';
import useSealsStore from '../store/useSealsStore';

function Login () {
    
  const { setServerSeals, setClientSeals } = useSealsStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  return (
    <div className='login'>
      <h2>
        로그인
      </h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          <p> 이메일 </p>
          <input type='text' placeholder='example@email.com' onChange={(e) => setEmail(e.target.value)} autoComplete='email' />
        </label>
        <label>
          <p> 비밀번호 </p>
          <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' />
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

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await login(email, password);

    // 토큰
    const token = response.token;
    const expires = new Date();
    expires.setTime(expires.getTime() + 60 * 60 * 1000);
    document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`;
    // document.cookie = `token=${response.token}; path=/; expires=${expires.toUTCString()}; secure; HttpOnly; SameSite=Strict`;

    // 씰 정보
    const seals = decodeSeals(response.collectedSeals);
    setClientSeals(seals);
    setServerSeals(seals);

    navigate('/');
  }

}

export default Login;