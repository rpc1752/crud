import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/db";
import User from "../../../models/User";
import { userSchema } from "../../../lib/validation";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectDB();

	// GET all users
	if (req.method === "GET") {
		try {
			const users = await User.find({});
			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ error: "Server error" });
		}
	}

	// POST create a new user
	if (req.method === "POST") {
		try {
			// Validate request body with Yup
			await userSchema.validate(req.body);

			// Check if email already exists
			const existingUser = await User.findOne({ email: req.body.email });
			if (existingUser) {
				return res.status(400).json({ error: "Email already registered" });
			}

			const user = await User.create(req.body);
			return res.status(201).json(user);
		} catch (error: any) {
			if (error.name === "ValidationError") {
				return res.status(400).json({ error: error.message });
			}
			return res.status(500).json({ error: "Server error" });
		}
	}

	// Method not allowed
	return res.status(405).json({ error: "Method not allowed" });
}
