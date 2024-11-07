import mongoose from "mongoose";



// mongoose.connect('mongodb://127.0.0.1:27017/new').then(()=>{console.log("db connected")})

const mongoDb = async () => {


    mongoose.connect(process.env.MONGOURL);

    const db = mongoose.connection;


    db.on('connected', () => {
        console.log("db connected");
    })
    db.on('error', (error) => {
        console.log("error in connecting",error);
    })
    db.on('disconnected', () => {
        console.log("db disconnected");
    })

}
export default mongoDb;


