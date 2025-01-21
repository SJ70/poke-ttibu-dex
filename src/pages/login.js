import './login.css';

function Login () {
    return (
        <div className='login'>
            <h2>
                로그인
            </h2>
            <label>
                <p>
                    이메일
                </p>
                <input id='email' type='text' placeholder='example@email.com' />
            </label>
            <label>
                <p>
                    비밀번호
                </p>
                <input id='password' type='text' placeholder='password' />
            </label>
            <button className='submit btn'>
                로그인
            </button>
        </div>
    );
}

export default Login;