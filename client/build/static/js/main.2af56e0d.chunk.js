(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],[,,,,function(e,a,t){e.exports=t(12)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),l=t(3),o=t.n(l),r=(t(9),t(1)),i="ws://".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_ENDPOINT||"localhost",":8080");"http://".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_ENDPOINT||"localhost",":8080");t(10),t(11);var s=function(){var e=Object(n.useState)({solarData:[],batteryData:[],generationStats:[]}),a=Object(r.a)(e,2),t=a[0],l=a[1],o=Object(n.useRef)(null);Object(n.useEffect)((function(){try{o.current=new WebSocket(i)}catch(e){console.log(e)}return o.current.onopen=function(){console.log("websocket opened")},o.current.onmessage=function(a){try{l(JSON.parse(a.data))}catch(e){console.log(e)}},function(){console.log("closing socket"),o.current.close()}}),[]);var s=function(e){var a=e.toLowerCase();return a.includes("voltage")?"V":a.includes("power")?"W":a.includes("current")?"A":a.includes("generated")?"kW/h":void 0};return c.a.createElement("div",{className:"app"},c.a.createElement("div",{className:"header"},c.a.createElement("p",null,"EP Solar - Pi")),c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"data-container"},c.a.createElement("h2",{className:"data-container__title"},"Solar"),t.solarData.map((function(e,a){return c.a.createElement("div",{className:"data-container__data",key:a},c.a.createElement("p",null," ",e.label)," ",c.a.createElement("p",null," ",e.value,c.a.createElement("span",{className:"data-container__data__suffix"},s(e.label))))}))),c.a.createElement("div",{className:"data-container"},c.a.createElement("h2",{className:"data-container__title"},"Battery"),t.batteryData.map((function(e,a){return c.a.createElement("div",{className:"data-container__data",key:a},c.a.createElement("p",null," ",e.label)," ",c.a.createElement("p",null," ",e.value,c.a.createElement("span",{className:"data-container__data__suffix"},s(e.label))))}))),c.a.createElement("div",{className:"data-container"},c.a.createElement("h2",{className:"data-container__title"},"Energy Generation"),t.generationStats.map((function(e,a){return c.a.createElement("div",{className:"data-container__data",key:a},c.a.createElement("p",null,e.label),c.a.createElement("p",null,e.value,c.a.createElement("span",{className:"data-container__data__suffix"},s(e.label))))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(s,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.2af56e0d.chunk.js.map