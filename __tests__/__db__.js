/**
 * ! ----------------------------- Test File -----------------------------
 *  Do not copy code from this file, it is used for development on new economy functions
 * ? ----------------------------- Test File -----------------------------
 */

const {
  Economy,
  CurrencyHandler,
  fetchManager,
  WalletManager,
} = require("../out/index");
const config = require("./config.json");

async function test() {
  const eco = new Economy({
    currency: "$",
    defaultBankLimit: 23000,
    robEnabled: true,
    shopEnabled: false,
  });

  const fetchHandler = new fetchManager();
  const moneyHandler = new CurrencyHandler();
  const walletHandler = new WalletManager();

  eco.connect(`${config.dbURl}`);

  fetchHandler.init();

  let lb = await moneyHandler.leaderBoard();
  console.log(lb);

  // await walletHandler.fetchBankLimit("0");
  // await walletHandler.fetchBankLimit("1");
  // await walletHandler.fetchBankLimit("2");
  // await walletHandler.fetchBankLimit("3");
  // await walletHandler.fetchBankLimit("4");
  // await walletHandler.fetchBankLimit("5");
  // await walletHandler.fetchBankLimit("6");
  // await walletHandler.fetchBankLimit("7");
  // await walletHandler.fetchBankLimit("8");

  process.exit(0);
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
