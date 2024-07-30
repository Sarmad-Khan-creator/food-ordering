import React from 'react';

const Unauthorized = () => {
  return (
    <section className="w-full h-screen flex flex-col gap-5 items-center mt-40">
      <h2 className="text-3xl font-semibold">Unauthorized</h2>
      <p className="text-lg">You are unauthorized to visit this route</p>
    </section>
  );
};

export default Unauthorized;
