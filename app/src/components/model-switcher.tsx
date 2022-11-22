import deleteModel from "@api/delete-model";
import getModels from "@api/get-models";
import { TModel } from "@ctypes/entities";
import { JwtTokenContext } from "App";
import { useCallback, useContext, useEffect, useState } from "react";

export default () => {
  const { jwtToken } = useContext(JwtTokenContext);
  const [models, setModels] = useState<TModel[]>([]);

  useEffect(() => {
    getModels(jwtToken).then((e) => setModels(e));
  }, []);

  const handleDelete = useCallback((modelId: number) => {
    deleteModel(jwtToken, modelId).then(() =>
      setModels((prev) => prev.filter((x) => x.id != modelId))
    );
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold m-5 text-center">
        Models belonging to YOU:
      </h1>
      <div className="container mx-auto flex flex-col justify-center">
        <div className="mx-auto">
          {models.map((e, i) => {
            return (
              <div className="flex justify-end m-1">
                <a key={`model_${i}`} className="btn" href={`/models/${e.id}`}>
                  {e.name}
                </a>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="btn btn-error ml-2"
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
