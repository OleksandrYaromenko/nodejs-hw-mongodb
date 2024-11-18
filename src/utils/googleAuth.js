import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv"
import createHttpError from "http-errors";
dotenv.config();

const googleOauthClient = new OAuth2Client({
clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
clientSecret: process.env.GOOGLE_QAUTH_CLIENT_SECRET,
redirectUri: process.env.GOOGLE_QAUTH_REDIRECT_URL,
});


 export function generateOauthURL(){
    return googleOauthClient.generateAuthUrl({
        scope:[
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ]
})
}

export async function validateCode(code){
    try {
        const res = await googleOauthClient.getToken(code)
        return googleOauthClient.verifyIdToken({
            idToken: res.tokens.id_token
        })
    } catch (error) {
        if(error.response && error.response.status >= 400 && error.response.status < 500){
        throw createHttpError (401,"Unauthorized")
    }
    }
}