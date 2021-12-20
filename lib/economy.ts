import { mongodb_connect_function } from "./database/connection";
import { ErrorMessage } from "./util/functions";
import { EconomyConfigOptions } from "./util/typings";
import { DataBaseController } from "./database/controller";

/**
 * The Lewd Labs Economy for discord bots with mongodb
 */
export class Economy {
  /** Our constructor config options */
  public config: EconomyConfigOptions;
  /** Allows the raw db function to be accessed throughout the Economy for more user customization. */
  public db: DataBaseController = new DataBaseController();
  public constructor(configOptions: EconomyConfigOptions) {
    if (!configOptions) {
      throw new Error(
        ErrorMessage("You did not pass any options the Economy Class.")
      );
    }
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
    } else this.config = configOptions;
  }

  /**
   * The Raw user object fetched from our cache or db.
   * This function is internal and not used by you the user.
   * @param target 
   * @returns 
   */
  //@ts-ignore
  private async getRawUser(target: string) {
    // we call the cache
    let userData = this.db.get(target, "Economy", null);
    // if no cache is found for this user, we will search the db itself.
    if (!userData) {
      // Before creating the new data we will search for a document one last time.
      // sometimes a user document can exist but not be in cache.
      let e = await this.db.getDocument(target);
      return e;
    }

    return userData;
  }

  /**
   * A simple function to connecto mongodb.
   * This is not required to use, but if you do this must be called before other parts of the database or else functions will not work.
   * @param url Your mongodb URL
   * @see https://www.mongodb.com/ for support with setting up your database.
   */
  public async connect(url: string): Promise<void> {
    if (!url)
      throw new Error(ErrorMessage("No URL passed for database connection."));
    else mongodb_connect_function(url);
  }
}
