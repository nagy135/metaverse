import { API_EP } from "@constants/api";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

interface IProps {
  modelId: number;
}

export default ({ modelId }: IProps) => {
  const geom = useLoader(STLLoader, `${API_EP}/models/file/${modelId}`);
  const ref = useRef<any>();

  const { camera } = useThree();
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
      <pointLight position={[0, 0, 20]} />
    </>
  );
};
