import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    twitterId: {
        type: String,
        unique: true, // Ensure no duplicates
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);
export default User;
