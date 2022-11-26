import { Box3, Box3Helper, Color, Mesh, Scene, Vector3 } from "three";

export const angleToRadians = (angle: number): number =>
  angle * (Math.PI / 180);

export const getMeshCenterAndSize = (
  mesh: Mesh,
  scene?: Scene // adds bounding box directly to the scene
): { center: Vector3; size: Vector3 } => {
  const box3 = new Box3().setFromObject(mesh);
  const center = new Vector3();
  box3.getCenter(center);

  const size = new Vector3();
  box3.getSize(size);

  if (scene) {
    const helper = new Box3Helper(box3, new Color(0, 0, 0));
    scene.add(helper);
  }

  return {
    center,
    size,
  };
};
