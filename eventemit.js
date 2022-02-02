const EventEmmiter = require("events");
const Logger = require("./logger");

//const emmiter = new EventEmmiter();

// emmiter.on("messageLogged", (arg) => {
//   console.warn("Listen callced", arg);
// });

const logger = new Logger()

logger.on("messageLogged", (arg) => {
    console.warn("Listen callced", arg);
  });
logger.log('new message');
