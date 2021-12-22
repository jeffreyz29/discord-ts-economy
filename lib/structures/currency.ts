import { DataBaseController } from "..";
import { fetchManager } from "../managers/fetch";
import { ErrorMessage } from "../util/functions";
import { EconomyMethodOption } from "../util/typings";

/**
 * The class to handler user balance methods.
 */
export class CurrencyHandler {
  private fetchManager: fetchManager = new fetchManager();
  private db: DataBaseController = new DataBaseController();

  /**
   * Creates the base user data for our economy.
   * @param targetUser
   */
  //@ts-ignore
  private async createUser(targetUser: string) {
    if (!targetUser) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }
    await this.db.set(targetUser, "balance", {
      wallet: 0,
      bank: 0,
    });
    await this.db.set(targetUser, "bankLimit", 5000);
    await this.db.set(targetUser, "daily", {});
    await this.db.set(targetUser, "itemsOwned", []);
    await this.db.set(targetUser, "weekly", {});
    await this.db.set(targetUser, "monthly", {});
    return "User Data Created.";
  }

  /**
   * Fetches for a users ballance
   * @param targetUser the discord user
   * @returns object
   */
  public fetch(targetUser: string) {
    if (!targetUser) {
      throw new Error(
        ErrorMessage("You are missing the valid options for the fetch method.")
      );
    }
    return {
      bank: this.fetchManager.fetchBalance(targetUser, "wallet"),
      wallet: this.fetchManager.fetchBalance(targetUser, "bank"),
    };
  }

  /**
   * Sets's value to a users wallet or bank.
   *
   * Warning using this function will over write a users ballance NOT add money to it. Please use the add function instead if you need to extend the wallet/bank.
   * @param amount of currency you wish to give the user
   * @param targetUser the discord user to target
   * @param type wallet or bank option
   * @returns amount
   */
  public async set(
    amount: number,
    targetUser: string,
    type: EconomyMethodOption
  ) {
    if (!targetUser || !amount || !type) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }

    if (isNaN(amount)) {
      throw new Error(ErrorMessage("amount option is not type Number!"));
    }

    let u = await this.fetchManager.fetchUser(targetUser);

    if (type === "wallet") {
      await this.db.set(targetUser, "balance", {
        wallet: amount,
        bank: u.balance.bank,
      });
      return {
        wallet: amount,
      };
    } else if (type === "bank") {
      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet,
        bank: amount,
      });
      return {
        bank: amount,
      };
    }
    return "Failed to add the new balance.";
  }

  /**
   * Add's value to a users wallet or bank.
   * While similar to the set function, it will not overwrite the old storage
   * @param amount of currency you wish to give the user
   * @param targetUser the discord user to target
   * @param type wallet or bank option
   * @returns amount
   */
  public async add(
    amount: number,
    targetUser: string,
    type: EconomyMethodOption
  ) {
    if (!targetUser || !amount || !type) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }

    if (isNaN(amount)) {
      throw new Error(ErrorMessage("amount option is not type Number!"));
    }

    let u = await this.fetchManager.fetchUser(targetUser);

    if (type === "wallet") {
      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet + amount,
        bank: u.balance.bank,
      });
      return {
        earned: amount,
        wallet: u.balance.wallet + amount,
      };
    } else if (type === "bank") {
      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet,
        bank: u.balance.bank + amount,
      });
      return {
        earned: amount,
        bank: u.balance.bank + amount,
      };
    }
    return "Failed to add the new balance.";
  }
  /**
   * Subtract's value to a users wallet or bank.
   * @param amount of currency you wish to give the user
   * @param targetUser the discord user to target
   * @param type wallet or bank option
   * @returns amount
   */
  public async subtract(
    amount: number,
    targetUser: string,
    type: EconomyMethodOption
  ) {
    if (!targetUser || !amount || !type) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }

    if (isNaN(amount)) {
      throw new Error(ErrorMessage("amount option is not type Number!"));
    }

    let u = await this.fetchManager.fetchUser(targetUser);

    if (type === "wallet") {
      let check = u.balance.wallet;
      if (check < amount) {
        return `You cant subtract ${amount} from this user. There wallet value is to small.`;
      }
      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet - amount,
        bank: u.balance.bank,
      });
      return {
        subtracted: amount,
        wallet: u.balance.wallet - amount,
      };
    } else if (type === "bank") {
      let check = u.balance.bank;
      if (check < amount) {
        return `You cant subtract ${amount} from this user. There bank value is to small.`;
      }
      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet,
        bank: u.balance.bank - amount,
      });
      return {
        subtracted: amount,
        bank: u.balance.bank - amount,
      };
    }
    return "Failed to subtract the new balance.";
  }

  public leaderBoard() {
    throw new Error(ErrorMessage("This function is not implemented yet."));
  }

  /**
   * Allows users to pay others from their own economy account.
   * @param amount of currency you wish to give the user
   * @param targetUser the user who will pay
   * @param targetToPay the user who will receive the amount
   * @returns paid amount
   */
  public async pay(amount: number, targetUser: string, targetToPay: string) {
    if (!targetUser || !amount || !targetToPay) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }
    if (isNaN(amount)) {
      throw new Error(ErrorMessage("amount option is not type Number!"));
    }

    // targetUser
    let u1 = await this.fetchManager.fetchUser(targetUser);
    // targetToPay
    let u2 = await this.fetchManager.fetchUser(targetToPay);

    let check = u1.balance.wallet;
    if (check < amount) return "Your wallet is to low to pay this user.";
    else {
      await this.db.set(targetUser, "balance", {
        wallet: u1.balance.wallet - amount,
        bank: u1.balance.bank,
      });
      await this.db.set(targetToPay, "balance", {
        wallet: u2.balance.wallet + amount,
        bank: u2.balance.bank,
      });
      return {
        paid: amount,
        userWallet: u1.balance.wallet,
        newUserWallet: u2.balance.wallet,
      };
    }
  }
  /**
   *
   * @param targetUser the discord user id
   * @param minEarn the minimum amount the work function will give the user
   * @param maxEarn the max amount the work function will give the user
   * @param failChance the fail rate divided by 100.
   * @returns A random number added to the users balance
   */
  public async work(
    targetUser: string,
    minEarn: number,
    maxEarn: number,
    failChance?: number
  ) {
    if (!targetUser || !minEarn || !maxEarn) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }
    if (isNaN(minEarn) || isNaN(maxEarn)) {
      throw new Error(ErrorMessage("option is not type Number!"));
    }

    // if no option is passed it will default to 20%
    if (!failChance) failChance = 20;

    let failPercent = Math.random() < failChance / 100;
    if (failPercent) {
      return false;
    } else {
      let amount = Math.floor(
        Math.random() * (maxEarn - minEarn + 1) + minEarn
      );

      let u = await this.fetchManager.fetchUser(targetUser);
      await this.db.set(targetUser, "balance", {
        wallet: u.balance.wallet + amount,
        bank: u.balance.bank,
      });
      return {
        earned: amount,
        bank: u.balance.bank,
        wallet: u.balance.wallet,
      };
    }
  }

  public async daily(targetUser: string, amount: number) {
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

      await this.db.set(targetUser, "daily", {
        dailyStreak: u.daily.dailyStreak,
        dailyTimeout: (u.daily.dailyTimeout = Date.now()),
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
      };
    }
  }
}
