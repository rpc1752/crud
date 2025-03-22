import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { UserData } from "../../lib/validation";

export default function UserDetail() {
	const router = useRouter();
	const { id } = router.query;

	const [user, setUser] = useState<UserData & { _id: string }>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (id) {
			fetchUser();
		}
	}, [id]);

	const fetchUser = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/users/${id}`);

			if (!response.ok) {
				throw new Error("Failed to fetch user details");
			}

			const data = await response.json();
			setUser(data);
		} catch (err: any) {
			setError(err.message || "An error occurred while fetching user details");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
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

			router.push("/");
		} catch (err: any) {
			setError(err.message || "An error occurred while deleting the user");
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<p>Loading user details...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="bg-red-50 p-4 rounded-md">
					<p className="text-red-700">{error}</p>
				</div>
				<div className="mt-4">
					<Link href="/" className="text-indigo-600 hover:text-indigo-500">
						← Back to all users
					</Link>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p>User not found</p>
				<div className="mt-4">
					<Link href="/" className="text-indigo-600 hover:text-indigo-500">
						← Back to all users
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Head>
				<title>{user.user} | User Details</title>
			</Head>

			<div className="mb-6">
				<Link href="/" className="text-indigo-600 hover:text-indigo-500">
					← Back to all users
				</Link>
			</div>

			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6 flex justify-between items-center">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							User Details
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Personal information and interests
						</p>
					</div>
					<div className="flex space-x-2">
						<Link
							href={`/users/edit/${user._id}`}
							className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded"
						>
							Edit
						</Link>
						<button
							onClick={handleDelete}
							className="bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded"
						>
							Delete
						</button>
					</div>
				</div>

				<div className="border-t border-gray-200">
					<dl>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Name</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{user.user}
							</dd>
						</div>

						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Email</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{user.email}
							</dd>
						</div>

						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Age</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{user.age}
							</dd>
						</div>

						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Mobile</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{user.mobile}
							</dd>
						</div>

						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Interests</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								<div className="flex flex-wrap gap-2">
									{user.interest.map((interest, index) => (
										<span
											key={index}
											className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs"
										>
											{interest}
										</span>
									))}
								</div>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}
