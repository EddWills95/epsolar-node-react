# epsolar-node-react

An entirely node base application (that i'm running on a raspberry pi) to fetch data (and maybe soon set settings) on an EPSolar Charge Controller.

## To Run:
Build the client
```
cd client
npm build
```

Start the server with 
```
node index.js
```

My idea was to be able to update the client seperately so that all the raspberry pi would need to do was pull it

### Massive thanks
http://www.solarpoweredhome.co.uk/ - For working out how to connect the raspberry pi with a USB serial adapter and some initial serial stuff [Adapter from eBay](https://www.ebay.co.uk/itm/USB-to-RS485-Converter-Adapter-Support-Win7-XP-Vista-Linux-Mac-OS-WinCE5-0-UK/254413158743?ssPageName=STRK%3AMEBIDX%3AIT&_trksid=p2057872.m2749.l2649)

https://github.com/yaacov/node-modbus-serial/wiki/Methods - Without which I don't think I could have done this
https://github.com/toggio/PhpEpsolarTracer - For working out a bunch more of the serial input locations 
