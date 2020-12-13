import mongoose, { Document, Model, Schema as TypeSchema } from 'mongoose'
const Schema = mongoose.Schema

const userSchema: TypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      email: true,
      unique: true,
      required: true,
    },
    create_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { strict: true },
)

const UserSchema: Model<Document> = mongoose.model('User', userSchema)
export default UserSchema
