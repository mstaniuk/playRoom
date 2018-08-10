# Simple room occupancy observer

Simple room occupancy observer IoT system based on two PIR modules and node server.
blah blah blah...

## Commands

### Start server

`npm run server`

### Build front

`npm run client`

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

### App

-   nodejs

### Arduino

-   Arduino IDE

## Notes

### Arduino

Used third party libs:

_ArduinoJson_ https://github.com/bblanchon/ArduinoJson

_esp8266_ https://github.com/esp8266/Arduino

#### Setup process

1.  Install _Arduino IDE_ ( https://www.arduino.cc/en/main/software )
2.  Install _ArduinoJson_ ( https://github.com/bblanchon/ArduinoJson )
    1.  Open _Arduino IDE_
    2.  Go to _Manage Libraries_ from _Sketch_ -> _Include Library_ menu (in topbar)
    3.  Search for _ArduinoJson_
    4.  Select _version 5.x_
    5.  Install
    6.  ...
    7.  Profit
3.  Install _esp8266_ ( https://github.com/esp8266/Arduino#installing-with-boards-manager )
4.  Should be good

### Test API

Test data for POST to `/update`

```json
{
    "id": 10,
    "deviceId": 15,
    "status": "occupied"
}
```
