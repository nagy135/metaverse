import { API_EP } from "@constants/api";
import { TJwtToken } from "@ctypes/jwt";

export const MODELS_EP = `${API_EP}/models`;

export default async (jwtToken: TJwtToken, data: FormData): Promise<void> => {
  await fetch(`${MODELS_EP}`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};
