import React from 'react'
import TaskTable from './Tascks'

const Hero = () => {
  return (
  <main className="flex-1 p-6 bg-zinc-950">    
    <div className="relative w-full h-screen flex items-center justify-center bg-zinc-950">
     <div
        className="absolute top-0 left-0 w-full h-2/5 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/garden.jpeg')" }} 
       >
        <div className="relative flex items-center justify-center w-full h-full">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center drop-shadow-lg">
              Organize your life
          </h1>
        </div>
     </div>       
      <TaskTable />
    </div>
    
  </main> 
  )
}

export default Hero


