import { ErrorMessage } from "../util/functions";
import type {
  EconomyBalanceStructure,
  EconomyCoolDownOption,
  EconomyMethodOption,
  UserEconomyTypes,
} from "../typings/typings";
import { DataBaseController } from "..";

/**
 * Allows easy internal control over all fetch based functions in our package
 * These methods control common acts like fetching for user data, ballance, and more.
 *
 * The fetch managers main goal is to make common data fetching easy and quick. Most things will be controlled by cache.
 *
 */
export class fetchManager {
  private db: DataBaseController = new DataBaseController();
  /**
   * Loads all the economy data to our ram for quick access.
   *
   * WARNING: You only ned to call this function once in your program.
   */
  public init(): void {
    this.db.init();
  }
  /**
   * Searches the db for our user document.
   * If non is found then an empty object will be created under the base db settings object.
   * @param targetUser
   * @returns User Object
   */
  public async fetchUser(targetUser: string): Promise<UserEconomyTypes> {
    if (!targetUser) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }
    let f = (await this.db.getDocument(targetUser))
      .settings as UserEconomyTypes;
    // check if the document exists
    return f;
  }
  /**
   * Fetches the database for the users current balance in our economy.
   * @param targetUser the discord your is
   * @param type the type of user storage you wish to fetch for. Defaults to wallet.
   * @returns
   */
  public async fetchBalance(targetUser: string, type?: EconomyMethodOption) {
    if (!targetUser) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }
    // let f = await this.fetchUser(targetUser);

    let ff = this.db.get(
      targetUser,
      "balance",
      null
    ) as EconomyBalanceStructure;

    if (!ff) return "no data found";

    if (!type) {
      return { wallet: ff.wallet };
    }
    if (type === "bank") {
      return { bank: ff.bank };
    } else if (type === "wallet") {
      return { wallet: ff.wallet };
    }
  }

  /**
   * Returns a given users reward cooldowns
   * @param targetUser the id to fetch from the db
   * @param coolDownOption type of cooldown to fetch
   * @returns
   */
  public async fetchCoolDowns(
    targetUser: string,
    coolDownOption: EconomyCoolDownOption
  ) {
    if (!targetUser || !coolDownOption) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }
    let u = await this.fetchUser(targetUser);

    switch (coolDownOption) {
      case "daily":
        return {
          dailyTimeout: u.daily.dailyTimeout,
          dailyStreak: u.daily.dailyStreak,
        };
      case "weekly":
        return {
          weeklyTimeout: u.weekly.weeklyTimeout,
          weeklyStreak: u.weekly.weeklyStreak,
        };
      case "monthly":
        return {
          monthlyTimeout: u.monthly.monthlyTimeout,
          monthlyStreak: u.monthly.monthlyStreak,
        };
      default:
        return {
          dailyTimeout: u.daily.dailyTimeout,
          dailyStreak: u.daily.dailyStreak,
        };
    }
  }
}
