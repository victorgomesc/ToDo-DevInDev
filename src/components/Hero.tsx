import React from 'react';
import TaskTable from './Tascks';

const Hero = () => {
  return (
    <main className="flex-1 flex-col p-6 bg-zinc-950">
      <div className="w-full h-2/5 bg-cover bg-center" style={{ backgroundImage: "url('/assets/garden.jpeg')" }}>
        <div className="flex items-center justify-center w-full h-full">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center drop-shadow-lg">
            Organize seu tempo
          </h1>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center mt-6">
        <TaskTable />
      </div>
    </main>
  );
};

export default Hero;

