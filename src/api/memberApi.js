import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + '/member';

export async function createMember(nickname, email, password) {
  const data = {
    nickname: nickname,
    email: email,
    password: password
  };

  try {
    await axios.post(`${API_BASE_URL}`, data);
    console.log('회원가입 성공');
  } catch (e) {
    console.error(e);
  }
}

export async function isNicknameExists(nickname) {
  try {
    const response = await axios.get(`${API_BASE_URL}/isNicknameDuplicated?nickname=${nickname}`);
    console.log('닉네임 중복:', response.data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function isEmailExists(email) {
  try {
    const response = await axios.get(`${API_BASE_URL}/isEmailDuplicated?email=${email}`);
    console.log('이메일 중복:', response.data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function login(email, password) {
  const data = {
    email: email,
    password: password
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    console.log('로그인 성공', response.data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}