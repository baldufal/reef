import { TcDataType as TcData } from "./RestMessages";
import { z } from "zod";

export type TcMessage = {
  messageType: "update";
  data: TcUpdates;
} |
{
  messageType: "error" | "tokenError";
  error: string;
};

export type TcAuxData = {
  [key: string]: number | boolean | string;
};

export type TcUpdates = {
  type: "tc";
  stale: boolean;
  data: TcData;
} |
{
  type: "tc_aux",
  stale: boolean,
  data_aux: TcAuxData
};

export const TCMessage = z.object({
  token: z.string(),
  data: z.any()
});

export const TCSetSchema = z.object({
  extra_ventilation: z.number().optional(),
  max_heating_power: z.number().optional(),
  target_humidity: z.number().optional(),
  target_temperature: z.number().optional(),
  use_ventilation_for_cooling: z.boolean().optional(),
  use_ventilation_for_heating: z.boolean().optional(),
  heizstrahler_is_active: z.boolean().optional(),
});
