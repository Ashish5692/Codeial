const queue = require('../config/kue'); //created a queue

//importing comments mailer which is inside mailer folder
const commentsMailer = require('../mailers/comments_mailer');

//process function calls the mailer //job is what it needs to do
queue.process('emails',function(job,done){
    console.log('emails worker is processing a job',job.data);  //job.data holds the data we sent (here the comment)

    commentsMailer.newComment(job.data);

    done();
})