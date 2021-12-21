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

  let one = await ecoTest.currencyHandler.add(200, "xxx", "wallet");
//   let two = await ecoTest.currencyHandler.subtract(100, "xxx", "wallet");
  console.log(one);

  let three = await ecoTest.currencyHandler.pay(100, "xxx", "yyy")
  console.log(three)

  setTimeout(async () => {
    process.exit(1);
  }, 10000);
}

test().catch((err) => {
  console.error(err);
});
