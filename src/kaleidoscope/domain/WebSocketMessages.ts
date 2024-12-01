import { z } from 'zod';

export const KSetSchema = z.object({
    token: z.string(),
    action: z.enum(["program", "discrete", "continuous"]),
    fixture: z.string(),
    data: z.any(),
});

export const KSetProgramSchema = z.object({
    programName: z.string()
});

export const KSetDiscreteSchema = z.object({
    programName: z.string(),
    parameterName: z.string(),
    value: z.string(),
});

export const KSetContinuousSchema = z.object({
    programName: z.string(),
    parameterName: z.string(),
    value: z.number(),
});

export type KaleidoscopeCommand = {
    action: "program",
    fixture: string,
    programName: string
} | {
    action: "discrete",
    fixture: string,
    programName: string,
    parameterName: string,
    value: string
} | {
    action: "continuous",
    fixture: string,
    programName: string,
    parameterName: string,
    value: number
};

export type KaleidoscopeMessage = {
    messageType: "update";
    health: "good" | "error";
    data: any;
} | {
    // tokenError hints at an expired or invalid token and should be handled by the UI by logging out the user
    messageType: "error" | "tokenError";
    // should be set if message type is error or tokenError. It is a human-readable error message
    error: string;
};