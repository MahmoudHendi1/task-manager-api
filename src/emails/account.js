const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail=(mail,name)=>{
    sgMail.send({
        to:mail,
        from : 'mahmoudhendi11@gmail.com',
        subject:'Welcome to the app',
        text : `Welcome to the app, ${name}. Let me know how you get along with the app.`
    }).then(()=>{
        console.log('email sent')
    }).catch((e)=>{
        console.log(e)
    })
}

const sendCancelationEmail=(mail,name)=>{
    sgMail.send({
        to:mail,
        from : 'mahmoudhendi11@gmail.com',
        subject:'Sorry to see you go',
        text : `Goodbay, ${name}. is there anything we could help you with ?`
    }).then(()=>{
        console.log('email sent')
    }).catch((e)=>{
        console.log(e)
    })
}


module.exports={
    sendWelcomeEmail,
    sendCancelationEmail
}


