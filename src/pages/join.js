import './login.css';
import './join.css';
import { useState } from 'react';
import { createMember, isNicknameExists, isEmailExists } from '../api/memberApi';
import { Link, useNavigate } from 'react-router-dom';

function Join () {

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameUnique, setIsNicknameUnique] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailCertified, setIsEmailCertified] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  return (
    <div className='login'>
      <h2> 회원가입 </h2>

      <form onSubmit={handleSubmit}>
        <label>
          <p> 닉네임 </p>
          <input type='text' placeholder='nickname' onChange={handleNicknameChange} />
          <button className={!isNicknameUnique ? 'check-btn red-btn' : 'check-btn deactivated-btn'} onClick={handleCheckNicknameExists}>
            {isNicknameUnique ? '사용 가능' : '중복 확인'}
          </button>
        </label>

        <label>
            <p> 이메일 </p>
            <input type='text' placeholder='example@email.com' onChange={handleEmailChange} autoComplete="email" />
            <button className={!isEmailCertified ? 'check-btn red-btn' : 'check-btn deactivated-btn'} onClick={handleAuthEmail}>
              인증
            </button>
        </label>

        <label>
          <p> 비밀번호 </p>
          <input type='password' placeholder='password' onChange={handlePasswordChange} autoComplete="new-password" />
        </label>

        <button type='submit' className={isNicknameValid && isEmailCertified && isPasswordValid ? 'submit red-btn' : 'submit deactivated-btn'} >
          회원가입
        </button>
      </form>

      <Link className='switch' to='/login'> 
        <p> 이미 아이디가 있으신가요? 로그인하러 가기 </p>
      </Link>
          
      <div className='error-div'>
        <p className='error'>
          {nicknameError}
        </p>
        <p className='error'>
          {emailError}
        </p>
        <p className='error'>
          {passwordError}
        </p>
      </div>
    </div>
  );

  function handleNicknameChange(event) {
    let value = event.target.value;
    setNickname(value);
    setIsNicknameValid(false);
    setIsNicknameUnique(false);
    validateNickname(value);
  };
  function validateNickname(pw) {
    const passwordRegex = /^[가-힣A-Za-z0-9]{3,10}$/;
    if (passwordRegex.test(pw)) {
      setIsNicknameValid(true);
      setNicknameError('');
    }
    else {
      setNicknameError('닉네임은 3~10자의 한글/영어/숫자로 이루어져야 합니다.');
    }
  };
  async function handleCheckNicknameExists(event) {
    event.preventDefault();
    if (!isNicknameValid) {
        return;
    }
    if (await isNicknameExists(nickname)) {
      setIsNicknameUnique(false);
      setNicknameError('이미 존재하는 닉네임입니다.');
      return;
    }
    setIsNicknameUnique(true);
    setNicknameError('');
  }

  function handleEmailChange(event) {
    let value = event.target.value;
    setEmail(value);
    setIsEmailCertified(false);
  };
  async function handleAuthEmail(event) {
    event.preventDefault();
    if (await isEmailExists(email)) {
      setIsEmailCertified(false);
      setEmailError('이미 등록된 이메일입니다.');
      return;
    }
    // 이메일 인증
    setIsEmailCertified(true);
    setEmailError('');
  };

  function handlePasswordChange(event) {
    let value = event.target.value;
    setPassword(value);
    if (validatePassword(value)) {
      setIsPasswordValid(true);
      setPasswordError('');
    }
    else {
      setIsPasswordValid(false);
      setPasswordError('비밀번호는 8~16의 영문자+숫자로 이루어져야 합니다.');
    }
  };
  function validatePassword(pw) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return passwordRegex.test(pw);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isNicknameValid || !isNicknameUnique || !isEmailCertified || !isPasswordValid) {
      return;
    }
    await createMember(nickname, email, password);
    window.alert("회원가입이 완료되었습니다.");
    navigate("/login");
  }

}

export default Join;