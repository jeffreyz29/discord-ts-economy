export interface UserEconomyTypes {
  /**
   * The max balance a user bank can have.
   */
  bankLimit: number;
  /** All the items owned by the user from the shop */
  itemsOwned: Array<any>;
  /** The last cached time the daily command was used. */
  dailyTimeout: number;
  dailyStreak: number;
  /** The last cached time the weekly command was used. */
  weeklyTimeout: number;
  weeklyStreak: number;
  /** The last cached time the monthly command was used. */
  monthlyTimeout: number;
  monthlyStreak: number;
  /** Where all the money is stored in the economy */
  balance: {
    /** The public user storage that can be robbed */
    wallet: number;
    /** The private user storage that cant be robbed*/
    bank: number;
  };
}
