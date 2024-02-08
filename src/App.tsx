import { Canvas, useLoader } from "@react-three/fiber";
import "./App.css";
import { TextureLoader, Vector3 } from "three";
import { Suspense, useState } from "react";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  useEnvironment,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import LoadScreen from "./components/loading";
import Drop from "./components/drop";
import Icosahedron from "./components/icosahedron";

const BackgroundDrops = () => {
  const bgTexture = useLoader(TextureLoader, "leaves.jpg");
  return (
    <mesh position={[0, 0, -1.5]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial map={bgTexture} />
    </mesh>
  );
};

const BackgroundIcosahedron = () => {
  const bgTexture = useLoader(TextureLoader, "flowers.jpg");
  return (
    <mesh position={[10, 0, -1.5]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial map={bgTexture} />
    </mesh>
  );
};

const BackgroundDragon = () => {
  const bgTexture = useLoader(TextureLoader, "scale.jpg");
  return (
    <mesh position={[-10, 0, -1.5]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial map={bgTexture} />
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

  gltf.scene.children.forEach((child: any) => {
    child.geometry.dispose();
    child.material.dispose();
  });

  return (
    <mesh
      position={[-10, 0, 0.8]}
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
        color={isHovered ? "hotpink" : "#ffffff"}
      />
    </mesh>
  );
};

const Scene = () => {
  const envMapBackground = useEnvironment({ files: "neon.hdr" });
  const envMapReflections = useEnvironment({ files: "neon-low.hdr" });
  return (
    <>
      <color attach="background" args={["#000"]} />
      <Environment map={envMapBackground} background={"only"} />
      <Environment map={envMapReflections} />

      <BackgroundDrops />
      <BackgroundIcosahedron />
      <BackgroundDragon />

      <CubeCamera>
        {/*@ts-ignore*/}
        {(texture): Element => (
          <>
            <Environment map={texture} />
            <group position={[0, 0, 0.5]}>
              <Drop position={new Vector3(0, 0, 0)} size={[1, 30, 30]} />
              <Drop
                position={new Vector3(1.1, 1.2, 0.5)}
                size={[0.5, 30, 30]}
              />
              <Drop
                position={new Vector3(0.2, 1.7, -1)}
                size={[0.25, 30, 30]}
              />
              <Drop
                position={new Vector3(-0.37, 1.63, 0.35)}
                size={[0.1, 30, 30]}
              />
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
                position={new Vector3(-1.2, -0.5, -0.85)}
                size={[0.22, 30, 30]}
              />
              <Drop
                position={new Vector3(-0.52, -0.1, 1.6)}
                size={[0.08, 30, 30]}
              />
            </group>

            <group position={[10, 0, 0]}>
              <Icosahedron
                position={new Vector3(-2, -2, 0.5)}
                size={[1, 0]}
                roughness={0}
              />
              <Icosahedron
                position={new Vector3(0, 0, 0.5)}
                size={[1, 0]}
                roughness={0.33}
              />
              <Icosahedron
                position={new Vector3(2, 2, 0.5)}
                size={[1, 0]}
                roughness={0.45}
              />
            </group>
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
