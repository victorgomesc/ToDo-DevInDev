"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";

interface Task {
  id: number;
  taskName: string;
  category: string;
  date: string;
  priority: string;
  completed: boolean;
}

const TaskTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [updatedTask, setUpdatedTask] = useState<Partial<Task>>({});

  // 🔄 Busca as tarefas do backend
  const { data: tasks, isLoading, error } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("https://localhost:5074/task");
      return response.data;
    },
  });

  // ✅ Mutation para deletar uma tarefa específica
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      await axios.delete(`https://localhost:5074/task/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // ✅ Mutation para remover automaticamente as tarefas vencidas
  const cleanupTasksMutation = useMutation({
    mutationFn: async () => {
      await axios.delete("https://localhost:5074/task/cleanup"); // <- Endpoint que remove tarefas vencidas
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // ✅ Executa a remoção automática das tarefas vencidas periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      cleanupTasksMutation.mutate(); // 🔄 Chama a API para limpar tarefas vencidas
    }, 30000); // A cada 30 segundos

    return () => clearInterval(interval);
  }, [cleanupTasksMutation]);

  // ✅ Mutation para editar uma tarefa
  const editTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      await axios.put(`https://localhost:5074/task/${task.id}`, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEditingTask(null);
      setUpdatedTask({});
    },
  });

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setUpdatedTask(task);
  };

  const handleSaveClick = () => {
    if (editingTask) {
      editTaskMutation.mutate({ ...editingTask, ...updatedTask });
    }
  };

  if (isLoading) {
    return <div className="text-3xl">Loading...</div>;
  }

  if (error) {
    return <div className="loading">Algo deu errado!</div>;
  }

  const sortedTasks = tasks?.slice().sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="w-11/12 items-center bg-zinc-950 text-center flex flex-col justify-center mt-10">
      <div className="w-full rounded-lg">
        <div className="flex">
          <div className="border bg-zinc-900 font-bold border-gray-500 w-full items-center justify-center rounded-lg mb-6 flex">
            <div className="p-4 w-1/5 text-left">Task title</div>
            <div className="p-4 w-1/5">Category</div>
            <div className="p-4 w-1/5">Prioridade</div>
            <div className="p-4 w-1/5">Data de conclusão</div>
            <div className="p-4 w-1/5">Ações</div>
          </div>
        </div>

        {sortedTasks && sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <div className="flex" key={task.id}>
              <div className="border border-gray-500 w-full items-center justify-center rounded-lg mb-6 flex">
                {editingTask?.id === task.id ? (
                  <>
                    <input
                      className="p-4 w-1/5 text-left bg-gray-800 text-white"
                      value={updatedTask.taskName || ""}
                      onChange={(e) => setUpdatedTask({ ...updatedTask, taskName: e.target.value })}
                    />
                    <input
                      className="p-4 w-1/5 bg-gray-800 text-white"
                      value={updatedTask.category || ""}
                      onChange={(e) => setUpdatedTask({ ...updatedTask, category: e.target.value })}
                    />
                    <input
                      className="p-4 w-1/5 bg-gray-800 text-white"
                      value={updatedTask.priority || ""}
                      onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
                    />
                    <input
                      className="p-4 w-1/5 bg-gray-800 text-white"
                      type="date"
                      value={updatedTask.date || ""}
                      onChange={(e) => setUpdatedTask({ ...updatedTask, date: e.target.value })}
                    />
                    <button className="p-4 w-1/5 bg-green-600 text-white" onClick={handleSaveClick}>Salvar</button>
                  </>
                ) : (
                  <>
                    <div className="p-4 w-1/5 text-left">{task.taskName}</div>
                    <div className="p-4 w-1/5">{task.category}</div>
                    <div className="p-4 w-1/5">{task.priority}</div>
                    <div className="p-4 w-1/5">{task.date ? format(parseISO(task.date), "dd/MM/yyyy") : "Data inválida"}</div>
                    <div className="p-4 w-1/5 flex gap-2">
                      <div className="w-1/2 items-center">
                        <input type="checkbox" className="w-5 h-5 mt-1" onChange={() => deleteTaskMutation.mutate(task.id)} />
                      </div>
                      <div className="w-1/2">
                        <button className="bg-zinc-950 text-white px-2 py-1" onClick={() => handleEditClick(task)}>Editar</button>
                      </div>
                    </div>
                  </>
                )}
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
