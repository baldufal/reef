import axios from 'axios';
import { config } from '../config';


export const setProgram = async (fixture: string, program: string) => {
    try {
        //console.log(`Setting fixture ${fixture} to ${program}`)
        await axios.post(`${config.kaleidoscope_url}/api/v1/fixtures/${fixture}/set_active_program`, program, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
        return null;
    } catch (error) {
        return "error";
    }
};

export const setDiscreteParameter = async (fixture: string, program: string, parameter: string, value: string) => {

    const payload = JSON.stringify({ type: "discrete", level: value })
    const url = `${config.kaleidoscope_url}/api/v1/fixtures/${fixture}/programs/${program}/parameters/${parameter}`;
    console.log(`Sending ${payload} to ${url}`)

    try {
        await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return null;
    } catch (error) {
        return "error";
    }
};

export const setContinuousParameter = async (fixture: string, program: string, parameter: string, value: number) => {

    const payload = JSON.stringify({ type: "continuous", value: value })
    const url = `${config.kaleidoscope_url}/api/v1/fixtures/${fixture}/programs/${program}/parameters/${parameter}`;
    console.log(`Sending ${payload} to ${url}`)

    try {
        await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return null;
    } catch (error) {
        return "error";
    }
};