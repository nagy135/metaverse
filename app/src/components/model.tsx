import getModel from "@api/get-model";
import { API_EP } from "@constants/api";
import { TModel } from "@ctypes/entities";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ThreeModel from "./three/model";
import ThreeOrbitControls from "./three/orbitalcontrol";

export default () => {
  const [model, setModel] = useState<TModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) getModel(Number(id)).then((e) => setModel(e));
  }, [id]);

  return model ? (
    <div className="mx-auto p-2 flex flex-col justify-items-stretch h-screen">
      <div className="flex justify-between">
        <Link className="btn mb-5" to="/">
          Back
        </Link>
        <a className="btn btn-warning" href={`${API_EP}/models/file/${model.id}`} download target="_blank">Download</a>
      </div>
      <h1 className="text-3xl mb-5">
        Model #{model.id}: <strong>{model.name}</strong>
      </h1>
      <h3 className="mb-5">
        {model.filename}
      </h3>
      <Canvas className="flex-1" linear flat camera={{ position: [0, -50, 20] }}>
        <Suspense fallback={null}>
          <ThreeModel modelId={model.id} />
        </Suspense>
        <ThreeOrbitControls />
      </Canvas>
    </div>
  ) : null;
};
