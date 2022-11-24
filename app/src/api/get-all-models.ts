import { API_EP } from "@constants/api";
import { TModel } from "@ctypes/entities";

export const ALL_MODELS_EP = `${API_EP}/models/all`;

export default async (): Promise<TModel[]> => {
  return (
    await fetch(ALL_MODELS_EP)
  ).json();
};
