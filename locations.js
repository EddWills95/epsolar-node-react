const KNOWN_LOCATIONS = {
    "PV array voltage": 0x3100,
    "PV array current": 0x3101,
    "PV array power": 0x3102, // -3103,
    "Battery voltage": 0x3104,
    "Battery charging current": 0x3105,
    "Battery charging power": 0x3106, //-3107,
    "Load voltage": 0x310c,
    "Load current": 0x310d,
    "Load power": 0x310e, //-310F
    "Battery temperature": 0x3110,
    "Charger temperature": 0x3111,
    "Heat sink temperature": 0x3112,
    "Battery SOC": 0x311a,
    "Remote battery temperature": 0x311b,
    "System rated voltage": 0x311c,
    "Battery status": 0x3200,
    "Equipment status": 0x3201,
    "Max input voltage today": 0x3300,
    "Min input voltage today": 0x3301,
    "Max battery voltage today": 0x3302,
    "Min battery voltage today": 0x3303,
    "Consumed energy today": 0x3304, // -3305
    "Consumed energy this month": 0x3306, // -3307
    "Consumed energy this year": 0x3308, // -3309
    "Total consumed energy": 0x330a, // -330B
    "Generated energy today": 0x330c, // -330D
    "Generated energy this month": 0x330e, // -330F
    "Generated energy this year": 0x3310, // -3311
    "Total generated energy": 0x3312, // -3313
    "Carbon dioxide reduction": 0x3314, // -3315
    "Net battery current": 0x331b, // -331C
    "Battery temperature": 0x331d,
    "Ambient temperature": 0x331e,
};
