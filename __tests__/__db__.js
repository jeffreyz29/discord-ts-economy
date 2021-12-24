/**
 * ! ----------------------------- Test File -----------------------------
 *  Do not copy code from this file, it is used for development on new economy functions
 * ? ----------------------------- Test File -----------------------------
 */

const { Economy, CurrencyHandler, fetchManager } = require("../out/index");
const config = require("./config.json");

async function test() {
  const eco = new Economy({
    currency: "$",
    defaultBankLimit: 23000,
    robEnabled: true,
    shopEnabled: false,
  });

  const fetchHandler = new fetchManager();

  await eco.connect(`${config.dbURl}`);

  console.log(`x: ${eco.config.defaultBankLimit}`);

  fetchHandler.init();

  setInterval(async () => {
    // let data1 = await currencyHandler.work("xxx", 100, 500)
    // console.log(data1);
    let data = await fetchHandler.fetchBalance("xxx", "wallet");
    console.log(data);
  }, 5000);
}

test().catch((err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(`[300]${err}`);
});

process.on("uncaughtException", (err) => {
  console.error(`[500]${err}`);
});
