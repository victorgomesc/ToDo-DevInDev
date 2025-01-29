"use client"
import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  category: string;
  date: string;
  prioridade: string;
  completed: boolean;
}

const TaskTable: React.FC = () => {
  // Lista de tarefas (inicialmente com algumas tarefas)
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Estudar React', category: "Estudos", prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
    { id: 2, title: 'Aprender TypeScript', category: "Atividade fisica", prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
    { id: 3, title: 'Revisar Tailwind CSS', category: "Trabalho", prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
    { id: 4, title: 'Estudar React', category: "Lazer", prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
    { id: 5, title: 'Aprender TypeScript', category: "Outro", prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
    { id: 6, title: 'Revisar Tailwind CSS', category: "Lazer", prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
  ]);

  // Função para alternar o estado de uma tarefa (completa / não completa)
  const toggleTaskCompletion = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="w-11/12 items-center bg-zinc-950 text-center flex flex-col justify-center mt-10">
      <div className="w-full rounded-lg">
      <div className='flex' >
            <div className="border bg-zinc-900 font-bold border-gray-500 w-full items-center justify-center rounded-lg mb-6 flex">
              <div className={`p-4 w-1/5 text-left 'line-through text-gray-500' : ''}`}>
                Task title
              </div>
              <div className={`p-4 w-1/5 'line-through text-gray-500' : ''}`}>
                Category
              </div>
              <div className={`p-4 w-1/5 'line-through text-gray-500' : ''}`}>
                Prioridade
              </div>
              <div className={`p-4 w-1/5 'line-through text-gray-500' : ''}`}>
                Data de conclusão
              </div>
              <div className="p-4 w-1/5">
                Status
              </div>
            </div>
            </div>

          {tasks.map(task => (
            <div className='flex' key={task.id} >
            <div className="border border-gray-500 w-full items-center justify-center rounded-lg mb-6 flex">
              <div className={`p-4 w-1/5 text-left ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </div>
              <div className={`p-4 w-1/5 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.category}
              </div>
              <div className={`p-4 w-1/5 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.prioridade}
              </div>
              <div className={`p-4 w-1/5 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.date}
              </div>
              <div className="p-4 w-1/5">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="w-5 h-5 text-blue-500 text-right"
                />
              </div>
            </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskTable;
