import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { UserData } from "../lib/validation";

export default function Home() {
	const [users, setUsers] = useState<(UserData & { _id: string })[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/users");

			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}

			const data = await response.json();
			setUsers(data);
		} catch (err: any) {
			setError(err.message || "An error occurred while fetching users");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this user?")) {
			return;
		}

		try {
			const response = await fetch(`/api/users/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete user");
			}

			// Refresh the user list
			fetchUsers();
		} catch (err: any) {
			setError(err.message || "An error occurred while deleting the user");
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<Head>
				<title>User Management System</title>
				<meta
					name="description"
					content="CRUD application for user management"
				/>
			</Head>

			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Users</h1>
				<Link
					href="/users/new"
					className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
				>
					Add New User
				</Link>
			</div>

			{error && (
				<div className="bg-red-50 p-4 rounded-md mb-6">
					<p className="text-red-700">{error}</p>
				</div>
			)}

			{loading ? (
				<div className="text-center">
					<p>Loading users...</p>
				</div>
			) : users.length === 0 ? (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<p className="text-gray-500">
						No users found. Add a new user to get started.
					</p>
				</div>
			) : (
				<div className="bg-white shadow overflow-hidden sm:rounded-md">
					<ul className="divide-y divide-gray-200">
						{users.map((user) => (
							<li key={user._id}>
								<div className="px-6 py-4 flex items-center">
									<div className="flex-1 min-w-0">
										<Link
											href={`/users/${user._id}`}
											className="block hover:text-indigo-600"
										>
											<p className="text-lg font-medium text-gray-900 truncate">
												{user.user}
											</p>
											<p className="text-sm text-gray-500">{user.email}</p>
										</Link>
									</div>
									<div className="flex-shrink-0 flex space-x-2">
										<Link
											href={`/users/edit/${user._id}`}
											className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded text-sm"
										>
											Edit
										</Link>
										<button
											onClick={() => handleDelete(user._id)}
											className="bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded text-sm"
										>
											Delete
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
