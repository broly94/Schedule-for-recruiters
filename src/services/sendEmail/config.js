import nodemailer from 'nodemailer'

export const configNodeMailer = () => {
    try {
        return transporter = nodemailer.createTransport({
            pool: true,
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use TLS
            auth: {
                user: "leonel.carro94@gmail.com",
                pass: "itqzhgwxgdxlrxup",
            },
        });
    } catch (e) {
        console.log(e.message)
    }
}