import { DataBaseController } from "..";
import { ErrorMessage } from "../util/functions";
import {
  EconomyCoolDownOption,
  EconomyMethodOption,
  UserEconomyTypes,
} from "../util/typings";

/**
 * Allows easy internal control over all fetch based functions in our package
 * These methods control common acts like fetching for user data, ballance, and more.
 */
export class fetchManager {
  private db: DataBaseController = new DataBaseController();

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
    let f = await this.fetchUser(targetUser);
    if (!type) {
      return { wallet: f.balance.wallet };
    }
    if (type === "bank") {
      return { bank: f.balance.bank };
    } else if (type === "wallet") {
      return { wallet: f.balance.wallet };
    }
    return "Could not fetch the given users balance.";
  }

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
