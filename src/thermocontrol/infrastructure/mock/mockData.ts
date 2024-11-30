import { TcSettableDataType } from "../../domain/entities/RestMessages";


const initialThermocontrolMockData = {
    "current_heating_mode": "heating",
    "data_age_humidity": 8,
    "data_age_temperature": 8,
    "emergency_heating_is_active": false,
    "extra_ventilation": 0,
    "max_heating_power": 0,
    "target_humidity": 77,
    "target_temperature": 22,
    "use_ventilation_for_cooling": true,
    "use_ventilation_for_heating": true
};

export let thermocontrolMockData = initialThermocontrolMockData;

export const changeThermocontrolMockData = (changeTo: TcSettableDataType) => {
    const newData = { ...thermocontrolMockData, ...changeTo };
    thermocontrolMockData = newData;
}

export const thermocontrolAuxMockData = {
    "dewpoint_inside":2.511972488151496,
    "dewpoint_outside":1.1499445553272707,
    "energy_consumption_24h":0,
    "energy_consumption_current":0,
    "gas_inside":138327.87755488596,
    "heat_capacity_basement":10,
    "heat_capacity_core":3,
    "heat_capacity_inside":1,
    "heat_conductance_basement_inside":0,
    "heat_conductance_core_basement":0,
    "heat_conductance_core_inside":0,
    "heat_conductance_ground-basement":0,
    "heat_conductance_ground_core":0,
    "heat_conductance_outside_core":0,
    "heat_conductance_outside_inside":0,
    "heating":0,"humidity_inside":66.91607636874603,
    "humidity_outside":92.21873113928132,
    "iaq_inside":3.1371307728063056,
    "iaq_inside_normalized":-0.34524597633461224,
    "max_heating_power":0,
    "pressure_difference_inside-outside":9.133507969760103,
    "pressure_inside":100948.57300321416,
    "pressure_outside":100939.4394952444,
    "pressure_ventilation":100930.84114583333,
    "residual_power_basement":-20,
    "residual_power_core":-20,
    "residual_power_inside":-20,
    "target_humidity":75,
    "target_temperature":18,
    "temperature_basement":9.985395513317838,
    "temperature_basement_normalized":-0.8989483923359627,
    "temperature_basement_rate":-0.05247944168113932,
    "temperature_core":8.636069855320459,
    "temperature_core_normalized":-1.0495464298938748,
    "temperature_core_rate":-0.05289891439912884,
    "temperature_ground":-20,
    "temperature_ground_normalized":-20,
    "temperature_inside":8.292584853340534,
    "temperature_inside_min":7.400333238109632,
    "temperature_inside_normalized":-1.1011001112920595,
    "temperature_inside_rate":-0.052626057271858505,
    "temperature_inside_spread":1.778035065910248,
    "temperature_outside":2.281285763907153,"temperature_outside_normalized":-1.1092562924738045,"umluft_is_active":false,"umluft_percentage_24h":7.527777777777778,"uptime_seconds":2955477,"ventin":0,"ventout":0,"water_density_basement":7.561964794330529,"water_density_inside":5.880461167629598,
    "water_density_outside":5.229179354098387};