"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

interface Task {
  id: number;
  taskName: string;
  category: string;
  date: string;
  priority: string;
  completed: boolean;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Função para alternar o estado de uma tarefa (completa / não completa)
  const toggleTaskCompletion = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Função para buscar as tarefas da API com axios
  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://localhost:5074/task");  // URL da sua API
      setTasks(response.data);  // Atualiza o estado com as tarefas recebidas
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Chama a função de buscar tarefas quando o componente é montado
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-11/12 items-center bg-zinc-950 text-center flex flex-col justify-center mt-10">
      <div className="w-full rounded-lg">
        <div className='flex'>
          <div className="border bg-zinc-900 font-bold border-gray-500 w-full items-center justify-center rounded-lg mb-6 flex">
            <div className={`p-4 w-1/5 text-left ${''}`}>
              Task title
            </div>
            <div className={`p-4 w-1/5 ${''}`}>
              Category
            </div>
            <div className={`p-4 w-1/5 ${''}`}>
              Prioridade
            </div>
            <div className={`p-4 w-1/5 ${''}`}>
              Data de conclusão
            </div>
            <div className="p-4 w-1/5">
              Status
            </div>
          </div>
        </div>

        {tasks.map(task => (
          <div className='flex' key={task.id}>
            <div className="border border-gray-500 w-full items-center justify-center rounded-lg mb-6 flex">
              <div className={`p-4 w-1/5 text-left ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.taskName}
              </div>
              <div className={`p-4 w-1/5 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.category}
              </div>
              <div className={`p-4 w-1/5 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.priority}
              </div>
              <div className={`p-4 w-1/5 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {format(new Date(task.date), 'dd/MM/yyyy')}
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
