import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TaskFormProps {
  addTask: (task: { title: string; description: string }) => void;
  updateTask: (id: string, task: { title: string; description: string }) => void;
  taskToEdit: Task | null;
  setTaskToEdit: (task: Task | null) => void;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, updateTask, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskToEdit) {
      updateTask(taskToEdit.id, { title, description });
      setTaskToEdit(null);
    } else {
      addTask({ title, description });
    }

    setTitle("");
    setDescription("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="card p-8 mb-8 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        {taskToEdit ? (
          <motion.div
            initial={{ rotate: -5 }}
            animate={{ rotate: 0 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        )}
        <h2 className="text-2xl font-bold text-gray-800">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input"
            placeholder="Enter task title..."
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            rows={3} // Fix the type error by using a number instead of string
            placeholder="Enter task description (optional)..."
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-primary"
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </motion.button>
          {taskToEdit && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setTaskToEdit(null)}
              className="btn-secondary"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;