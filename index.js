const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;
const fs = require('fs');
const printer = require('@thiagoelg/node-printer');

// Unique to my printer, you will need to lookup the info for yours
let thermalPrinter = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: 'printer:EPSON_TM_T88V',
  driver: printer,
  width: 42
});

async function execute() {

  // Import the lyrics
  let lyrics = fs.readFileSync('lyrics.txt', 'utf8');
  let lines = lyrics.split('\n');

  // Actions are queued up before being sent to the printer

  // Use a for loop to keep sync
  for (let i = 0; i < lines.length; i++) {
    thermalPrinter.println(lines[i]);
  }

  thermalPrinter.cut();

  // // Printer runs with execute
  await thermalPrinter.execute();
}

execute();