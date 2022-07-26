/*jslint node: true */
'use strict';

let os = require('os'),
	shelljs = require('shelljs');
	
let	fs = require('node:fs');

/* let argv = require('yargs')(process.argv.slice(2))
	.option('f', {
        alias: 'file',
        demandOption: true,
        describe: 'file to test',
        type: 'string'
    })
	.argv;
 */

module.exports = { 	binaryBit,
					is64bits,
					is32bits }

/*
Windows Get Adrress pointed at 0x3c~0x3d
Signatures: 
50 45 20 20 4c     = 32 bits
50 45 20 20 64 86  = 64 bits
In this program we test only the 5th byte after the address pointed at 0x3c~0x3d to test
if it is 76 decimal (0x4c hex) it is 32 bits
if it is 100 decimal (0x64 hex) it is 64 bits
*/
function binaryBit(binFile) {
	
	if (os.platform() != "win32") {
		console.log(shelljs.exec('file ' + binFile));
	}
	else {
		var binData;
		try {
			binData = fs.readFileSync(binFile);
		}
		catch {
			throw new error ("Error reading file " + binFile);
		}
		//console.log(binData.buffer);
		if (binData.length > 62) {
			var num = (binData[61] * 255) + binData[60];
			if (binData.length > (num+5)) {
				if (binData[num+5] == 76) {
					return "32";
				}
				if (binData[num+5] == 100){
					return "64";
				}
			}
		}
	}
	return "unknown";
}

function is64bits(binFile) {
	return binaryBit(binFile) == "64";
}
function is32bits(binFile) {
	return binaryBit(binFile) == "32";
}
//is64(argv.file);