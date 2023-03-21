const nodeMailer = require('../config/nodemailer'); //putting up node mailer



//this is another way of exporting a method(by default file is a module)
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs'); //ejs will automatically pick it up

    //need to send email //transporter defined in nodemailer //sendMail is predefined function which takes arguments
    nodeMailer.transporter.sendMail({
        from: 'ashishyadav5692@gmail.com',
        to: comment.user.email, //sending to a person who commented
        subject: "New Comment Published!",
        html: htmlString
    },(err,info) =>{ //callback in case of error //info contain information about the request that has been sent
        if(err){
            console.log('Error in sending the mail',err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}