/**
 * ! ----------------------------- Test File -----------------------------
 *  Do not copy code from this file, it is used for development on new economy functions
 * ? ----------------------------- Test File -----------------------------
 */


const mongo = require("mongoose");
const { Economy } = require("../dist/index");
const config = require("./config.json");

const on = async () => {
  mongo.connect(`${config.dbURl}`);
  console.log("Connected to mongodb!");
};

const ecoTest = new Economy({
  currency: "$",
  defaultBankLimit: 5000,
  robEnabled: true,
  shopEnabled: false,
});

console.log("Eco Class loaded...");

// testing functions

on()
  .then(async () => {
    await ecoTest.db.init().then(async () => {
      await console.log(
        `Starting Cached Items Size: ${ecoTest.db.items.size ?? 0}`
      );
    });

    let setCommand = ecoTest.db.get("xxx", "x", null);
    console.log(setCommand ?? "No data");
    if (!setCommand) {
      let err = await ecoTest.db.set("xxx", "x", {
        mock: "Sent to db...",
      });
      console.log(err);
      console.log(`Updated Cached Items Size: ${ecoTest.db.items.size ?? 0}`);
    }

    setTimeout(() => {
      ecoTest.db.clear("xxx");
      console.log("Document Deleted...");
      console.log(`New Cached Items Size: ${ecoTest.db.items.size ?? 0}`);
      process.exit(1);
    }, 10000);
  })
  .then(() => {
    console.log("Program Finished!");
  })
  .catch((err) => console.error(err));
