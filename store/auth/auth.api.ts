import client from "../../api";

import * as types from './types';

const api = {
  login: (data: types.ILoginRequest): Promise<types.ILoginResponse> => client.post(`/auth/login`, data),
  signup: (data: types.ISignupRequest): Promise<types.ISignupResponse> => client.post(`/auth/signup`, data),
  logout: (): Promise<void> => client.del(`/auth/token`),
  getMe: (): Promise<types.IGetMeResponse> => client.get(`/auth/me`),
};

export default api;
