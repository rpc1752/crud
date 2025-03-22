import { useState, useEffect } from "react";
import Head from "next/head";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterButtons from "../components/FilterButtons";
import { motion } from "framer-motion";

/**
 * @typedef {Object} Task
 * @property {string} id - Unique identifier for the task
 * @property {string} title - Task title
 * @property {string} [description] - Optional task description
 * @property {boolean} completed - Whether the task is completed
 * @property {string} createdAt - ISO string representation of creation date
 */

export default function Home() {
	/** @type {[Task[], React.Dispatch<React.SetStateAction<Task[]>>]} */
	const [tasks, setTasks] = useState([]);
	/** @type {[Task|null, React.Dispatch<React.SetStateAction<Task|null>>]} */
	const [taskToEdit, setTaskToEdit] = useState(null);
	/** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	/**
	 * Add a new task
	 * @param {{ title: string, description: string }} task
	 */
	const addTask = (task) => {
		const newTask = {
			id: Date.now().toString(),
			title: task.title,
			description: task.description,
			completed: false,
			createdAt: new Date().toISOString(),
		};
		setTasks([newTask, ...tasks]);
	};

	/**
	 * Delete a task by id
	 * @param {string} id
	 */
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
		if (taskToEdit && taskToEdit.id === id) {
			setTaskToEdit(null);
		}
	};

	/**
	 * Update an existing task
	 * @param {string} id
	 * @param {{ title: string, description: string }} updatedTask
	 */
	const updateTask = (id, updatedTask) => {
		setTasks(
			tasks.map((task) =>
				task.id === id
					? {
							...task,
							title: updatedTask.title,
							description: updatedTask.description,
					  }
					: task
			)
		);
	};

	/**
	 * Toggle the completed status of a task
	 * @param {string} id
	 */
	const toggleComplete = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<Head>
				<title>Task Manager | Organize Your Day</title>
				<meta
					name="description"
					content="A beautiful task management application to organize your daily tasks"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<main className="container mx-auto py-12 px-4 max-w-4xl">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<div className="inline-block p-2 px-4 mb-4 rounded-full bg-primary-100 text-primary-800 font-medium text-sm">
						Organize your tasks effortlessly
					</div>
					<h1 className="text-4xl font-bold text-gray-800 mb-2">
						Task Manager
					</h1>
					<p className="text-gray-600 max-w-md mx-auto">
						A modern way to manage and track your daily tasks with an intuitive
						interface
					</p>
				</motion.div>

				<TaskForm
					addTask={addTask}
					updateTask={updateTask}
					taskToEdit={taskToEdit}
					setTaskToEdit={setTaskToEdit}
				/>

				<FilterButtons filter={filter} setFilter={setFilter} />

				<TaskList
					tasks={tasks}
					deleteTask={deleteTask}
					setTaskToEdit={setTaskToEdit}
					toggleComplete={toggleComplete}
					filter={filter}
				/>
			</main>

			<footer className="py-8 text-center">
				<div className="text-gray-500 text-sm">
					<p>© {new Date().getFullYear()} Task Manager. Made with ❤️</p>
				</div>
			</footer>
		</div>
	);
}
