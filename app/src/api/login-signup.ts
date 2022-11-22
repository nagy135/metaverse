import { API_EP } from "@constants/api";

export const LOGIN_EP = `${API_EP}/login`;
export const SIGNUP_EP = `${API_EP}/signup`;

type TLoginSignupData = {
  username: string;
  password: string;
};

export default async (
  loginSignup: "login" | "signup",
  { username, password }: TLoginSignupData
): Promise<string> => {
  return (
    await fetch(loginSignup === "login" ? LOGIN_EP : SIGNUP_EP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((e) => e.json())
  ).access_token;
};
