import { DataBaseController, fetchManager } from "..";
import { ErrorMessage } from "../util/functions";

/** The Wallet manager class handles common methods with our economy currency and values.
 *
 *  TODO Add functions to increment bank limit, item storage and more
 */
export class WalletManager {
  private db: DataBaseController = new DataBaseController();
  private fetchManager: fetchManager = new fetchManager();
  /**
   * Searches the economy cache for the user bank limit.
   * @param targetUser the user id to search for in our db.
   * @returns
   */
  public async fetchBankLimit(targetUser: string): Promise<{
    banklimit: any;
  }> {
    if (!targetUser) {
      throw new Error(
        ErrorMessage("You are missing the valid options for this method.")
      );
    }
    // Use cache to fetch the data quickly.
    // if not found in the cache then we will search the db itself.
    let banklimitCache = this.db.get(targetUser, "bankLimit", null);
    if (!banklimitCache) {
      let r = await this.fetchManager.fetchUser(targetUser);
      return {
        banklimit: r.bankLimit,
      };
    } else {
      return {
        banklimit: banklimitCache,
      };
    }
  }
}
