import type { Model } from "mongoose";
import { IDataBaseController } from ".";
import { IEconomy } from "../economy";
import { UserDataSchema } from "./schema";
import type { key_db_options } from "./types";

/**
 * The Database Controller manages the main functionality of the database and our cache system.
 */
export class DataBaseController extends IDataBaseController {
  /** Allows native db functions to access the economy config constructor */
  public config = new IEconomy().config;
  public constructor(model?: Model<any>) {
    super();
    // if a model is  inserted then use that and not the default
    if (model) {
      this.model = model;
    } else {
      this.model = UserDataSchema;
    }
  }

  /**
   * Saves all the mongodb documents to our cache after starting the db.
   */
  public async init(): Promise<void> {
    const Cache = await this.model.find();
    for (const i in Cache) {
      const cache = Cache[i];
      this.items.set(cache.id, cache.settings);
    }
  }
  /**
   * Gets a value from our cache.
   * Keep in mind if the data is not in the cache you have to fetch the entire document.
   * @param {string} id - ID of document.
   * @param {string} key - The key to get.
   * @param {any} [defaultValue] - Default value if not found or null.
   * @returns {any}
   */
  public get(id: string, key: key_db_options, defaultValue: any): any {
    if (this.items.has(id)) {
      const value = this.items.get(id)[key];
      return value == null ? defaultValue : value;
    } else {
      return defaultValue;
    }
  }
  /**
   * Sets a value in our cache and db.
   * @param {string} id - ID of document
   * @param {string} key - The key to set.
   * @param {any} value - The value.
   * @returns {Promise<any>} - Mongoose query object|document
   */
  public async set(id: string, key: key_db_options, value: any): Promise<any> {
    // gets the cache first before writting to the db
    const data = this.items.get(id) || {};
    data[key] = value;
    this.items.set(id, data);

    const doc = (await this.getDocument(id)) as any;
    doc.settings[key] = value;
    doc.markModified("settings");
    return doc.save();
  }

  /**
   * Deletes a value from our cache and db.
   * This is not the same as the clear function. This will only delete a settings[key] field
   * @param {string} id - ID of document
   * @param {string} key - The key to delete.
   * @returns {Promise<any>} - Mongoose query object|document
   */
  public async delete(id: string, key: key_db_options): Promise<any> {
    const data = this.items.get(id) || {};
    delete data[key];

    const doc = (await this.getDocument(id)) as any;
    delete doc.settings[key];
    doc.markModified("settings");
    return doc.save();
  }

  /**
   * Removes a document from our cache and db.
   * @param {string} id - ID of document
   * @returns {Promise<void>}
   */
  public async clear(id: string): Promise<void> {
    this.items.delete(id);
    const doc = await this.getDocument(id);
    if (doc) await doc.remove();
  }

  /**
   * Gets a document from the mongodb servers and not cache.
   * @param {string} id - ID of document
   * @returns {Document<any, any, any>} - Mongoose query object|document
   */
  public async getDocument(id: string) {
    const obj = await this.model.findOne({ id });
    // if no document is found in our db, create one and return that default data.
    if (!obj) {
      // eslint-disable-next-line new-cap
      const newDoc = await new this.model({
        id,
        settings: {
          balance: {
            wallet: 0,
            bank: 0,
          },
          bankLimit: this.config.defaultBankLimit || 20000,
          daily: {
            dailyStreak: 0,
            dailyTimeout: 0,
          },
          itemsOwned: [],
          weekly: {
            weeklyStreak: 0,
            weeklyTimeout: 0,
          },
          monthly: {
            monthlyStreak: 0,
            monthlyTimeout: 0,
          },
          jobConfig: {
            workTimeOut: 60000 * 60 * 24,
          },
        },
      }).save({ timestamps: true });
      return newDoc;
    } else {
      return obj;
    }
  }
}
