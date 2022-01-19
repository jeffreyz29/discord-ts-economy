import { DataBaseController } from "..";
import { ErrorMessage } from "../util/functions";
import { fetchManager } from "./fetch";

/**
 * The reward manager is a class used to control economy rewards.
 *
 * All these functions are responsible for connecting our data to mongodb and user states.
 */
export class RewardManager {
  private fetchManager: fetchManager = new fetchManager();
  private db: DataBaseController = new DataBaseController();

  /**
   * Loads all the economy data to our ram for quick access.
   *
   * WARNING: You only need to call this function once in your program.
   */
  public init(): void {
    this.db.init().then(() => {});
  }

  /**
   * The daily reward adds a value to the users' wallet every 24 hours.
   * @param targetUser the id to fetch from our db
   * @param amount of money to give the user
   * @returns
   */
  public async daily(targetUser: string, amount?: number) {
    if (!targetUser || !amount) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }

    let u = await this.fetchManager.fetchUser(targetUser);

    // if the daily function was used in the last 24 hours, return
    if (Date.now() < u.daily.dailyTimeout + 86400000) {
      return false;
    } else {
      if (Date.now() > u.daily.dailyTimeout + 86400000 * 2)
        u.daily.dailyStreak = 0;
      else u.daily.dailyStreak + 1;

      let dailyTimeOUT: number = (u.daily.dailyTimeout = Date.now());

      await this.db.set(targetUser, "daily", {
        dailyStreak: u.daily.dailyStreak,
        dailyTimeout: dailyTimeOUT,
      });

      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet + amount,
        bank: u.balance.bank,
      });

      return {
        earned: amount,
        bank: u.balance.bank,
        wallet: u.balance.wallet,
        dailyStreak: u.daily.dailyStreak,
        dailyTimeout: dailyTimeOUT,
      };
    }
  }
}
