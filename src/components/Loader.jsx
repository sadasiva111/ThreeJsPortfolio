import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl font-bold text-white">Hello, I'm SADA</h1>
        <p className="text-xl text-white">I'm a full-stack developer</p>
      </div>
    </Html>
  );
};

export default Loader;
