"use client";

import React from "react";
import { FaHome, FaUser, FaPlusSquare } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "../store/TaskStore"; 

const NavbarLeft: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { isModalOpen, task, openModal, closeModal, setTaskField, resetTask } = useTaskStore();

  const navItems = [
    { icon: <FaHome />, label: "Home", href: "#" },
    { icon: <FaUser />, label: "Victor Gomes", href: "#" },
    { icon: <MdLibraryAddCheck />, label: "My tasks", href: "#" },
  ];

  const categories = ["Estudo", "Trabalho", "Atividade Fisica", "Lazer", "Outro"];
  const prioridades = ["Alta", "Media", "Moderada", "Altissima"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("https://localhost:5074/task", task, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Tarefa cadastrada com sucesso!");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      closeModal();
      resetTask();
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao cadastrar task. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <aside className="w-72 bg-zinc-950 p-6">
        <nav className="space-y-5 mt-10">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
              {item.icon} {item.label}
            </a>
          ))}
        </nav>

        <nav className="space-y-5 mt-10 pt-10 border-t border-zinc-800">
          <button className="flex items-center gap-3 text-sm font-semibold text-zinc-200" onClick={openModal}>
            <FaPlusSquare /> Add new Task
          </button>
        </nav>

        <nav className="mt-5 pt-5 border-t border-zinc-950 flex flex-col gap-3">
          {categories.map((category) => (
            <a key={category} href="#" className="text-sm text-zinc-400 hover:text-zinc-100">
              {category}
            </a>
          ))}
        </nav>
      </aside>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeModal}>
          <div className="bg-zinc-900 p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-zinc-200">Add New Task</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-zinc-400">Task Name</label>
                <input
                  type="text"
                  value={task.taskName}
                  onChange={(e) => setTaskField("taskName", e.target.value)}
                  className="w-full p-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-600"
                  placeholder="Enter task name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400">Category</label>
                <select
                  value={task.category}
                  onChange={(e) => setTaskField("category", e.target.value)}
                  required
                  className="w-full p-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-600"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400">Prioridade</label>
                <select
                  value={task.priority}
                  onChange={(e) => setTaskField("priority", e.target.value)}
                  required
                  className="w-full p-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-600"
                >
                  <option value="">Selecione uma prioridade</option>
                  {prioridades.map((prioridade) => (
                    <option key={prioridade} value={prioridade}>
                      {prioridade}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400">Data de conclusão</label>
                <input
                  type="date"
                  value={task.date}
                  onChange={(e) => setTaskField("date", e.target.value)}
                  required
                  className="w-full p-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-600"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-green-600 text-zinc-100 rounded hover:bg-green-700">
                Save Task
              </button>
            </form>
            <button className="mt-4 w-full py-2 bg-red-600 text-zinc-100 rounded hover:bg-red-700" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarLeft;
