"use client"
import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  date: string;
  prioridade: string;
  completed: boolean;
}

const TaskTable: React.FC = () => {
  // Lista de tarefas (inicialmente com algumas tarefas)
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Estudar React', prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
    { id: 2, title: 'Aprender TypeScript', prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
    { id: 3, title: 'Revisar Tailwind CSS', prioridade: "Alta", date: "10/02/2025 - 10:30 PM", completed: false },
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
    <div className="w-4/5 items-center bg-zinc-950 text-center flex flex-col justify-center mt-36">
      <div className="w-full rounded-lg">

          {tasks.map(task => (
            <div className='flex' key={task.id} >
            <div className="border w-full items-center justify-center rounded-lg mb-6 flex">
              <div className={`p-4 w-1/4 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </div>
              <div className={`p-4 w-1/4 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.prioridade}
              </div>
              <div className={`p-4 w-1/4 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.date}
              </div>
              <div className="p-4 w-1/4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="w-5 h-5 text-blue-500"
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
