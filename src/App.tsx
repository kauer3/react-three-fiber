import { Canvas } from "@react-three/fiber";
import "./App.css";

const App = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[2, 2, 4]}/>
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
};

export default App;
