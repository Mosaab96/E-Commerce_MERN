import express from "express";
import { getActiveCartForUser } from "../services/cartServices";
import valodateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/",valodateJWT, async (req, res) => {
  //const userId=req.user._id;

    const cart=await getActiveCartForUser({userId:"xxxx"});
    res.status(200).send(cart);
},);



export default router;