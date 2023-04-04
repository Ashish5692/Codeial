const nodemailer = require('nodemailer');//import nodemailer
const ejs = require('ejs');
const path = require('path');
const env = require('./environment')

//defining an object and we will attach it to nodemailer
let transporter =  nodemailer.createTransport(env.smtp);

//using template rendering engine
let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath), // relative path is from where this function is called
        data,  //context we pass to ejs,name to be filled inside template
        function(err,template){   //template composed of path.join and data
            if(err){
                console.log('error in rendering template',err);
                return;
            }
            mailHTML = template;
        }
    )

    return mailHTML;
}

//we will export 2 keys
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}