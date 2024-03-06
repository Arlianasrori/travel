import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK
);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];
export const GoogleUrl = oauth2Client.generateAuthUrl({
    access_type : "offline",
    scope : scopes,
    include_granted_scopes : true
});