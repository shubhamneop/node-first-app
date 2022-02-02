const os = require('os');

var totalMem = os.totalmem();
var freeMem = os.freemem();
console.info(`totalMem ${totalMem}, freeMem ${freeMem}`);

