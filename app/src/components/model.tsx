import getModel from "@api/get-model";
import { TModel } from "@ctypes/entities";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThreeModel from "./three-model";

export default () => {
  const [model, setModel] = useState<TModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) getModel(Number(id)).then((e) => setModel(e));
  }, [id]);

  return model ? (
    <div className="container mx-auto flex flex-col justify-center my-5">
      <h1 className="text-3xl">
        Model: <strong>{model.name}</strong>(#{model.id}, {model.filename})
      </h1>
      <Canvas>
        <Suspense fallback={null}>
          <ThreeModel modelId={model.id} />
        </Suspense>
      </Canvas>
    </div>
  ) : null;
};
