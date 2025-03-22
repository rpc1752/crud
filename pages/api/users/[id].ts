import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/db";
import User from "../../../models/User";
import { userSchema } from "../../../lib/validation";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;

	await connectDB();

	// GET a single user
	if (req.method === "GET") {
		try {
			const user = await User.findById(id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({ error: "Server error" });
		}
	}

	// PUT update a user
	if (req.method === "PUT") {
		try {
			// Validate request body with Yup
			await userSchema.validate(req.body);

			// Check if email already exists (but not for this user)
			const existingUser = await User.findOne({
				email: req.body.email,
				_id: { $ne: id },
			});

			if (existingUser) {
				return res.status(400).json({ error: "Email already registered" });
			}

			const user = await User.findByIdAndUpdate(id, req.body, {
				new: true,
				runValidators: true,
			});

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			return res.status(200).json(user);
		} catch (error: any) {
			if (error.name === "ValidationError") {
				return res.status(400).json({ error: error.message });
			}
			return res.status(500).json({ error: "Server error" });
		}
	}

	// DELETE a user
	if (req.method === "DELETE") {
		try {
			const user = await User.findByIdAndDelete(id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.status(200).json({ message: "User deleted successfully" });
		} catch (error) {
			return res.status(500).json({ error: "Server error" });
		}
	}

	// Method not allowed
	return res.status(405).json({ error: "Method not allowed" });
}
