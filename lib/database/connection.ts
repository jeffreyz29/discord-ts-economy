import {
  CallbackError,
  CallbackWithoutResult,
  connect,
  ConnectOptions,
} from "mongoose";

/**
 * @internal
 * A function to connect to mongodb.
 */
export const mongodb_connect_function = (url: string) => {
  connect(url, {
    bufferCommands: true,
    autoIndex: true,
    autoCreate: false,
    connectTimeoutMS: 15000,
  });
};

/**
 * A more flexible mongodb connect function if you wish to use it.
 * @param url
 * @param options
 * @param callback
 */
export const mongodb_connect_function_self = (
  url: string,
  options?: ConnectOptions,
  callback?: CallbackWithoutResult
) => {
  return connect(
    url,
    <ConnectOptions>options,
    <(error: CallbackError) => void>callback
  );
};
