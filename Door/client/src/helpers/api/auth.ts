import { APICore } from './apiCore';

const api = new APICore();
const baseURL = "https://lancers-hub.onrender.com/api/auth"; // Backend API base URL

// account
function login(params: { email: string; password: string }) {
    return api.create(`${baseURL}/login`, params);
}

function logout() {
    return api.create(`${baseURL}/logout`, {});
}

function signup(params: { fullname: string; email: string; password: string }) {
    return api.create(`${baseURL}/register`, params);
}

function forgotPassword(params: { email: string }) {
    return api.create(`${baseURL}/forget-password`, params);
}

export { login, logout, signup, forgotPassword };
