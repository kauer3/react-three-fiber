import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { Vector3 } from "three";
import { useRef, useState } from "react";
import { MeshDistortMaterial, MeshWobbleMaterial, OrbitControls } from "@react-three/drei";

const Cube = ({
  position,
  size,
  color,
}: {
  position: Vector3;
  size: number[];
  color: string;
}) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta / 2;
    ref.current.position.z = 2 + Math.sin(state.clock.getElapsedTime());
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({
  position,
  size,
  color,
}: {
  position: Vector3;
  size: any;
  color: string;
}) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <mesh
      position={position}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={(event) => (event.stopPropagation(), setIsHovered(false))}
    >
      <sphereGeometry args={size} />
      <MeshDistortMaterial distort={.4} color={isHovered ? "hotpink" : "#d4f1f9"} />
      <OrbitControls />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <directionalLight position={[-1, -0.5, 2]} intensity={2} />
      <ambientLight intensity={0.2} />

      {/*<group position={[0, 0, .5]}>
        <Cube
          position={new Vector3(1, 1, 2)}
          size={[1, 1, 1]}
          color={"hotpink"}
        />
        <Cube
          position={new Vector3(-1, 1, 2)}
          size={[1, 1, 1]}
          color={"lightblue"}
        />
        <Cube
          position={new Vector3(1, -1, 2)}
          size={[1, 1, 1]}
          color={"yellow"}
        />
        <Cube
          position={new Vector3(-1, -1, 2)}
          size={[1, 1, 1]}
          color={"lightgreen"}
        />
      </group>

      <Cube
        position={new Vector3(0, 0, 0)}
        size={[1, 1, 1]}
        color={"hotpink"}
      />*/}

      <Sphere
        position={new Vector3(0, 0, 0)}
        size={[1, 30, 30]}
        color={"hotpink"}
      />

    </Canvas>
  );
};

export default App;
