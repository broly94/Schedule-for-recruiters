import { transporter } from './config.js'

export const sendEmail = async (email) => {

    try {
        await transporter.sendMail({
            from: '"<leonel.carro94@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Create Password", // Subject line
            html: `
            <b>Validate Account</b>
            <a href="http://localhost:4000/api/recruiter/validate-account" target="_blank"></a>
            `, // html body
        });
    } catch (e) {
        console.log(e.message)
    }

}