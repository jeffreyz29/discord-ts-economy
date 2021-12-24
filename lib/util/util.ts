/**
 * @internal
 * Manages common utilities within the code.
 *  */
export class UtilityBase {
  /**
   *
   * @returns
   */
  public async versionController() {
    let version = require("../../package.json").version;
    let npmData = await fetch(
      "https://registry.npmjs.com/discord-ts-economy"
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
