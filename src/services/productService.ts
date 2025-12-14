import ProductModel from "../models/productModel";


export const getAllProducts=async()=>{
    return await ProductModel.find();
}

export const seedInitiatialproducts=async()=>{
    const products=[
        {
            title:"Sample Product 1",imageUrl:"https://via.placeholder.com/150",price:19.99,stock:100},
        {
            title:"Sample Product 2",imageUrl:"https://via.placeholder.com/150",price:29.99,stock:50}, 
        {
            title:"Sample Product 3",imageUrl:"https://via.placeholder.com/150",price:9.99,stock:200}
    ];
    const existingProducts=await getAllProducts();
    if(existingProducts.length===0){
     await ProductModel.insertMany(products);
    }
}