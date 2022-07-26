# binary-bit

## Description
NPM package to test if binary is 64 or 32 bits


## Installation
npm i binary-bit


## Exported Functions

### binaryBit(binFile)
Return "32", "64" or "unknow"

### is64bits(binFile)
Return true if it is a 64 bits binary

### is32bits(binFile)
Return true if it is a 32 bits binary

## Usage

### Simple Example

```javascript
#!/usr/bin/env node
const binarybit = require('binary-bit')

var binFile = "C:\temp\example.exe";
var result = binarybit.binaryBit(binFile);
if (result == "32")
	console.log("32 bit binary");
else if(result == "64")
	console.log("64 bit binary");
else
	console.log("Is this a binary file?");
```
