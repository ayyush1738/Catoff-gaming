import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        twitterId: String,
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: true
        }
    }
)

const User = mongoose.model("User", userSchema);
export default User;
