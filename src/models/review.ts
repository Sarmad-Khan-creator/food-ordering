import { Schema, models, model, Document } from 'mongoose';

export interface IReview extends Document {
  title: string;
  description: string;
  rating: number;
  userId: Schema.Types.ObjectId;
  foodId: Schema.Types.ObjectId;
}

const ReviewSchema = new Schema<IReview>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  foodId: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
});

const Review = models.Review || model('Review', ReviewSchema);

export default Review;
