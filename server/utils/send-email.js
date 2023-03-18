const nodeMailer = require("nodemailer");
const config = require("../../config/config")
const transporter = nodeMailer.createTransport(config.SMPT)

const sendEmail = async function (reqObj){
    let responseObject = {};
    let mailOptions = {
        from: "Ecommerce Admin <noreply@ecommercemail.com>",
        to: reqObj.email,
        subject: reqObj.subject,
        text: reqObj.message
    }

    try {
        await transporter.sendMail(mailOptions);
        responseObject.status = true;
    }catch (error) {            
        responseObject.status = false;
        logger.error(data, "node mailer fail in node-mailer.js for request in node for data"); 
    }
    return responseObject

}

module.exports = sendEmail;