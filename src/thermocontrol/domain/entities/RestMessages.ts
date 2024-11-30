export interface TcSettableDataType {
    extra_ventilation?: number;
    max_heating_power?: number;
    target_humidity?: number;
    target_temperature?: number;
    use_ventilation_for_cooling?: boolean;
    use_ventilation_for_heating?: boolean;
}

export interface TcDataType extends TcSettableDataType {
    extra_ventilation: number;
    max_heating_power: number;
    target_humidity: number;
    target_temperature: number;
    use_ventilation_for_cooling: boolean;
    use_ventilation_for_heating: boolean;
    
    emergency_heating_is_active: boolean;
    data_age_humidity: number;
    data_age_temperature: number;
}