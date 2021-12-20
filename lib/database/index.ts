import { Collection } from "@discordjs/collection";
import { Model } from "mongoose";
import IModuleError from "../util/errors";
import { UserEconomyStructure } from "./schema";

export class IDataBaseController {
  /** The cache collection for our DataBase. */
  public items: Collection<string, any>;
  /** The mongodb Model for our database. If non is passed then the default model will be used.*/
  public model!: Model<UserEconomyStructure>;
  constructor() {
    // Creating our new cache when the Economy is loaded.
    this.items = new Collection();
  }

  /**
   * Initializes the provider.
   * @abstract
   * @returns {any}
   */
  public init() {
    throw new IModuleError("NOT_IMPLEMENTED", this.constructor.name, "init");
  }
  /**
   * Gets a value.
   * @abstract
   * @param {string} id - ID of entry.
   * @param {string} key - The key to get.
   * @param {any} [defaultValue] - Default value if not found or null.
   * @returns {any}
   */
  public get(id: string, key: string, defaultValue: any): any {
    id;
    key;
    defaultValue;
    throw new IModuleError("NOT_IMPLEMENTED", this.constructor.name, "get");
  }

  /**
   * Sets a value.
   * @abstract
   * @param {string} id - ID of entry.
   * @param {string} key - The key to set.
   * @param {any} value - The value.
   * @returns {any}
   */
  public set(id: string, key: string, value: any): Promise<any> {
    id;
    key;
    value;
    throw new IModuleError("NOT_IMPLEMENTED", this.constructor.name, "set");
  }

  /**
   * Deletes a value.
   * @abstract
   * @param {string} id - ID of entry.
   * @param {string} key - The key to delete.
   * @returns {any}
   */
  public delete(id: string, key: string): Promise<any> {
    id;
    key;
    throw new IModuleError("NOT_IMPLEMENTED", this.constructor.name, "delete");
  }

  /**
   * Clears an entry.
   * @abstract
   * @param {string} id - ID of entry.
   * @returns {any}
   */
  public clear(id: string): Promise<any> {
    id;
    throw new IModuleError("NOT_IMPLEMENTED", this.constructor.name, "clear");
  }
}
