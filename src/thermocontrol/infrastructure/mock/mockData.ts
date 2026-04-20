import { tcLogger } from "../../../logging";
import { TcSettableDataType } from "../../domain/entities/RestMessages";


const initialThermocontrolMockData = {
    "current_heating_mode": "heating",
    "data_age_humidity": 1,
    "data_age_temperature": 1,
    "emergency_heating_is_active": false,
    "extra_ventilation": 0.0,
    "heizstrahler_is_active": false,
    "max_heating_power": 1.0,
    "target_humidity": 65.0,
    "target_temperature": 19.0,
    "umluft_is_active": 1,
    "use_ventilation_for_cooling": false,
    "use_ventilation_for_heating": false
};

export let thermocontrolMockData = initialThermocontrolMockData;

export const changeThermocontrolMockData = (changeTo: TcSettableDataType) => {
    tcLogger.info(`Changing thermocontrolMockData to: ${JSON.stringify(changeTo)}`);
    const newData = { ...thermocontrolMockData, ...changeTo };
    thermocontrolMockData = newData;
}

export const thermocontrolAuxMockData = {
    "current_heating_power_W": 0.0,
    "current_ventin": 2.9650650293095957E-43,
    "current_ventout": 0.0,
    "delay_outside_inside_hours": 0.0,
    "dewpoint_inside": 7.1908901810584931,
    "dewpoint_outside": 0.6923111351830038,
    "electric_net_power": 21.768,
    "energy_consumption_24h": 0.20380392156862809,
    "energy_consumption_current_W": 0.0,
    "gas_inside": 270067.3008200581,
    "heating": 0.0,
    "humidity_inside": 53.845327870241427,
    "humidity_outside": 61.968044070700557,
    "iaq_inside": -0.094418429435321569,
    "iaq_inside_normalized": -0.73453174384783926,
    "max_heating_power": 0.0,
    "pressure_difference_inside-outside": 18.244558008373133,
    "pressure_inside": 100305.43780905257,
    "pressure_outside": 100287.1932510442,
    "pressure_ventilation": 100332.28211805556,
    "solar_battery_soc": 66.333333333333329,
    "solar_power_inverter": 202.0,
    "solar_power_pv": 0.0,
    "target_humidity": 85.0,
    "target_temperature": 25.0,
    "temperature_basement": -101.0,
    "temperature_basement_normalized": -101.0,
    "temperature_basement_rate": 1.5064512584703737E-13,
    "temperature_core": 16.551169732753522,
    "temperature_core_2": 18.322072089910964,
    "temperature_core_normalized": -0.13483865614599863,
    "temperature_core_rate": -0.059506216125583856,
    "temperature_ground": 11.619669324450651,
    "temperature_ground_normalized": -0.12694851437649241,
    "temperature_inside": 16.581198507369248,
    "temperature_inside_min": 14.750000000000007,
    "temperature_inside_normalized": -0.031950692837928826,
    "temperature_inside_rate": -0.077843625130630464,
    "temperature_inside_spread": 3.4194763025923365,
    "temperature_outside": 7.5039320995359962,
    "temperature_outside_normalized": -0.44771507854036496,
    "temperature_ruecklauf": 13.534465951192582,
    "temperature_vorlauf": 13.3,
    "total_power_loss_inside_W": -0.44568677251024308,
    "umluft_is_active": false,
    "umluft_percentage_24h": 5.5711873944850874,
    "uptime_seconds": 17773,
    "ventin": 0.0,
    "ventout": 0.0,
    "water_density_basement": -101.0,
    "water_density_inside": 7.9157297992795748,
    "water_density_outside": 5.501874814787107
};