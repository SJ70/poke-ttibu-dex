import axios from 'axios';

export async function createMember (nickname, email, password) {
  const data = {
    nickname: nickname,
    email: email,
    password: password
  };

  try {
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/member`, data);
  } catch (e) {
    console.error(e);
  }

}
