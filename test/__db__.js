/**
 * ! ----------------------------- Test File -----------------------------
 *  Do not copy code from this file, it is used for development on new economy functions
 * ? ----------------------------- Test File -----------------------------
 */

const { Economy } = require("../dist/index");
const config = require("./config.json");

async function test() {
  const ecoTest = new Economy({
    currency: "$",
    defaultBankLimit: 5000,
    robEnabled: true,
    shopEnabled: false,
  });

  await ecoTest.connect(`${config.dbURl}`);

  // let eee = await ecoTest.currencyHandler.createUser("xxx");
  // console.log(eee);

  // let one = await ecoTest.currencyHandler.add(200, "xxx", "wallet")
  //   let two = await ecoTest.currencyHandler.subtract(100, "xxx", "wallet");
  // console.log(`[add] Wallet - ${one.wallet}, Earned - ${one.earned}`);

  // let three = await ecoTest.currencyHandler.pay(100, "xxx", "yyy");
  // console.log(three);

  setInterval(async () => {
    let four = await ecoTest.currencyHandler.work("xxx", 100, 500);
    if (four === false) {
      console.log("Failed to work.");
    } else {
      console.log(
        `[work] Earned - ${four.earned} Wallet - ${four.wallet}, Bank - ${four.bank}`
      );
    }
    let d = await ecoTest.currencyHandler.daily("xxx", 1000);
    if (d === false) {
      console.log("Your still on your daily cooldown.");
    } else {
      console.log(
        `[daily] Earned - ${d.earned}, balance: ${d.balance}, Daily Streak - ${d.dailyStreak}, Daily Timeout - ${d.dailyTimeout}`
      );
    }
  }, 5000);

  // setTimeout(async () => {
  // 	process.exit(1);
  // }, 10000);
}

test().catch((err) => {
  console.error(err);
});
