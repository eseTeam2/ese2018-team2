import { checkAPIKey, client } from "../index";
import SparkPost from "sparkpost";
import config from "@unijobs/backend-modules-config";

export const sendEmail = async (recipient: string) => {
  try {
    const client = new SparkPost(config.get("sparkpost_api_key"));
    if (checkAPIKey) {
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
    }
    return true;
  } catch (e) {
    console.log(
      "-------------------------------------------------------" +
        "           WARNING! SparkPost API Key not set          " +
        "-------------------------------------------------------"
    );
    return false;
  }
};
