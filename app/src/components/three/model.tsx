import { API_EP } from "@constants/api";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { RefObject, useEffect, useRef } from "react";
import { Mesh } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

interface IProps {
  modelId: number;
  rotateRef: RefObject<number | null>;
}

export default ({ modelId, rotateRef }: IProps) => {
  const geom = useLoader(STLLoader, `${API_EP}/models/file/${modelId}`);
  const ref = useRef<Mesh>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (ref.current === null || rotateRef.current === null) return;
    ref.current.rotation.z += rotateRef.current < 0 ? 0.01 : -0.01;
  });

  useEffect(() => {
    // @ts-ignore
    camera.lookAt(ref.current.position);
  });

  return (
    <>
      <mesh ref={ref}>
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      <ambientLight intensity={0.3} />
      <pointLight position={[-50, 20, 0]} />
      <pointLight position={[50, 20, 0]} />
      <pointLight color={"#ffcc00"} power={5} position={[50, 0, 50]} />
      <pointLight color={"#cccccc"} power={35} position={[-50, 0, 30]} />
      <pointLight color={"#cccccc"} power={35} position={[0, 0, -50]} />
    </>
  );
};
