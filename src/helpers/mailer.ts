
import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';



export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {$set:{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {$set:{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}})
        }

        console.log(process.env.MAILTRAP_USERNAME)
        console.log(process.env.MAILTRAP_PASSWORD)
        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 587,
          auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
          }
        });
        



        const mailOptions = {
            from: 'surajsanu@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions , (error: any, info: { response: string; }) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        return mailresponse;
  

    } catch (error:any) {
        throw new Error(error.message);
    }
}
