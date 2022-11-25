import getModel from "@api/get-model";
import { API_EP } from "@constants/api";
import { CAMERA_POSITION } from "@constants/three";
import { TModel } from "@ctypes/entities";
import { Canvas, Vector3 } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AxesHelper } from "three/src/helpers/AxesHelper";
import ThreeModel from "./three/model";
import ThreeOrbitControls from "./three/orbitalcontrol";

export default () => {
  const [model, setModel] = useState<TModel | null>(null);
  const { id } = useParams();
  const rotateRef = useRef<number | null>(null);
  const [rotate, setRotate] = useState<number | null>(null);

  useEffect(() => {
    if (id) getModel(Number(id)).then((e) => setModel(e));
  }, [id]);

  const handleRotate = useCallback((direction: number | null) => {
    if (direction === rotateRef.current) direction = null;
    rotateRef.current = direction;
    setRotate(direction);
  }, []);

  return model ? (
    <div className="mx-auto p-2 flex flex-col justify-items-stretch h-screen">
      <div className="flex justify-between">
        <Link className="btn mb-5" to="/">
          Back
        </Link>
        <a
          className="btn btn-warning"
          href={`${API_EP}/models/file/${model.id}`}
          download
          target="_blank"
        >
          Download
        </a>
      </div>
      <h1 className="text-3xl mb-5">
        Model #{model.id}: <strong>{model.name}</strong>
      </h1>
      <h3 className="mb-5">{model.filename}</h3>
      <Canvas
        className="flex-1"
        linear
        flat
        camera={{ position: CAMERA_POSITION as Vector3 }}
      >
        <primitive object={new AxesHelper(10)} />
        <Suspense fallback={null}>
          <ThreeModel rotateRef={rotateRef} modelId={model.id} />
        </Suspense>
        <ThreeOrbitControls />
      </Canvas>
      <div className="flex justify-between">
        <button className={`btn ${rotate === -1 ? 'btn-error' : ''}`} onClick={() => handleRotate(-1)}>
          Left
        </button>
        <button className={`btn ${rotate === 1 ? 'btn-error' : ''}`} onClick={() => handleRotate(1)}>
          Right
        </button>
      </div>
    </div>
  ) : null;
};
