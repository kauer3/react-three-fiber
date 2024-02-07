import { Canvas, useLoader } from "@react-three/fiber";
import "./App.css";
import { TextureLoader, Vector3 } from "three";
import { Suspense, useState } from "react";
import {
  CubeCamera,
  Environment,
  MeshDistortMaterial,
  OrbitControls,
  useEnvironment,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import LoadScreen from "./components/load";

const BackgroundDrops = () => {
  const bgTexture = useLoader(TextureLoader, "src/assets/leaves.jpg");
  return (
    <mesh position={[0, 0, -1.5]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial map={bgTexture} />
    </mesh>
  );
};

const BackgroundIcosahedron = () => {
  const bgTexture = useLoader(TextureLoader, "src/assets/flowers.jpg");
  return (
    <mesh position={[10, 0, -1.5]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial map={bgTexture} />
    </mesh>
  );
};

const BackgroundDragon = () => {
  const bgTexture = useLoader(TextureLoader, "src/assets/scale.jpg");
  return (
    <mesh position={[-10, 0, -1.5]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial map={bgTexture} />
    </mesh>
  );
};

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
        distort={0.4}
        speed={0.3}
        transmission={0.95}
        thickness={0.7}
        roughness={0}
        color={isHovered ? "#99ddff" : "#e4ffff"}
      />
    </mesh>
  );
};

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

const Dragon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const gltf = useLoader(GLTFLoader, "dragon.glb");
  const dragon = gltf.scene.children.find(
    (mesh) => mesh.name === "Dragon",
  ) as any;

  const geometry = dragon.geometry.clone();

  geometry.rotateX(Math.PI / 2);
  geometry.translate(0, -4, 0);

  gltf.scene.children.forEach((child) => {
    child.geometry.dispose();
    child.material.dispose();
  });

  return (
    <mesh
      position={[-9.8, 0, 0.5]}
      scale={[0.4, 0.4, 0.4]}
      geometry={geometry}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={(event) => (event.stopPropagation(), setIsHovered(false))}
    >
      <meshPhysicalMaterial
        metalness={0}
        roughness={0}
        transmission={1}
        thickness={2}
        color={isHovered ? "hotpink" : "#d4f1f9"}
      />
    </mesh>
  );
};

const Scene = () => {
  const envMap = useEnvironment({ files: "neon.hdr" });
  return (
    <>
      <color attach="background" args={["#000"]} />
      <Environment map={envMap} background />

      <BackgroundDrops />
      <BackgroundIcosahedron />
      <BackgroundDragon />

      <CubeCamera>
        {/*@ts-ignore*/}
        {(texture): Element => (
          <>
            <Environment map={texture} />
            <Drop position={new Vector3(0, 0, 0)} size={[1, 30, 30]} />
            <Drop position={new Vector3(1.1, 1.2, 0.5)} size={[0.5, 30, 30]} />
            <Drop position={new Vector3(0.2, 1.7, -1)} size={[0.25, 30, 30]} />
            <Drop position={new Vector3(-0.5, 1.3, 1)} size={[0.1, 30, 30]} />
            <Drop
              position={new Vector3(-1.25, 0.7, -0.55)}
              size={[0.33, 30, 30]}
            />
            <Drop
              position={new Vector3(1.25, 0.2, 0.4)}
              size={[0.17, 30, 30]}
            />
            <Drop
              position={new Vector3(1.2, -0.8, -0.4)}
              size={[0.12, 30, 30]}
            />
            <Drop
              position={new Vector3(-1.2, -0.5, -1)}
              size={[0.22, 30, 30]}
            />

            <Icosahedron
              position={new Vector3(7.9, -2, 0.5)}
              size={[1, 0]}
              roughness={0}
            />
            <Icosahedron
              position={new Vector3(9.9, 0, 0.5)}
              size={[1, 0]}
              roughness={0.33}
            />
            <Icosahedron
              position={new Vector3(11.9, 2, 0.5)}
              size={[1, 0]}
              roughness={0.45}
            />
            <Dragon />
          </>
        )}
      </CubeCamera>

      <OrbitControls />
    </>
  );
};

const App = () => {
  return (
    <Suspense fallback={<LoadScreen />}>
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
        }}
      >
        <Scene />
      </Canvas>
    </Suspense>
  );
};

export default App;
