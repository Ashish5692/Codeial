const fs = require('fs'); //since we will be writing to file system import fs
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');     //it define where the log will be stored

//finding if production log is already there or it should be created
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = rfs('access.log',{
//     interval : '1d',
//     path: logDirectory
// });
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

//setting up development environment
const development = {
    //most of the file you change will be found here
    name : 'development',
    //need to access different files
    asset_path: '/assets',
    session_cookie_key : 'blahsomething',
    db: 'codeial_dev123',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,  //not using 2 factor authentication
        auth: {
            user: 'somdutt9968@gmail.com',
            pass: 'nqwtqvvlewwxurmw'
        }                //establish indentity so that gmail tracks your activity
    },
    google_client_id: "64326076452-vbidgec3oijabc2daoa9v9oq6se6phfs.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name : 'production',
    //need to access different files
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIALSESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,  //not using 2 factor authentication
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }                //establish indentity so that gmail tracks your activity
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}
//console.log('this is the asset path', process.env.CODEIAL_ASSET_PATH);

module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);