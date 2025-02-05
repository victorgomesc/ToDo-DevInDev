import { create } from "zustand";

interface Task {
  taskName: string;
  category: string;
  priority: string;
  date: string;
}

interface TaskStore {
  isModalOpen: boolean;
  task: Task;
  openModal: () => void;
  closeModal: () => void;
  setTaskField: (field: keyof Task, value: string) => void;
  resetTask: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  isModalOpen: false,
  task: {
    taskName: "",
    category: "",
    priority: "",
    date: "",
  },
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setTaskField: (field, value) =>
    set((state) => ({
      task: { ...state.task, [field]: value },
    })),
  resetTask: () =>
    set({
      task: {
        taskName: "",
        category: "",
        priority: "",
        date: "",
      },
    }),
}));
