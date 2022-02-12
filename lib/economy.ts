import {
  mongodb_connect_function,
  mongodb_connect_function_self,
} from "./database/connection";
import { ErrorMessage } from "./util/functions";
import type { EconomyConfigOptions } from "./typings/typings";
import type { CallbackWithoutResult, ConnectOptions } from "mongoose";
import { Logger } from "./util/logger";
/**
 * The Lewd Labs Economy for discord bots with mongodb
 */
export class IEconomy {
  /** Our constructor config options */
  public config!: EconomyConfigOptions;
  // /** Controls fetch methods four our economy */
  /**
   * Constructor
   * @param configOptions The options to pass to the constructor. These are required.
   */
  public constructor(configOptions?: EconomyConfigOptions) {
    if (configOptions !== undefined) {
      let missing: string[] = [];
      if (!configOptions.currency) missing.push("currency");
      if (!configOptions.defaultBankLimit) missing.push("defaultBankLimit");
      if (!configOptions.robEnabled) missing.push("robEnabled");
      if (!configOptions.shopEnabled) missing.push("shopEnabled");
      // Checks if the array has at least one value
      if (missing[1]) {
        throw new Error(
          ErrorMessage(
            `You did not pass all the required options for the LewdLabs Economy Class.\n You are missing: ${missing.join(
              ", "
            )}`
          )
        );
      } else {
        this.config = configOptions;
      }
    } else {
      this.config = {
        currency: "$",
        defaultBankLimit: 20000,
        shopEnabled: false,
        robEnabled: true,
        debug: false,
      };
      if (this.config.debug) {
        Logger.log(
          `[Economy:configOptions] Config: ${JSON.stringify(this.config)}`
        );
      }
    }
  }

  /**
   * A simple function to connecto mongodb.
   * This is not required to use, but if you do this must be called before other parts of the database or else functions will not work.
   * @param url Your mongodb URL
   * @see https://www.mongodb.com/ for support with setting up your database.
   */
  public connect(url: string): void {
    if (!url && this.config.mongodbURL === undefined) {
      throw new Error(
        ErrorMessage(
          "Invalid mongodb connect function. You need to pass a mongodb url to the setup class or in this method."
        )
      );
    } else if (url && this.config.mongodbURL === undefined) {
      if (this.config.debug) {
        Logger.log(`[Economy:correct] Connecting to mongodb at ${url}`);
      }
      mongodb_connect_function(url);
    } else if (!url && this.config.mongodbURL !== undefined) {
      if (this.config.debug) {
        Logger.log(
          `[Economy:correct] Connecting to mongodb at ${this.config.mongodbURL}`
        );
      }
      mongodb_connect_function(url);
    }
  }

  /**
   * A custom connect function that gives you more control over the mongodb connect settings.
   * You must pass in all the settings and nothing here is filled out for you.
   * @param url
   * @param options
   * @param callback
   */
  public self_connect(
    url: string,
    options?: ConnectOptions,
    callback?: CallbackWithoutResult
  ): void {
    if (!url) {
      throw new Error(
        ErrorMessage(
          "Invalid mongodb connect function. You need to pass a mongodb url to the setup class or in this method."
        )
      );
    }
    if (this.config.debug) {
      Logger.log(`[Economy:self_connect] Connecting to mongodb at ${url}`);
    }
    mongodb_connect_function_self(url, options, callback);
  }
}
