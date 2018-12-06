import { client } from "../index";

export const sendEmail = async (recipient: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: "testing@sparkpostbox.com",
      subject: "Confirm Email",
      html: `
            <html>
                <body>
                    <p>Testing SparkPost - the world's most awesome email service!</p>
                    <a href="https://www.unijobs.me">confirm email</a>
                </body>
            </html>
            `
    },
    recipients: [{ address: recipient }]
  });
  console.log(response);
};
