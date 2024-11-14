import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    email: string;

}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});


const Users = model<IUser>('Users', userSchema);

export default Users;