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
