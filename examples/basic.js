// The required imports
const { Economy, CurrencyHandler } = require("discord-ts-economy");
const { Client, Intents } = require("discord.js");

const EconomyClient = new Economy(); // The controller of all our economy functions
const handler = new CurrencyHandler();

const botClient = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});

// The ready event starts before all other code. We will put our other Economy init function here.
botClient.on("ready", () => {
  // Allows us to connect to mongodb with our db url.
  EconomyClient.connect("");
  handler.init(); // loads all our current db data to cache on bot start
  console.log(`Logged in as ${botClient.user.tag}!`);
});

const prefix = "+";

botClient.on("messageCreate", async (msg) => {
  /**
   * Here we check if the message a user sends, starts with our prefix. If it does run the code below, else return
   * we also check if the message author was a bot.
   */
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  /**
   * To get user input we must check the user message arguments given to use.
   * We will store them in an array and filter through it for the data.
   */
  const args = msg.content.slice(prefix.length).trim().split(" ");
  // a simple convince for the bot commands using arguments
  const command = args.shift().toLowerCase();

  /**
   * the amount of money to add to the users bank or wallet.
   * because by default all messages in discord are of type string. We will need to turn them into numbers ourselves using the parseInt function/
   */
  const amount = parseInt(args[0]);
  const targetUser = args[1]; // the user to add money to (id)
  const option = args[2]; // the bank or wallet option.

  // Add command
  if (command === "add") {
    // if non of the options are given we will return an invalid reply to help the user correct there input.
    if (!amount || !targetUser || !option) {
      return msg.channel.send(
        `Incorrect usage ❌ Please use: \`${prefix}add <amount> <user> <wallet / bank>\``
      );
    }
    // if the wallet option is selected in the last argument
    else if (option === "wallet".toLocaleLowerCase()) {
      let data = await handler.add(amount, targetUser, "wallet");
      console.log(data);
      return msg.reply({
        content: `\`${data.earned}\` was added to your wallet. wallet - **$${data.wallet}**`,
      });
    }
    // if the bank option is selected in the last argument
    else if (option === "bank".toLocaleLowerCase()) {
      /**
       * In the data variable we are using the add method from the CurrencyHandler class in the package.
       * This function takes 3 arguments. Amount, TargetUser, and the EconomyMethodOption (bank | wallet).
       * Here we will pass the arguments into the function.
       */
      let data = await handler.add(amount, targetUser, "bank");
      console.log(data);
      // msg.reply is a discord.js function that sends our data back to the user. Here we tell them how there balance was updated.
      return msg.reply({
        content: `\`${data.earned}\` was added to your bank. Bank - **$${data.bank}**`,
      });
    } else {
      /**
       * if for some reason an error throws from a user argument we have not checked for, throw the exception.
       * This is just an example and basic fix but I would recommend building a better solution using more specific error handling for the user experience.
       *  */
      return msg.channel.send(
        `Incorrect usage ❌ Please use: \`${prefix}add <amount> <user> <wallet / bank>\``
      );
    }
  }
  // work command
  else if (command === "work") {
    /**
     * Because the work command is used by the message author, we can simply destructure the id from the Discord.js#Message Class and not worry about arguments for this command.
     */
    let data = await handler.work(msg.author.id, 100, 500);
    console.log(data);
    /**
     * Sometimes by random, data will return false using this function. This should be considered a failed work function and you can code accordingly to this if case.
     * If no false, you can access the extra data returned from the work method and use it as shown below.
     */
    if (data === false) {
      return msg.reply({
        content: `You were sick for work for today. You earned \`$0\` dollars and your boss is very annoyed.`,
      });
    } else {
      return msg.reply({
        content: `You did an amazing job today training the new employs. Take \`$${data.earned}\` for you and your family!\n\n You now have __**${data.wallet}**__ in your wallet.`,
      });
    }
  }
});

botClient.login("");
