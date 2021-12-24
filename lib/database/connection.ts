import { connect } from "mongoose";

/**
 * @internal
 * A function to connect to mongodb.
 * @param {string} url mongodb connection url
 */
export const mongodb_connect_function = (url: string) => {
  connect(url, {
    bufferCommands: true,
    autoIndex: true,
    autoCreate: false,
    connectTimeoutMS: 15000,
  }).catch((err) => console.error(err));
};
