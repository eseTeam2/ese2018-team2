import config from "@unijobs/backend-modules-config";

export const sendEmail = async (recipient: string) => {

    if (config.get("mailgun_api_key").length > 0) {
        const API_KEY = config.get("mailgun_api_key");
        const DOMAIN = 'mail.unijobs.me';
        const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

        const data = {
            from: 'noreply@unijobs.me',
            to: recipient,
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!'
        };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });

        return true;
    } else {
        console.log(
            "-------------------------------------------------------\n" +
            "           WARNING! SparkPost API Key not set          \n" +
            "-------------------------------------------------------\n"
        );
        return false;
    }
};
