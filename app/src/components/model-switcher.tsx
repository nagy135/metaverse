import deleteModel from "@api/delete-model";
import getModels from "@api/get-models";
import { TModel } from "@ctypes/entities";
import { JwtTokenContext } from "App";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto max-w-sm">
      <h1 className="text-3xl font-bold m-5 text-center">
        Your models
      </h1>
      <div className="container mx-auto flex flex-col justify-center">
        <div className="flex justify-around">
          <Link to="/create-model" className="btn btn-warning m-2 mx-auto">
            Add More
          </Link>
          <Link to="/models" className="btn btn-info m-2 mx-auto">
            Show all
          </Link>
        </div>
        <div className="mx-auto">
          {models.map((e, i) => {
            return (
              <div key={`model_div_${i}`} className="flex justify-end m-1">
                <Link
                  key={`model_link_${i}`}
                  className="btn"
                  to={`/models/${e.id}`}
                >
                  {e.name}
                </Link>
                <button
                  key={`delete_model_${i}`}
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
    </div>
  );
};
