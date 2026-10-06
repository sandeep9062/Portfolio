"use client";

const HeroLights = () => {
  return (
    <>
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#5eead4"
      />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.2}
        color="#fff"
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#5eead4" />
    </>
  );
};

export default HeroLights;