const ModbusRTU = require("modbus-serial");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EPSolarSerial {
    client;

    constructor() {
        this.client = new ModbusRTU();
    }

    connect = () => {
        return this.client.connectRTU("/dev/ttyUSB0", { baudRate: 115200 });
    }

    getStats = async () => {
        const stats = [];
        const locations = {
            "Max input voltage today": 0x3300,
            "Min input voltage today": 0x3301,
            "Max battery voltage today": 0x3302,
            "Min battery voltage today": 0x3303,
            "Consumed energy today": 0x3304,// -3305
            "Consumed energy this month": 0x3306, // -3307
            "Consumed energy this year": 0x3308, // -3309
            "Total consumed energy": 0x330A, // -330B
            "Generated energy today": 0x330C, // -330D
            "Generated energy this moth": 0x330E, // -330F
            "Generated energy this year": 0x3310, // -3311
            "Total generated energy": 0x3312, // -3313
            "Carbon dioxide reduction": 0x3314, // -3315
            "Net battery current": 0x331B, // -331C
            "Battery temperature": 0x331D,
            "Ambient temperature": 0x331E
        }

        try {
            for (const [name, position] of Object.entries(locations)) {
                const { data } = await this.client.readInputRegisters(position, 1)
                stats.push({ [name]: parseInt(data[0]) / 100 })
            }
        } catch (error) {
            console.log(error)
        }

        return stats;
    }

    getLiveData = async () => {
        const liveData = [];
        const locations = {
            "PV array voltage": 0x3100,
            "PV array current": 0x3101,
            "PV array power": 0x3102, // -3103,
            "Battery voltage": 0x3104,
            "Battery charging current": 0x3105,
            "Battery charging power": 0x3106, //-3107,
            "Load voltage": 0x310C,
            "Load current": 0x310D,
            "Load power": 0x310E, //-310F				
            "Battery temperature": 0x3110,
            "Charger temperature": 0x3111,
            "Heat sink temperature": 0x3112,
            "Battery SOC": 0x311A,
            "Remote battery temperature": 0x311B,
            "System rated voltage": 0x311C,
            "Battery status": 0x3200,
            "Equipment status": 0x3201,
        }

        try {
            for (const [name, position] of Object.entries(locations)) {
                const { data } = await this.client.readInputRegisters(position, 1)
                liveData.push({ [name]: parseInt(data[0]) / 100 })
            }
        } catch (error) {
            console.log(error)
        }

        return liveData;
    }

    // Checking the buffer, i'm going to assume: 0 Day, 1 Night
    getDayNight = async () => {
        try {
            const data = await this.client.readDiscreteInputs(0x200C, 1);
            console.log(data);
            return data.data[0];
        } catch (error) {
            console.log(error)
        }
    }

    // const [solar_voltage, solar_current, _a, _b, battery_voltage, charging_current] = data.data.map(d => parseFloat(d) / 100);

}

module.exports = EPSolarSerial;

const EPSolar = new EPSolarSerial();

EPSolar.connect().then(() => {
    EPSolar.getDayNight().then(dayNight => console.log(dayNight));

    // EPSolar.getLiveData().then(data => {
    //     console.log('livedata', data);
    // }).catch(error => console.log(error));

    // EPSolar.getStats().then((data) => {
    //     console.log('stats', data);
    // }).catch(error => console.log(error));
});