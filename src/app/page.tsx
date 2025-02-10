"use client"

import React from "react";
import Hero from "@/components/Hero";
import NavbarLeft from "@/components/NavbarLeft";
import NavbarRigth from "@/components/NavbarRigth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '../lib/react-query'


export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <NavbarLeft />
        <Hero />
        <NavbarRigth />
      </div>
      </div>
    </QueryClientProvider>
    
  );
}
