import WebSocket from 'ws';
import { sendData } from './thermocontrolREST';
import { z } from 'zod';
import { config } from '../config';

// Define the schema for the fields
const TCSetSchema = z.object({
    extra_ventilation: z.number().optional(),
    max_heating_power: z.number().optional(),
    target_humidity: z.number().optional(),
    target_temperature: z.number().optional(),
    use_ventilation_for_cooling: z.boolean().optional(),
    use_ventilation_for_heating: z.boolean().optional(),
});

export const handleTCSetConnection = (ws: WebSocket) => {
    console.log('Connected to /thermocontrol/set');

    ws.on('message', async (message: string) => {
        console.log(`Received message on /thermocontrol/set: ${message}`);
    
        try {
            const messageJSON = JSON.parse(message);
            const result = TCSetSchema.safeParse(messageJSON);
            if (!result.success) {
                console.error('Invalid message format:', result.error);
                return;
            }
    
            if(config.thermocontrol_mock)
                return;
            
            try {
                await sendData(result.data);
            } catch (error) {
                console.error('Error sending data:', error);
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    });
    

    ws.on('close', () => {
        console.log('Connection closed for /thermocontrol/set');
    });
};