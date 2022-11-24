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
): Promise<string | null> => {
  const response = await fetch(loginSignup === "login" ? LOGIN_EP : SIGNUP_EP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) throw new Error("cant signup");

  if (loginSignup === "login") {
    return (await response.json()).access_token;
  }
  return null;
};
