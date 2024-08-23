import {Schema, models, model, Document} from 'mongoose';

export interface IReview extends Document {
  title: string;
  description: string;
  rating: number;
  userId: Schema.Types.ObjectId;
  foodId: Schema.Types.ObjectId;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  rating: {type: Number, default: 0},
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  foodId: {type: Schema.Types.ObjectId, ref: 'Food', required: true},
  createdAt: {type: Date, default: Date.now()}
});

const Review = models.Review || model('Review', ReviewSchema);

export default Review;
