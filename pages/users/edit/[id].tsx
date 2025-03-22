import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import UserForm from "../../../components/UserForm";
import { UserData } from "../../../lib/validation";

export default function EditUser() {
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
				<title>Edit User | {user.user}</title>
			</Head>

			<div className="mb-6">
				<Link
					href={`/users/${id}`}
					className="text-indigo-600 hover:text-indigo-500"
				>
					← Back to user details
				</Link>
			</div>

			<h1 className="text-3xl font-bold mb-6">Edit User</h1>

			<UserForm initialData={user} isEdit={true} />
		</div>
	);
}
