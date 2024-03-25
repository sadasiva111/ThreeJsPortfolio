import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import islandScene from "../assets/scene.gltf";

import { a } from "@react-spring/three";
const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const lastY = useRef(0); // Add a reference for the last Y position
  const rotationSpeedX = useRef(0); // Add a reference for the rotation speed around the x-axis
  const rotationSpeedY = useRef(0);
  const zoomSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY; // Get the Y coordinate
    lastX.current = clientX;
    lastY.current = clientY; // Store the Y coordinate
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false); // Set isRotating to false when the pointer is released
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY; // Get the Y coordinate
      const deltaX = (clientX - lastX.current) / viewport.width;
      const deltaY = (clientY - lastY.current) / viewport.height; // Calculate the Y delta
      islandRef.current.rotation.y += deltaX * 0.01 * Math.PI;
      islandRef.current.rotation.x += deltaY * 0.01 * Math.PI; // Rotate around the x-axis
      lastX.current = clientX;
      lastY.current = clientY; // Update the last Y position
      rotationSpeedY.current = deltaX * 0.01 * Math.PI;
      rotationSpeedX.current = deltaY * 0.01 * Math.PI; // Store the rotation speed around the x-axis
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    islandRef.current.position.y += e.deltaY * 0.01;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
    } else if (e.key === "ArrowRight") {
      setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeedY.current *= dampingFactor;
      rotationSpeedX.current *= dampingFactor; // Apply damping to the x-axis rotation speed
      if (Math.abs(rotationSpeedY.current) < 0.0001) rotationSpeedY.current = 0;
      if (Math.abs(rotationSpeedX.current) < 0.0001) rotationSpeedX.current = 0; // Stop x-axis rotation when the speed is negligible
    } else {
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("wheel", handleWheel); // Change this line
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("wheel", handleWheel); // Change this line
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove, handleWheel]);

  return (
    <a.group ref={islandRef} {...props}>
      <group rotation={[Math.PI / 2, 0, -Math.PI]}>
        <group rotation={[-Math.PI, 0, 0]} scale={0.01}>
          <group rotation={[0, 0, -Math.PI / 2]} scale={100}>
            <mesh
              geometry={nodes.characters_STONE_a_0.geometry}
              material={materials.STONE_a}
            />
            <mesh
              geometry={nodes.characters_STONE_a_0_1.geometry}
              material={materials.STONE_a}
            />
          </group>
          <group rotation={[0, 0, -Math.PI / 2]} scale={100}>
            <mesh
              geometry={nodes.characters007_bush_0.geometry}
              material={materials.bush}
            />
            <mesh
              geometry={nodes.characters007_bush_0_1.geometry}
              material={materials.bush}
            />
          </group>
          <mesh
            geometry={nodes.characters001_charcters_0.geometry}
            material={materials.charcters}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
          <mesh
            geometry={nodes.characters002_watermill_0.geometry}
            material={materials.watermill}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
          <mesh
            geometry={nodes.characters003_terrain_left_0.geometry}
            material={materials.terrain_left}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
          <mesh
            geometry={nodes.characters004_house_0.geometry}
            material={materials.house}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
          <mesh
            geometry={nodes.characters005_bridge_0.geometry}
            material={materials.bridge}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
          <mesh
            geometry={nodes.characters006_tree_0.geometry}
            material={materials.tree}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
          <mesh
            geometry={nodes.characters008_water_0.geometry}
            material={materials.water}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
          <mesh
            geometry={nodes.characters009_terrain_right_0.geometry}
            material={materials.terrain_right}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
          <mesh
            geometry={nodes.characters010_wheat_0.geometry}
            material={materials.wheat}
            rotation={[0, 0, -Math.PI / 2]}
            scale={100}
          />
        </group>
      </group>
    </a.group>
  );
};

export default Island;
