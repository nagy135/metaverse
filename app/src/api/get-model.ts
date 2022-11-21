import { API_EP } from "@constants/api";
import { TModel } from "@ctypes/entities";

export const MODELS_EP = `${API_EP}/models`;

export default async (modelId: number): Promise<TModel> => {
  return (await fetch(`${MODELS_EP}/${modelId}`)).json();
};
