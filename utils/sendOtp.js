import { nodeMailer } from "../config/nodeMailer.js";
import RandomString from "randomstring"
import { redisClient } from "../redis/redisClient.js";

export const sendOtpToUser = (email) => {
    const otp = RandomString.generate({
        length : 4,
        charset: ['numeric']
    })
    nodeMailer.sendMail({
            from: 'bil furniture', 
            to:email,
            subject: "bil furniture otp",
            html: `verify your account with the code <b>${otp}</b><br>the code expire after 5 menit`         
    })
 
    redisClient.setEx(email,5 * 60,otp)
}