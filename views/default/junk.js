router.post('/contact', (req, res) => {

    // email, subject, text
    let { email, subject, text } = req.body;
    email = req.sanitize(email);
    subject = req.sanitize(subject);
    text = req.sanitize(text);


    const auth = {
        auth: {
            api_key: process.env.API_KEY || 'MAIL_GUN_API_KEY',
            domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN'
        }
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

    const mailOptions = {
        from: email,
        to: 'jgmavuso@mweb.co.za',
        subject: subject,
        text: text,
        html: `
        <p>${text}</p>
        `
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log(err);
            return req.flash('error', 'Internal Error');
        }
        console.log(data);
        req.flash('success', 'Email sent admin!!!!!');
        res.redirect('/contact')
    });

});