const ModbusRTU = require("modbus-serial");

class EPSolarSerial {
    client;

    constructor(serialAddress = "/dev/ttyUSB0") {
        this.client = new ModbusRTU();
        this.serialAddress = serialAddress;
    }

    connect = () => {
        return this.client.connectRTU(this.serialAddress, {
            baudRate: 115200,
        });
    };

    getBatteryData = async () => {
        const locations = {
            "Max battery voltage today": 0x3302,
            "Min battery voltage today": 0x3303,
            "Battery voltage": 0x3104,
            "Battery charging current": 0x3105,
            "Battery charging power": 0x3106, //-3107,
            "Battery SOC": 0x311a,
        };

        return await this._readRegisters(locations);
    };

    getSolarData = async () => {
        const locations = {
            "PV array voltage": 0x3100,
            "PV array current": 0x3101,
            "PV array power": 0x3102, // -3103,
            "Max input voltage today": 0x3300,
            "Min input voltage today": 0x3301,
        };

        return await this._readRegisters(locations);
    };

    getGenerationStats = async () => {
        const locations = {
            "Generated energy today": 0x330c, // -330D
            "Generated energy this month": 0x330e, // -330F
            "Generated energy this year": 0x3310, // -3311
            "Total generated energy": 0x3312, // -3313
            "Carbon dioxide reduction": 0x3314, // -3315
        };

        return await this._readRegisters(locations);
    };

    // Checking the buffer, i'm going to assume: 0 Day, 1 Night
    isNight = async () => {
        try {
            const data = await this.client.readDiscreteInputs(0x200c, 1);
            return data.data[0];
        } catch (error) {
            console.log(error);
        }
    };

    getData = async () => {
        const solarData = await this.getSolarData();
        const batteryData = await this.getBatteryData();
        const generationStats = await this.getGenerationStats();
        const isNight = await this.isNight();
        return { solarData, batteryData, generationStats, isNight };
    };

    _convertNameToObjectKey = (name) => {
        return name.toString().toLowerCase().split(" ").join("_");
    };

    _readRegisters = async (locations) => {
        const registerData = [];
        try {
            for (const [name, position] of Object.entries(locations)) {
                const { data } = await this.client.readInputRegisters(
                    position,
                    1
                );
                registerData.push({
                    label: name,
                    value: parseInt(data[0]) / 100,
                    // [this._convertNameToObjectKey(name)]: {
                    //     label: name,
                    //     value: parseInt(data[0]) / 100,
                    // },
                });
            }
        } catch (error) {
            console.log(error);
        }

        return registerData;
    };
}

module.exports = EPSolarSerial;

// const EPSolar = new EPSolarSerial();

// const getData = async () => {
//     const solarStats = await EPSolar.getSolarStats();
//     const batteryData = await EPSolar.getBatteryData();
//     const generationStats = await EPSolar.getGenerationStats();
//     return { solarStats, batteryData, generationStats };
// };

// EPSolar.connect().then(() => {
//     getData();
// });
