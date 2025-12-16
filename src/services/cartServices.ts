
import { CartModel } from '../models/cartModels';


interface GetActiveCartForUser {
    userId: string;
}

export const createCartForUser = async({ userId }: GetActiveCartForUser) => {
    // Implementation here
    let cart = await CartModel.create({userId,totalAmount:0});
    await cart.save();
    return cart;    
}

export const getActiveCartForUser = async({userId,}:GetActiveCartForUser) => {
    let cart = await CartModel.findOne({userId,status:"active"});
    if(!cart){
        cart = await createCartForUser({userId});
    }
    return cart;

}
