import { API_EP } from "@constants/api";
import { TModel } from "@ctypes/entities";
import { TJwtToken } from "@ctypes/jwt";

export const MODELS_EP = `${API_EP}/models`;

export default async (jwtToken: TJwtToken): Promise<TModel[]> => {
  return (
    await fetch(MODELS_EP, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
  ).json();
};
