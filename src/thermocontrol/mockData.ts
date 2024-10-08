import { ThermocontrolSettableDataType } from "./thermocontrolREST";

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

export const changeThermocontrolMockData = (changeTo: ThermocontrolSettableDataType) => {
    const newData = { ...thermocontrolMockData, ...changeTo };
    thermocontrolMockData = newData;
}

export const thermocontrolAuxMockData = {
    "dewpoint_inside": 12.956453194516229,
    "dewpoint_outside": 13.960119261755505,
    "energy_consumption_24h": 4.327333333333614,
    "energy_consumption_current": 0.26,
    "gas_inside": 92778.17983975378,
    "heat_capacity_basement": 10.0,
    "heat_capacity_core": 3.0,
    "heat_capacity_inside": 1.0,
    "heat_conductance_basement_inside": 0.0,
    "heat_conductance_core_basement": 0.0,
    "heat_conductance_core_inside": 0.0,
    "heat_conductance_ground-basement": 0.0,
    "heat_conductance_ground_core": 0.0,
    "heat_conductance_outside_core": 0.0,
    "heat_conductance_outside_inside": 0.0,
    "heating": 16.666666666666668,
    "humidity_inside": 64.44675569805516,
    "humidity_outside": 93.03925918981572,
    "max_heating_power": 1.0,
    "pressure_difference_inside-outside": 18.352685604273574,
    "pressure_inside": 100583.92388841078,
    "pressure_outside": 100565.5712028065,
    "pressure_ventilation": 100574.69574652778,
    "residual_power_basement": -20.0,
    "residual_power_core": -20.0,
    "residual_power_inside": -20.0,
    "target_humidity": 55.0,
    "target_temperature": 20.0,
    "temperature_basement": 17.463020080080042,
    "temperature_basement_rate": -3.316660529618982e-14,
    "temperature_core": 19.89421021649983,
    "temperature_core_rate": -0.0010123269447094426,
    "temperature_ground": 15.872567576334811,
    "temperature_inside": 19.895961543356073,
    "temperature_inside_min": 18.999999999999996,
    "temperature_inside_rate": -0.02247306242235378,
    "temperature_inside_spread": 2.0136003853833593,
    "temperature_outside": 15.12396367271902,
    "umluft_is_active": false,
    "umluft_percentage_24h": 5.722222222222222,
    "uptime_seconds": 916274,
    "ventin": 16.666666666666668,
    "ventout": 0.0,
    "water_density_basement": 14.916782077420478,
    "water_density_inside": 11.66261782308441,
    "water_density_outside": 12.306232906620851
};