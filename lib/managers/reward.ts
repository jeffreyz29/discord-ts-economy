import { ManagerBase } from "../util/manager";
import { ErrorMessage } from "../util/functions";

/**
 * The reward manager is a class used to control economy rewards.
 *
 * All these functions are responsible for connecting our data to mongodb and user states.
 */
export class RewardManager extends ManagerBase {
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
