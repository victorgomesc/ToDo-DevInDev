"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";

interface Task {
  id: number;
  taskName: string;
  category: string;
  date: string;
  priority: string;
  completed: boolean;
}

const TaskTable: React.FC = () => {

  const {
    data: tasks, 
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("https://localhost:5074/task");
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="text-3xl">Loading...</div>;
  }

  if (error) {
    return <div className="loading">Algo deu errado!</div>;
  }

  return (
    <div className="w-11/12 items-center bg-zinc-950 text-center flex flex-col justify-center mt-10">
      <div className="w-full rounded-lg">
        <div className="flex">
          <div className="border bg-zinc-900 font-bold border-gray-500 w-full items-center justify-center rounded-lg mb-6 flex">
            <div className="p-4 w-1/5 text-left">Task title</div>
            <div className="p-4 w-1/5">Category</div>
            <div className="p-4 w-1/5">Prioridade</div>
            <div className="p-4 w-1/5">Data de conclusão</div>
            <div className="p-4 w-1/5">Status</div>
          </div>
        </div>

        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="flex" key={task.id}>
              <div className="border border-gray-500 w-full items-center justify-center rounded-lg mb-6 flex">
                <div
                  className={`p-4 w-1/5 text-left ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.taskName}
                </div>
                <div
                  className={`p-4 w-1/5 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.category}
                </div>
                <div
                  className={`p-4 w-1/5 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.priority}
                </div>
                <div
                  className={`p-4 w-1/5 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.date ? format(new Date(task.date), "dd/MM/yyyy") : "Data inválida"}
                </div>
                <div className="p-4 w-1/5">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-5 h-5 text-blue-500 text-right"
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Nenhuma tarefa encontrada.</div>
        )}
      </div>
    </div>
  );
};

export default TaskTable;