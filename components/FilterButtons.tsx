import React from 'react';
import { motion } from "framer-motion";

interface FilterButtonsProps {
  filter: string;
  setFilter: (filter: string) => void;
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1 }}
			className="flex justify-center mb-8"
		>
			<div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 flex">
				<FilterButton
					active={filter === "all"}
					onClick={() => setFilter("all")}
					label="All"
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 mr-1.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 10h16M4 14h16M4 18h16"
							/>
						</svg>
					}
				/>
				<FilterButton
					active={filter === "active"}
					onClick={() => setFilter("active")}
					label="Active"
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 mr-1.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
					}
				/>
				<FilterButton
					active={filter === "completed"}
					onClick={() => setFilter("completed")}
					label="Completed"
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 mr-1.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					}
				/>
			</div>
		</motion.div>
	);
};

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, label, icon }) => {
	return (
		<motion.button
			whileHover={{ scale: active ? 1 : 1.03 }}
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center ${
				active
					? "bg-primary-600 text-white shadow-md"
					: "text-gray-600 hover:bg-gray-100"
			}`}
		>
			{icon}
			{label}
		</motion.button>
	);
};

export default FilterButtons;