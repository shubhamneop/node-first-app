const EventEmmiter = require("events");

const emmiter = new EventEmmiter();

var url = "http://myloggle.io/log";

class Logger extends EventEmmiter {
  log(message) {
    //send
    console.log("message ", message);
    //emit event
    // emmiter.emit("messageLogged", { id: 1, url: "hdhdh" });
    this.emit("messageLogged", { id: 1, url: "hdhdh", message });
  }
}

//object export
// module.exports.log = log;
// module.exports.endPoint = url;

module.exports = Logger;
