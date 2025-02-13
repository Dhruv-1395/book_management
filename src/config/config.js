export const config = {
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    jwtSecret: process.env.ACCESS_TOKEN_SECRET,
    jwtExpiresIn:process.env.ACCESS_TOKEN_EXPIRED,
    mailHost:process.env.MAIL_HOST,
    mailUsername:process.env.MAIL_USER,
    mailPassword:process.env.MAIL_PASS,
    mailport: process.env.MAIL_PORT,
    smtpsecure: process.env.MAIL_SMTP_SECURE,
    api_url:process.env.API_URL,
    app_url:process.env.APP_URL
}