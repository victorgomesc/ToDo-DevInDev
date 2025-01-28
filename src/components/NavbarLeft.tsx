import React from 'react'

import { FaHome } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";

const NavbarLeft = () => {
  return (
    <aside className="w-72 bg-zinc-950 p-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <nav className="space-y-5 mt-10">
          <a href="" className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
            <FaHome />
            Home
          </a>
          <a href="" className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
            <FaHome />
            Search
          </a>
          <a href="" className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
            <MdLibraryAddCheck />
            Your Libary
          </a>
        </nav>

        <nav className="space-y-5 mt-10 pt-10 border-t border-zinc-800">
          <a href='' className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
          <FaPlusSquare />
            Add new playlist
            </a>
        </nav>

        <nav className="mt-5 pt-5 border-t border-zinc-950 flex flex-col gap-3">
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Forró</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Forró Antigas</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Rock</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Classicos do Rock</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Pagode</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Sertanejo</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Sertanejo Antigas</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Bob Marley</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Eletronicas</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">internacionais</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">Funck</a>
          <a href='' className="text-sm text-zinc-400 hover:text-zinc-100">This is Felipe Amorin</a>
        </nav>
      </aside>
  )
}

export default NavbarLeft
