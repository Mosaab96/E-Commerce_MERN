import mongoose,{Schema, ObjectId, Document} from "mongoose";
import { IProduct as Iproduct } from "./productModel";

const CartstatusEnum=["active","completesd"]

export interface ICartItem extends Document {
    product:Iproduct;
    unitprice:number;
    quantity:number;
}
export interface ICart extends Document {
    userId:ObjectId | string;
    items: ICartItem[];
    totalAmount:number;
    status:"active" | "completesd";

}

const cartItemSchema:Schema = new Schema<ICartItem>({
    product:{type:Schema.Types.ObjectId,ref:'Product',required:true},
    quantity:{type:Number,required:true,default:1},
    unitprice:{type:Number,required:true}
}); 

const CartSchema:Schema= new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId,ref:'User',required:true},
    items:[cartItemSchema],
    totalAmount:{type:Number,required:true,default:0},
    status:{type:String,enum:CartstatusEnum,default:"active"}
});

export const CartModel=mongoose.model<ICart>('Cart',CartSchema);

