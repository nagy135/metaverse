import getModels from "@api/get-models";
import { TModel } from "@ctypes/entities";
import { JwtTokenContext } from "App";
import { useContext, useEffect, useState } from "react";

export default () => {
  const { jwtToken } = useContext(JwtTokenContext);
  const [models, setModels] = useState<TModel[]>([]);

  useEffect(() => {
    getModels(jwtToken).then((e) => setModels(e));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold m-5 text-center">Models belonging to YOU:</h1>
      <div className="container mx-auto flex flex-col justify-center">
        {models.map((e, i) => {
          return (
            <a key={`model_${i}`} className="btn m-1" href={`/models/${e.id}`}>
              {e.name}
            </a>
          );
        })}
      </div>
    </>
  );
};
