const labelMap = {
    solar_voltage: "Solar voltage",
    battery_voltage: "Battery voltage",
    solar_current: "Solar current",
    charging_current: "Charging current",
};

export const labelMapper = (label) => {
    return labelMap[label];
};
