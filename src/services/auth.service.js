import API from "../config/api";

const signin = async (username, password) => {
  return await API.post("/api/auth/signin", {
    username: username,
    password: password,
  }).then(res => {
    if (res.data.accessToken) {
      localStorage.setItem("awesomeLeadsToken", JSON.stringify(res.data));
    }
    return res.data;
  })
}

const logout = () => {
  localStorage.removeItem("awesomeLeadsToken");
  window.location.reload();
}

const register = (name, username, password) => {
  return API.post("/api/auth/signup", {
    name,
    username,
    password,
    roles:["admin"]
  });
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('awesomeLeadsToken'));
}

export {
  signin,
  logout,
  register, 
  getCurrentUser
}