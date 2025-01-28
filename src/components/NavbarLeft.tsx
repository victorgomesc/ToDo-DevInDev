import React from 'react';
import { FaHome, FaUser, FaPlusSquare } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const NavbarLeft = () => {

  const navItems: NavItem[] = [
    { icon: <FaHome />, label: 'Home', href: '#' },
    { icon: <FaUser />, label: 'Victor Gomes', href: '#' },
    { icon: <MdLibraryAddCheck />, label: 'My tasks', href: '#' }
  ];

  const categories: string[] = [
    'Estudar', 'Faculdade', 'Dentista', 'Racha', 'Academia', 
    'Trabalho', 'Estudar React', 'Encontro', 'Pedalar'
  ];

  const renderNavItems = (items: NavItem[]) => {
    return items.map(item => (
      <a key={item.label} href={item.href} className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
        {item.icon}
        {item.label}
      </a>
    ));
  };

  const renderCategories = (categories: string[]) => {
    return categories.map(category => (
      <a key={category} href="#" className="text-sm text-zinc-400 hover:text-zinc-100">
        {category}
      </a>
    ));
  };

  return (
    <aside className="w-72 bg-zinc-950 p-6">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </div>

      <nav className="space-y-5 mt-10">
        {renderNavItems(navItems)}
      </nav>

      <nav className="space-y-5 mt-10 pt-10 border-t border-zinc-800">
        <a href="#" className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
          <FaPlusSquare />
          Add new Task
        </a>
      </nav>

      <nav className="mt-5 pt-5 border-t border-zinc-950 flex flex-col gap-3">
        {renderCategories(categories)}
      </nav>
    </aside>
  );
};

export default NavbarLeft;
