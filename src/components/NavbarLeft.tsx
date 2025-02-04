"use client";

import React, { useState } from 'react';
import { FaHome, FaUser, FaPlusSquare } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query'; 

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NavbarLeft: React.FC = () => {
  const queryClient = useQueryClient(); 

  const navItems = [
    { icon: <FaHome />, label: 'Home', href: '#' },
    { icon: <FaUser />, label: 'Victor Gomes', href: '#' },
    { icon: <MdLibraryAddCheck />, label: 'My tasks', href: '#' }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      taskName,
      category,
      priority,
      date,
    };

    try {
      await axios.post("https://localhost:5074/task", newTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert('Tarefa cadastrada com sucesso!');

      // Invalide a query 'tasks' para forçar a refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      setIsModalOpen(false);
      setTaskName("");
      setCategory("");
      setPriority("");
      setDate("");
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      alert('Erro ao cadastrar task. Tente novamente mais tarde.');
    }
  };

  const categories = [
    'Estudo', 'Trabalho', 'Atividade Fisica', 'Lazer', 'outro'
  ];

  const prioridades = [
    'Alta', 'Media', 'Moderada', 'Altissima'
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
    <>
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
          <button
            className="flex items-center gap-3 text-sm font-semibold text-zinc-200"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlusSquare />
            Add new Task
          </button>
        </nav>

        <nav className="mt-5 pt-5 border-t border-zinc-950 flex flex-col gap-3">
          {renderCategories(categories)}
        </nav>
      </aside>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-zinc-900 p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-zinc-200">Add New Task</h2>
            <form className="mt-4 space-y-4" name='cadastro' onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-zinc-400">Task Name</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full p-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-600"
                  placeholder="Enter task name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-600"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400">Prioridade</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-600"
                >
                  <option value="">Selecione uma prioridade</option>
                  {prioridades.map((prioridade) => (
                    <option key={prioridade} value={prioridade}>{prioridade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400">Data de conclusão</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-zinc-100 rounded hover:bg-green-700"
              >
                Save Task
              </button>
            </form>
            <button
              className="mt-4 w-full py-2 bg-red-600 text-zinc-100 rounded hover:bg-red-700"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarLeft;