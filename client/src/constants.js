const ip = require("ip");

export const socketUrl = `ws://${
    process.env.REACT_APP_ENDPOINT || ip.address()
}:8080`;
export const endpointUrl = `http://${
    process.env.REACT_APP_ENDPOINT || ip.address()
}:8080`;
