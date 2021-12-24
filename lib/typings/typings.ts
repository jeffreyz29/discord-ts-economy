/**
 * Economy Constructor Config typings.
 */
export interface EconomyConfigOptions {
  /** The namne of your economys currency */
  currency: string;
  /** If users can buy Items for your economy */
  shopEnabled?: boolean;
  /** The default bank size allows for a user before updating.*/
  defaultBankLimit?: number;
  /** If robbing is allowed in your economy. */
  robEnabled?: boolean;
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
  daily: {
    /** The daily streak each time the daily command is used. */
    dailyStreak: number;
    /** The last cached time the daily command was used. */
    dailyTimeout: number;
  };
  weekly: {
    /** The last cached time the weekly command was used. */
    weeklyStreak: number;
    /** The last cached time the weekly command was used. */
    weeklyTimeout: number;
  };
  monthly: {
    /** The last cached time the monthly command was used. */
    monthlyStreak: number;
    /** The last cached time the monthly command was used. */
    monthlyTimeout: number;
  };
  /** Where all the money is stored in the economy */
  balance: {
    /** The public user storage that can be robbed. */
    wallet: number;
    /** The private user storage that cant be robbed. The bank can also be used to buy items from our shop.
     */
    bank: number;
  };
  /** All user job and work information */
  jobConfig: {
    /** The time limit to use the work command again. */
    workTimeOut: number;
    /** The type of job the user has. */
    workJob: EconomyJobStructure;
  };
}

export interface EconomyBalanceStructure {
  /** The public user storage that can be robbed. */
  wallet: number;
  /** The private user storage that cant be robbed. The bank can also be used to buy items from our shop.
   */
  bank: number;
}

export type EconomyMethodOption = "wallet" | "bank";

export type EconomyCoolDownOption = "daily" | "weekly" | "monthly";

/** The structure for the job system and hierarchy in the economy. */
export interface EconomyJobStructure {
  lowClass: lowJobList;
  middleClass: middleJobList;
  highClass: highEndCome;
}

export type lowJobList = "taxi driver" | "mailman";

export type middleJobList = "banker" | "lawyer";

export type highEndCome = "basketball player";
