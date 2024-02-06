import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { PlaneGeometry, Scene, Vector3 } from "three";
import { useRef, useState } from "react";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Water } from "three/examples/jsm/objects/Water2.js";

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

  {
    /*const scene = new Scene();
  const water = new Water(
    new PlaneGeometry(10000, 10000),
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load("waternormals.jpg", function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  )*/
  }

  return (
    <mesh
      position={position}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={(event) => (event.stopPropagation(), setIsHovered(false))}
    >
      <sphereGeometry args={size} />
      <MeshDistortMaterial
        transmission={.5}
        thickness={0.5}
        roughness={0}
        color={isHovered ? color : "#d4f1f9"}
      />
    </mesh>
  );
};

const Icosahedron = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={"#d4f1f9"}
        roughness={0}
        transmission={0}
        thickness={0.5}
      />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <directionalLight color={"fff0dd"} position={[0, 5, 10]} />
      <directionalLight color={"fff0dd"} position={[0, 5, -10]} />

      {/*<ambientLight intensity={0.1} />

      <group position={[0, 0, .5]}>
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
        position={new Vector3(0, 0, -2.5)}
        size={[1, 30, 30]}
        color={"hotpink"}
      />

      <Icosahedron />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
