import { DataBaseController } from "..";
import { IEconomy } from "../economy";
import type { EconomyConfigOptions } from "../typings/typings";
import { fetchManager } from "../managers/fetch";

/** The base class for all manager classes.
 *
 * In this class we will keep most of the basic types for all the other methods to inherit.
 */
export class ManagerBase {
  public utilities: UtilityBase = new UtilityBase();
  public fetchManager: fetchManager = new fetchManager();
  public db: DataBaseController = new DataBaseController();
  public _options: IEconomy = new IEconomy();
  /**
   * simple util to grab data from our Economy Constructor
   * @returns EconomyConfigOptions
   */
  public options(): EconomyConfigOptions {
    return this._options.config;
  }
}

/**
 * @internal
 * Manages common utilities within the code.
 *  */
class UtilityBase {
  /**
   *
   * @returns
   */
  public async versionController() {
    let version = require("../../package.json").version;
    let npmData = await fetch(
      "https://registry.npmjs.com/discord-easy-economy"
    ).then((d) => d.json());
    if (version == npmData["dist-tags"].latest) {
      return {
        upToDate: true,
        currentVersion: version,
        npmVersion: npmData["dist-tags"].latest,
      };
    } else {
      return {
        upToDate: false,
        currentVersion: version,
        npmVersion: npmData["dist-tags"].latest,
      };
    }
  }
}
