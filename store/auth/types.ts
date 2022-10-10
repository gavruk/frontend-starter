export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken?: string,
  errors?: Map<string, unknown>;
}

export interface ISignupRequest extends ILoginResponse {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ISignupResponse extends ILoginResponse {
}

export interface IGetMeResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

