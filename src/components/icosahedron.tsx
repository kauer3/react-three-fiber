import { useState } from "react";
import { Vector3 } from "three";

const Icosahedron = ({
  position,
  size,
  roughness,
}: {
  position: Vector3;
  size: any;
  roughness: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <mesh
      position={position}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={(event) => (event.stopPropagation(), setIsHovered(false))}
    >
      <icosahedronGeometry args={size} />
      <meshPhysicalMaterial
        metalness={0}
        roughness={roughness}
        transmission={1}
        thickness={2}
        color={isHovered ? "orange" : "#d4f1f9"}
      />
    </mesh>
  );
};

export default Icosahedron;
