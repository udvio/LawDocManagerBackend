import {Schema} from 'mongoose';

export const UserSchema = new Schema(
    {
        username: {type: String, required:true, lowercase:true},
        password: {type: String, required:true}
    },
    {autoIndex: true, timestamps: true}
)