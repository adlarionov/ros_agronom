import httpClient from "../api/httpClient";

async function login(login: string, password: string): Promise<{ id: number }> {
  return httpClient.post("/workers/login", { body: { login, password } });
}

const LoginService = {
  login,
};

export default LoginService;
