import Head from "next/head";
import UserForm from "../../components/UserForm";

export default function NewUser() {
	return (
		<div className="container mx-auto px-4 py-8">
			<Head>
				<title>Add New User</title>
			</Head>

			<h1 className="text-3xl font-bold mb-6">Add New User</h1>

			<UserForm />
		</div>
	);
}
