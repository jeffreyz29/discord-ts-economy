/**
 * Economy Constructor Config typings.
 */
export interface EconomyConfigOptions {
  /** The namne of your economys currency */
  currency: string;
  /** If users can buy Items for your economy */
  shopEnabled: boolean;
  /** The default bank size allows for a user before updating.*/
  defaultBankLimit: number;
  /** If robbing is allowed in your economy. */
  robEnabled: boolean;
  /** Optional Connection string for mongodb. If not provided you will have to create your own connection.*/
  mongodbURL?: string;
}

/** Typings for the User Data in our Economy. */
export interface UserEconomyTypes {
  /**
   * The max balance a user bank can have.
   */
  bankLimit: number;
  /** All the items owned by the user from the shop */
  itemsOwned: Array<any>;
  /** The last cached time the daily command was used. */
  dailyTimeout: number;
  /** The daily streak each time the daily command is used. */
  dailyStreak: number;
  /** The last cached time the weekly command was used. */
  weeklyTimeout: number;
  /** The last cached time the weekly command was used. */
  weeklyStreak: number;
  /** The last cached time the monthly command was used. */
  monthlyTimeout: number;
  /** The last cached time the monthly command was used. */
  monthlyStreak: number;
  /** Where all the money is stored in the economy */
  balance: {
    /** The public user storage that can be robbed. */
    wallet: number;
    /** The private user storage that cant be robbed. The bank can also be used to buy items from our shop.
     */
    bank: number;
  };
}

export type EconomyMethodOption = "wallet" | "bank";

export type EconomyCoolDownOption = "daily" | "weekly" | "monthly";
