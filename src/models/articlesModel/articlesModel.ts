import mongoose, { Document, Model, Schema } from 'mongoose'

const articleSchema: mongoose.Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'La longitud del nombre del producto debe ser mayor a 3'],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [
      10,
      'La description del producto debe tener una longitud mayor a 10',
    ],
  },
  category: {
    type: String,
    required: true,
  },
  creator_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  create_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const ArticleSchema: Model<Document> = mongoose.model(
  'Article',
  articleSchema,
  'articles',
)
export default ArticleSchema
