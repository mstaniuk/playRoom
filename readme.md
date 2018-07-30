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

### Arduino

Used third party libs:
~~_MD5_ https://github.com/tzikis/ArduinoMD5~~ _Scrapped for now_

_ArduinoJson_ https://github.com/bblanchon/ArduinoJson

_esp8266_ https://github.com/esp8266/Arduino

#### Setup process

1.  Install _Arduino IDE_ ( https://www.arduino.cc/en/main/software )
2.  ~~Install _MD5_ lib ( https://github.com/tzikis/ArduinoMD5#installation )~~ _Scrapped for now_
3.  Install _ArduinoJson_ ( https://github.com/bblanchon/ArduinoJson )
    1.  Open _Arduino IDE_
    2.  Go to _Manage Libraries_ from _Sketch_ -> _Include Library_ menu (in topbar)
    3.  Search for _ArduinoJson_
    4.  Select version 5.x
    5.  Install
    6.  ...
    7.  Profit
4.  Install _esp8266_ ( https://github.com/esp8266/Arduino#installing-with-boards-manager )
5.  Should be good

### Test API

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
