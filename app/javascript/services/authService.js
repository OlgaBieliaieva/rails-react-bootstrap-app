import axios from "axios";

const API_URL = "/users";
axios.defaults.headers.common["X-CSRF-Token"] =
  document.querySelector("[name=csrf-token]").content;

// axios.defaults.withCredentials = true;

const register = async (email, password, passwordConfirmation) => {
  const response = await axios.post(`${API_URL}`, {
    user: { email, password, password_confirmation: passwordConfirmation },
  });
  console.log(response.data);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/sign_in`, {
    user: { email, password },
  });
  console.log(response.data.user.id);
  return response.data;
};

const logout = async () => {
  await axios.delete(`${API_URL}/sign_out`);
};

export default { register, login, logout };
