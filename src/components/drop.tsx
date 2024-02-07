import { useState } from "react";
import { Vector3 } from "three";
import { MeshDistortMaterial } from "@react-three/drei";

const Drop = ({ position, size }: { position: Vector3; size: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <mesh
      position={position}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={(event) => (event.stopPropagation(), setIsHovered(false))}
    >
      <sphereGeometry args={size} />
      <MeshDistortMaterial
        distort={0.75 - size[0] * 0.35}
        speed={0.15 + size[0] * 0.35}
        transmission={0.95}
        thickness={0.7}
        roughness={0}
        color={isHovered ? "#99ddff" : "#e4ffff"}
      />
    </mesh>
  );
};

export default Drop;
