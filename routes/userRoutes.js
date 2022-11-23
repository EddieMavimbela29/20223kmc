const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//HOMEPAGE
router.get('/', async(req, res) => {
    res.render('default/home');

});
//HOMEPAGE
router.get('/notice-board', async(req, res) => {
    res.render('default/notice-board');

});

//ABOUT
router.get('/about-us', (req, res) => {
    res.render('default/about')
});
//SERVICES
router.get('/services', (req, res) => {
    res.render('default/services')
});
router.get('/xray-services', (req, res) => {
    res.render('default/xray-services')
});
router.get('/women-men-health-services', (req, res) => {
    res.render('default/women-men-health-services')
});
router.get('/infectious-vaccination-services', (req, res) => {
    res.render('default/vaccination-services')
});
router.get('/primary-care-services', (req, res) => {
    res.render('default/primary-services')
});
router.get('/maternity-services', (req, res) => {
    res.render('default/maternity-services')
});
router.get('/hiv-aids-services', (req, res) => {
    res.render('default/hiv-services')
});
router.get('/drug-rehab-services', (req, res) => {
    res.render('default/drug-rehab-services')
});
router.get('/male-circumcision-services', (req, res) => {
    res.render('default/circumcision-services')
});
router.get('/asthma-services', (req, res) => {
    res.render('default/asthma-services')
});

//APPOINTMENT
router.get('/appointment', (req, res) => {
    res.render('default/appointment')
});

router.post('/appointment', (req, res) => {

    const auth = {
        auth: {
            api_key: process.env.API_KEY,
            domain: process.env.DOMAIN
        }
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

    let { lastName, phone, dept, specialRequest, name, email, appointDate } = req.body;

    const msg = {
        to: 'mkholowthandow@gmail.com',
        from: email,
        subject: `Patient sends an Appointment from website: ${name}`,
        text: specialRequest,
        html: `
            <h1>Hi there, this email is from, ${name} ${lastName}</h1>
            <p> Phone Number: ${phone}</p>
            <p> Appointment Date: ${appointDate}</p>
            <p> Department: ${dept}</p>
            <p> Special Request: ${specialRequest}</p>
            `,
    };
    transporter.sendMail(msg, function(err, data) {
        if (err) {
            console.log(err);
            return req.flash('error', 'Internal Error');
        }
        console.log(data);
        req.flash('success', 'Appointment sent successfully. We will get back to you shortly.');
        res.redirect('/')
    });

})

//CONTACT
router.get('/contact', (req, res) => {
    res.render('default/contact')
});

router.post('/contact', (req, res) => {
    const auth = {
        auth: {
            api_key: process.env.API_KEY || 'MAIL_GUN_API_KEY',
            domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN'
        }
    };
    const transporter = nodemailer.createTransport(mailGun(auth));


    let { name, subject, phone, email, message } = req.body;

    const msg = {
        to: 'mkholowthandow@gmail.com',
        from: email,
        subject: `Patient contact from website: ${subject}`,
        text: message,
        html: `
            <h1>Hi there, this email is from, ${name}</h1>
            <p> Phone Number: ${phone}</p>
            <p>${message}</p>
            `,
    };
    transporter.sendMail(msg, function(err, data) {
        if (err) {
            console.log(err);
            return req.flash('error', 'Internal Error');
        }
        console.log(data);
        req.flash('success', 'Contact sent successfully. We will get back to you shortly.');
        res.redirect('/')
    });

});

//REHAB
router.get('/rehab', (req, res) => {
    res.render('default/rehab')
});
router.post('/rehab', (req, res) => {

    const auth = {
        auth: {
            api_key: process.env.API_KEY || 'MAIL_GUN_API_KEY',
            domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN'
        }
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

    let { lastName, nextOfKeenName, nextOfKeenPhone, addictionType, phone, specialRequest, name, email } = req.body;

    const msg = {
        to: 'mkholowthandow@gmail.com',
        from: email,
        subject: `Patient needs help with Drug Addiction ${name}`,
        text: specialRequest,
        html: `
            <h1>Hi there, this email is from, ${name} ${lastName}</h1>
            <p> Addict Name: ${name} ${ lastName}</p>
            <p> Addiction Type: ${addictionType}</p>
            <p> Email Address: ${phone}</p>
            <p> Phone Number: ${phone}</p>
            <p> Next Of Keen Name: ${nextOfKeenName}</p>
            <p> Next Of Keen Phone Number: ${nextOfKeenPhone}</p>
            <p> Phone Number: ${phone}</p>
            <p> Special Request: ${specialRequest}</p>
            `,
    };

    transporter.sendMail(msg, function(err, data) {
        if (err) {
            console.log(err);
            return req.flash('error', 'Internal Error');
        }
        console.log(data);
        req.flash('success', 'Rehab Application sent successfully. We will get back to you shortly.');
        res.redirect('/')
    });
});


//GALLERY
router.get('/gallery', (req, res) => {
    res.render('default/gallery')
});

router.get('/blog', (req, res) => {
    res.render('default/blog')
});

//PRESS
router.get('/press', (req, res) => {
    res.render('default/press')
});

module.exports = router;