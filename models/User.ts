import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: [true, "Username is required"],
			trim: true,
			minlength: [2, "Username must be at least 2 characters long"],
		},
		interest: {
			type: [String],
			validate: {
				validator: function (v: string[]) {
					return v && v.length > 0;
				},
				message: "At least one interest must be provided",
			},
		},
		age: {
			type: Number,
			required: [true, "Age is required"],
			min: [1, "Age must be at least 1"],
			max: [120, "Age must be less than 120"],
		},
		mobile: {
			type: Number,
			required: [true, "Mobile number is required"],
			validate: {
				validator: function (v: number) {
					return /^\d{10,15}$/.test(v.toString());
				},
				message: "Mobile number must be between 10 and 15 digits",
			},
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			lowercase: true,
			validate: {
				validator: function (v: string) {
					return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
				},
				message: "Please enter a valid email address",
			},
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
