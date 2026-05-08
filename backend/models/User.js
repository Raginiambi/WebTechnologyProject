import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    role: {
    type: String,
    default: 'user',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// const User = mongoose.model('User', userSchema);
// export default User;

export default mongoose.model(
  'User',
  userSchema
);