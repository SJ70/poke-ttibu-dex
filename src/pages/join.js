import './login.css';
import './join.css';
import { useState } from 'react';

function Join () {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isEmailCertified, setIsEmailCertified] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    function handleAuthEmail (email) {
        return true;
    };

    function handleEmailChange (event) {
        setEmail(event.target.value);
    };

    function validatePassword (pw) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        return passwordRegex.test(pw);
    };

    function handlePasswordChange (event) {
        let value = event.target.value;
        setPassword(value);
        if (validatePassword(value)) {
            setIsPasswordValid(true);
            setPasswordError('');
        }
        else {
            setIsPasswordValid(false);
            setPasswordError('비밀번호는 8자 이상 16자 이하의 영문자와 숫자로 이루어져야 합니다.');
        }
    };

    return (
        <div className='login'>
            <h2>
                회원가입
            </h2>

            <label>
                <p>
                    이메일
                </p>
                <input id='email' type='text' placeholder='example@email.com' onChange={handleEmailChange}/>
                <button className={isEmailCertified ? 'auth-email deactivated gray-btn' : 'auth-email gray-btn'} onClick={handleAuthEmail}>
                    인증
                </button>
            </label>

            <label>
                <p>
                    비밀번호
                </p>
                <input id='password' type='password' placeholder='password' onChange={handlePasswordChange} />
            </label>

            <button className={isEmailCertified && isPasswordValid ? 'red-btn' : 'deactivated-btn'}>
                회원가입
            </button>
            
            <div className='error-div'>
                <p className='error'>
                        {emailError}
                </p>
                <p className='error'>
                        {passwordError}
                </p>
            </div>
        </div>
    );
}

export default Join;