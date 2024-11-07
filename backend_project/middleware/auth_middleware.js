import jwt from "jsonwebtoken";
import userModel from "../db/model.js";

var checkUserAuth = async(req, res, next)=>{
    let token;
    const {authorization} = req.headers;
    if (authorization && authorization.startsWith("Bearer")){
        try{
            token = authorization.split(" ")[1];
            const {UserID} = jwt.verify(token,process.env.SECRET_KEY);
            req.user = await userModel.findById(UserID).select("-password");
            // console.log(UserID);
            next();
        }
        catch(error){
            res.status(401).send({"error":error});
        }
    }    
};

export default checkUserAuth;
