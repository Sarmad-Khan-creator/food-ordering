import { Schema, model, models, Document } from 'mongoose';

export interface IOrder extends Document {
  foods: Schema.Types.ObjectId[];
  user: Schema.Types.ObjectId;
  status: string;
}

const OrderSchema = new Schema<IOrder>({
  foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending' },
});

const Order = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
