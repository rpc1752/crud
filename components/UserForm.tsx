import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserData } from "../lib/validation";

interface UserFormProps {
	initialData?: UserData;
	isEdit?: boolean;
}

export default function UserForm({
	initialData,
	isEdit = false,
}: UserFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState<UserData>({
		user: "",
		interest: [""],
		age: 0,
		mobile: 0,
		email: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [interestInput, setInterestInput] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.user || formData.user.length < 2) {
			newErrors.user = "Username is required and must be at least 2 characters";
		}

		if (!formData.interest || formData.interest.length === 0) {
			newErrors.interest = "At least one interest is required";
		}

		if (!formData.age || formData.age < 1 || formData.age > 120) {
			newErrors.age = "Age must be between 1 and 120";
		}

		if (!formData.mobile || !/^\d{10,15}$/.test(formData.mobile.toString())) {
			newErrors.mobile = "Mobile number must be between 10 and 15 digits";
		}

		if (
			!formData.email ||
			!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
		) {
			newErrors.email = "A valid email is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "age" || name === "mobile" ? Number(value) : value,
		}));
	};

	const handleAddInterest = () => {
		if (interestInput.trim()) {
			setFormData((prev) => ({
				...prev,
				interest: [...prev.interest.filter((i) => i), interestInput.trim()],
			}));
			setInterestInput("");
		}
	};

	const handleRemoveInterest = (index: number) => {
		setFormData((prev) => ({
			...prev,
			interest: prev.interest.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		setIsSubmitting(true);

		try {
			const url = isEdit ? `/api/users/${initialData?._id}` : "/api/users";
			const method = isEdit ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				router.push("/");
			} else {
				const data = await response.json();
				setErrors({ submit: data.error || "Failed to submit form" });
			}
		} catch (error) {
			setErrors({ submit: "An unexpected error occurred" });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Username
				</label>
				<input
					type="text"
					name="user"
					value={formData.user}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
				{errors.user && (
					<p className="mt-1 text-sm text-red-600">{errors.user}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Interests
				</label>
				<div className="flex mt-1">
					<input
						type="text"
						value={interestInput}
						onChange={(e) => setInterestInput(e.target.value)}
						className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
					<button
						type="button"
						onClick={handleAddInterest}
						className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Add
					</button>
				</div>
				{formData.interest.length > 0 && (
					<div className="mt-2 flex flex-wrap gap-2">
						{formData.interest.map(
							(item, index) =>
								item && (
									<div
										key={index}
										className="flex items-center bg-gray-100 px-2 py-1 rounded"
									>
										<span>{item}</span>
										<button
											type="button"
											onClick={() => handleRemoveInterest(index)}
											className="ml-1 text-red-500"
										>
											×
										</button>
									</div>
								)
						)}
					</div>
				)}
				{errors.interest && (
					<p className="mt-1 text-sm text-red-600">{errors.interest}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Age</label>
				<input
					type="number"
					name="age"
					value={formData.age || ""}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
				{errors.age && (
					<p className="mt-1 text-sm text-red-600">{errors.age}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Mobile
				</label>
				<input
					type="number"
					name="mobile"
					value={formData.mobile || ""}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
				{errors.mobile && (
					<p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
				{errors.email && (
					<p className="mt-1 text-sm text-red-600">{errors.email}</p>
				)}
			</div>

			{errors.submit && (
				<div className="bg-red-50 p-4 rounded-md">
					<p className="text-sm text-red-700">{errors.submit}</p>
				</div>
			)}

			<div className="flex justify-end">
				<button
					type="button"
					onClick={() => router.push("/")}
					className="mr-2 bg-gray-200 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{isSubmitting ? "Saving..." : isEdit ? "Update" : "Create"}
				</button>
			</div>
		</form>
	);
}
