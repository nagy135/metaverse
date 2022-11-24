import getAllModels from "@api/get-all-models";
import { TModel } from "@ctypes/entities";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [models, setModels] = useState<TModel[]>([]);

  useEffect(() => {
    getAllModels().then((e) => setModels(e));
  }, []);
  return (
    <>
      <div className="flex">
        <Link className="btn m-2" to="/">Back</Link>
        <h1 className="text-3xl font-bold m-5 text-center">All models</h1>
      </div>
      <div className="container mx-auto flex flex-col justify-center">
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
