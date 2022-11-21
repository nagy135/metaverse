import getModel from "@api/get-model";
import { TModel } from "@ctypes/entities";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThreeModel from "./three-model";
import ThreeOrbitControls from "./three-orbitalcontrol";

export default () => {
  const [model, setModel] = useState<TModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) getModel(Number(id)).then((e) => setModel(e));
  }, [id]);

  return model ? (
    <div style={{width: '90vw', height: '90vh', marginLeft: '5vw', marginTop: '5vh'}}>
      <h1 className="text-3xl mb-5">
        Model: <strong>{model.name}</strong>(#{model.id}, {model.filename})
      </h1>
      <Canvas linear flat camera={{ position: [0,-50,20]}}>
        <Suspense fallback={null}>
          <ThreeModel modelId={model.id} />
        </Suspense>
        <ThreeOrbitControls />
      </Canvas>
    </div>
  ) : null;
};
