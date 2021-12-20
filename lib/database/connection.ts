import { connect } from "mongoose";

/**
 * A simple function to connect to mongodb drivers.
 * @param url
 */
export const mongodb_connect_function = async (url: string) => {
  await connect(url, {
    bufferCommands: true,
    autoIndex: true,
    autoCreate: false,
    connectTimeoutMS: 15000,
  }).catch((err) => console.error(err));
};
