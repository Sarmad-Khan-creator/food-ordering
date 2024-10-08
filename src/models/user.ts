import { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  role: string;
  email: string;
  name: string;
  username: string;
  image: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  phoneNumber: string;
  cart: Schema.Types.ObjectId[];
  wishlist: Schema.Types.ObjectId[];
  orders: Schema.Types.ObjectId[];
  reviews: Schema.Types.ObjectId[];
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN', 'OWNER'], default: 'USER' },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  username: { type: String, unique: true },
  image: String,
  address: {
    addressLine1: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  phoneNumber: String,
  cart: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

const User = models.User || model('User', UserSchema);

export default User;
