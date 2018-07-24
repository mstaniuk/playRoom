# Simple room occupancy observer

Simple room occupancy observer IoT system based on two PIR modules and node server.
blah blah blah...

## stack

Hardware:

-   ESP8266 NodeMCU v3
-   PIR HC-SR501

Server:

-   Express
-   Redux
-   Socket.io

Client:

-   Hyperapp

## Prerequisites

// TBA
// Probably docker for compilation
// Probably node + adruino CLI/IDE

## Installing

// TBA

## Todo list

-   Simple and dirty POC

## Notes

Test data for POST to `/update`

```json
{
	"room": {
		"id": 10,
		"deviceId": 15,
		"status": "occupied"
	},
	"hash": "a2073426970f5de57a09e159df3c1f35"
}
```
