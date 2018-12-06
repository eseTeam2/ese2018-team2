import { sendEmail } from "./src/sendEmail";
import SparkPost from "sparkpost";
import config from "@unijobs/backend-modules-config";

export const client = new SparkPost(config.get("sparkpost_api_key"));

export { sendEmail };
