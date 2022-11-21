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
      <h1 className="text-3xl font-bold underline">Model</h1>
      {models.map((e) => {
        return (
          <div>
            <a href="">{e.name}</a>
          </div>
        );
      })}
    </>
  );
};
