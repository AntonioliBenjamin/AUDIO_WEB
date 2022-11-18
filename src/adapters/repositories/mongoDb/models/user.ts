import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    id: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    connectMethod: {
      type: String,
    },
    password: {
      type: String,
    },
    profilePicture: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    confirmedAt: {
        type: Date,
    },
  })
  
  export const UserModel = model('User', userSchema) 