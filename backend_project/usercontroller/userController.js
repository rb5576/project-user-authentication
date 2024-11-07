import userModel from "./../db/model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from "../emailConfig/emailConfig.js";

class userController {
    static userRegistration = async (req, res) => {
        const { name, email, password, confirm_password, tc } = req.body
        const user = await userModel.findOne({ email })
        // var user = false
        if (user) {
            res.send({ "message": "failed", "message": "User already exist" });
        }
        else {
            if (name && email && password && confirm_password && tc) {
                if (password === confirm_password) {

                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(password, salt)
                        const doc = new userModel({
                            name,
                            email,
                            password: hashedPassword,
                            tc
                        });
                        await doc.save();
                        res.status(201).send({ "status": "success", "message": "User Registered successfully" });
                    }
                    catch (err) { }

                }
                else {
                    res.send({ "status": "failed", "message": "Password and confirm password do not match" });
                }
            }
            else {
                res.send({ "status": "failed", "message": "All fields are required" });
            }
        }


    };

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await userModel.findOne({ email })
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if (isMatch && (user.email === email)) {
                        const token = jwt.sign({ UserID: user._id }, process.env.SECRET_KEY, {
                            expiresIn: '5d'
                        })
                        res.status(200).send({ "status": "success", "message": "Login success", "token": token });
                    }
                    else {
                        res.send({ "message": "failed", "message": "Incorrect Password" });
                    }
                }
                else {
                    res.send({ "message": "failed", "message": "User does not exist" });
                }

            }
            else {
                res.send({ "message": "failed", "message": "All fields are required" });
            }
        }
        catch (err) {
            res.status(500).send({ "message": "Internal Server Error" });
        }
    };

    static reset_pass_email = async (req, res) => {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
    
        if (user) {
            const token = jwt.sign({ UserID: user._id }, process.env.SECRET_KEY, {
                expiresIn: "2m",
              });
              const link = `http://localhost:3000/${user._id}/${token}`;
          try {
            const info = async () => {
            //   console.log("object");
              await transporter.sendMail({
                from: "abc123@gmail.com",
                to: user.email,
                subject: "Reset Password",
                html: `<a href=${link}>Click here to reset the password</a>`,
              });
            };
            info();
            return res.send("email sent");
          } catch (error) {
            console.log("hello");
            res.json({ status: "failed", message: error.message });
          }
        } else {
          res.json({ status: "failed", message: "email not found" });
        }
    };

    static userLogged = async (req, res) => {
        res.send({"message":"welcome to my profile"});
    };

    static changePassword = async (req, res) => {
        // console.log(req.ip);
        const {password, confirm_password} = req.body;
        if(password && confirm_password){
            if(password === confirm_password){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt);
                console.log(req.user);
                const user = await userModel.findByIdAndUpdate(req.user._id,{password:hashedPassword});
                if(user){
                    res.json({"status":"success" , "message":"password changed successfully"});
                }else{
                    res.json({"status":"failed" , "message":"something went wrong"});
                }
            } else{
                res.json({"status":"failed" , "message":"password & confirm_password don't match"});
            }
        }
        else{
            res.json({"status":"failed" , "message":"All fields are required"});
        }
    };

    // static userRegistration = async(req,res)=>{

    // };

};




export default userController;








