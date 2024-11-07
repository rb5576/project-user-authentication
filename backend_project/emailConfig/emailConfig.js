import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();
const transporter = nodemailer.createTransport(
    {
        host:"smtp.gmail.com",
        service: "Gmail",
        port: 465,
        secure: true,
        auth:{
            user: "abc123@gmail.com", // sender-email or admin-email or backend-email
            pass: process.env.PASS_EMAIL
        }
    }
);
export default transporter;