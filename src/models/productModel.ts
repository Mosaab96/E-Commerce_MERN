import mongoose,{Schema,Document} from "mongoose";

export interface IProduct extends Document {
    title: string;
    imageUrl: string;
    price: number;
    stock: number;
}

const ProductSchema:Schema= new Schema<IProduct>({
    title:{type:String,required:true},
    imageUrl:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true,default:0}
});

const ProductModel=mongoose.model<IProduct>('Product',ProductSchema);

export default ProductModel;