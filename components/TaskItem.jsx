import { motion } from "framer-motion";

const TaskItem = ({ task, deleteTask, setTaskToEdit, toggleComplete }) => {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.3 }}
			className={`card p-5 mb-4 ${
				task.completed
					? "border-l-4 border-secondary-500 bg-gradient-to-r from-secondary-50 to-white"
					: "border-l-4 border-primary-500"
			} hover:shadow-lg transition-all duration-300`}
		>
			<div className="flex justify-between items-start">
				<div className="flex-1">
					<div className="flex items-center">
						<div className="relative">
							<motion.input
								whileTap={{ scale: 1.2 }}
								type="checkbox"
								checked={task.completed}
								onChange={() => toggleComplete(task.id)}
								className="h-5 w-5 rounded border-gray-300 accent-secondary-500 cursor-pointer"
							/>
							{task.completed && (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									className="absolute -top-2 -right-2"
								>
									<span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-[10px] text-white">
										✓
									</span>
								</motion.div>
							)}
						</div>
						<h3
							className={`ml-3 text-lg font-medium ${
								task.completed ? "line-through text-gray-500" : "text-gray-800"
							}`}
						>
							{task.title}
						</h3>

						{task.completed && (
							<motion.span
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-800"
							>
								Completed
							</motion.span>
						)}
					</div>

					{task.description && (
						<p
							className={`mt-2 text-gray-600 pl-8 ${
								task.completed ? "line-through text-gray-400" : ""
							}`}
						>
							{task.description}
						</p>
					)}

					<div className="flex mt-3 pl-8 text-xs text-gray-500 items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-3.5 w-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>
							{new Date(task.createdAt).toLocaleString(undefined, {
								month: "short",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
					</div>
				</div>

				<div className="flex space-x-1">
					<motion.button
						whileHover={{ scale: 1.1, y: -2 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setTaskToEdit(task)}
						className={`p-2 rounded-xl text-primary-600 hover:bg-primary-50 transition-colors ${
							task.completed ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={task.completed}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.1, y: -2 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => deleteTask(task.id)}
						className="p-2 rounded-xl text-danger-600 hover:bg-danger-50 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default TaskItem;
