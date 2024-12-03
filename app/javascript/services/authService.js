import axios from "axios";

const API_URL = "/users";
axios.defaults.headers.common["X-CSRF-Token"] =
  document.querySelector("[name=csrf-token]").content;

// axios.defaults.withCredentials = true;

const register = async (name, email, password, passwordConfirmation) => {
  const response = await axios.post(`${API_URL}`, {
    user: {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/sign_in`, {
    user: { email, password },
  });
  return response.data;
};

const logout = async () => {
  await axios.delete(`${API_URL}/sign_out`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Auth Logout");
  
};

export default { register, login, logout };
