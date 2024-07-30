import { Schema, models, model, Document } from 'mongoose';

export interface IFood extends Document {
  name: string;
  price: number;
  discountPercent: number;
  quantity: number;
  category: string;
  images: string[];
  rating: number;
  reviews: Schema.Types.ObjectId[];
  featured: boolean;
  createdAt: Date;
}

const FoodSchema = new Schema<IFood>({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true,
  },
  price: { type: Number, required: [true, 'The price is required'] },
  discountPercent: Number,
  quantity: { type: Number, required: [true, 'The quantity is required'] },
  category: {
    type: String,
    required: [true, 'The category is required'],
    enum: ['Burger', 'Schwarma', 'Pizza'],
  },
  images: [String],
  rating: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Food = models.Food || model('Food', FoodSchema);

export default Food;
