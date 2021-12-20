import type { Document, Model } from "mongoose";
import { IDataBaseControler } from "./base.controller";
import { UserDataSchema, UserEconomyStructure } from "./schema";

export class DataBaseController extends IDataBaseControler {
  public constructor(model?: Model<UserEconomyStructure>) {
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
    const Icache = await this.model.find();
    for (const i in Icache) {
      const cache = Icache[i];
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
  public get(
    id: string,
    key: string,
    defaultValue: any
  ): Document<any, any, any> {
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
  public async set(
    id: string,
    key: string,
    value: any
  ): Promise<Document<any, any, any>> {
    // gets the cache first before writting to the db
    const data = this.items.get(id) || {};
    data[key] = value;
    this.items.set(id, data);

    const doc = await this.getDocument(id);
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
  public async delete(
    id: string,
    key: string
  ): Promise<Document<any, any, any>> {
    const data = this.items.get(id) || {};
    delete data[key];

    const doc = await this.getDocument(id);
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
  public async getDocument(id: string): Promise<any> {
    const obj = await this.model.findOne({ id });
    if (!obj) {
      // eslint-disable-next-line new-cap
      const newDoc = await new this.model({ id, settings: {} }).save();
      return newDoc;
    }

    return obj;
  }
}
