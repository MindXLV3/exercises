import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'guest',
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;