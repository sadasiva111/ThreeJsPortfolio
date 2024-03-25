import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "../components/Loader";
import Island from "../models/Island";
import HomePopups from "../components/HomePopups";

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  const adjustIslandforScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -7, -20];
    let screenRotation = [0.1, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, screenRotation];
  };
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandforScreenSize();
  return (
    <section className="w-full h-screen bg-slate-200">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomePopups currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen relative bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" />
          <ambientLight intensity={0.5} />

          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
