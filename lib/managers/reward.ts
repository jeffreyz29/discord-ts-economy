import { DataBaseController } from "..";
import { ErrorMessage } from "../util/functions";
import { fetchManager } from "./fetch";
import {Logger} from "../util/logger";

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
  public async daily(targetUser: string, amount = 500) {
    if (!targetUser) {
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
      else u.daily.dailyStreak++;

      let dailyTimeOUT: number = (u.daily.dailyTimeout = Date.now());

      await this.db.set(targetUser, "daily", {
        dailyStreak: u.daily.dailyStreak,
        dailyTimeout: dailyTimeOUT,
      });

      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet + amount,
        bank: u.balance.bank,
      });

      let data = {
        user: targetUser,
        type: "daily",
        amount: amount,
        streak: u.daily.dailyStreak,
        time: dailyTimeOUT,
      };

      if(this.db.config.debug) Logger.info(`[RewardManager] Daily Reward given to ${targetUser} with data: ${JSON.stringify(data)}`);

      return data;

    }
  }

  /**
   * The weekly reward adds a value to the users' wallet every 7 days.
   * @param targetUser
   * @param amount
   */
  public async weekly(targetUser: string, amount = 2500) {
    if (!targetUser) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }

    let u = await this.fetchManager.fetchUser(targetUser);

    // if the daily function was used in the last 24 hours, return
    if (Date.now() < u.weekly.weeklyTimeout + 604800000) {
      return false;
    } else {
      if (Date.now() > u.weekly.weeklyTimeout + 604800000 * 2)
        u.weekly.weeklyStreak = 0;
      else u.weekly.weeklyStreak++;

      let weeklyTimeOUT: number = (u.weekly.weeklyTimeout = Date.now());

      await this.db.set(targetUser, "weekly", {
        weeklyStreak: u.weekly.weeklyStreak,
        weeklyTimeout: weeklyTimeOUT,
      });

      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet + amount,
        bank: u.balance.bank,
      });

      let data = {
        earned: amount,
        bank: u.balance.bank,
        wallet: u.balance.wallet,
        weeklyStreak: u.weekly.weeklyStreak,
        weeklyTimeout: weeklyTimeOUT,
      };

      if(this.db.config.debug) Logger.log(`[RewardManager] Weekly reward given to ${targetUser} with data: ${JSON.stringify(data)}`);

      return data;
    }
  }

  /**
   * The monthly reward adds a value to the users' wallet every 30 days.
   * @param targetUser
   * @param amount
   */
  public async monthly(targetUser: string, amount = 5000) {
    if (!targetUser) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }

    let u = await this.fetchManager.fetchUser(targetUser);

    // if the daily function was used in the last 24 hours, return
    if (Date.now() < u.monthly.monthlyTimeout + 2629746000) {
      return false;
    } else {
      if (Date.now() > u.monthly.monthlyTimeout + 2629746000 * 2)
        u.monthly.monthlyStreak = 0;
      else u.monthly.monthlyStreak++;

      let monthlyTimeOUT: number = (u.monthly.monthlyTimeout = Date.now());

      await this.db.set(targetUser, "monthly", {
        monthlyStreak: u.monthly.monthlyStreak,
        monthlyTimeout: monthlyTimeOUT,
      });

      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet + amount,
        bank: u.balance.bank,
      });

      let data = {
        earned: amount,
        bank: u.balance.bank,
        wallet: u.balance.wallet,
        monthlyStreak: u.monthly.monthlyStreak,
        monthlyTimeout: monthlyTimeOUT,
      }

      if(this.db.config.debug) Logger.info(`[RewardManager] Monthly reward given to ${targetUser} with data: ${JSON.stringify(data)}`);



      return data
    }
  }
}
