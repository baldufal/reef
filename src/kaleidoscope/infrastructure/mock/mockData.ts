import { kalLogger } from "../../../logging";
import { ContinuousParameter, DiscreteParameter, FixturesData } from "../../domain/RestTypes";

const kaleidoscopeMockData_off = {
    "fixtures": {
        "spoider": {
            "programs": {
                "night_warm": {
                    "parameters": {}
                },
                "OFF": {
                    "parameters": {}
                },
                "bright": {
                    "parameters": {}
                },
                "MANUAL": {
                    "parameters": {
                        "spoider-outer-w": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-inner-up-r": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-inner-up-b": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-outer-g": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-outer-b": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-inner-up-w": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-inner-up-g": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-inner-down-r": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-inner-down-b": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-inner-down-g": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-outer-r": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "spoider-inner-down-w": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        }
                    }
                },
                "EXTERNAL": {
                    "parameters": {}
                },
                "party": {
                    "parameters": {
                        "sine_speed": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 50,
                            "current": 0.8
                        },
                        "speed": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 5,
                            "current": 0.3
                        },
                        "sine_exponent": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 20,
                            "current": 1
                        }
                    }
                },
                "ON": {
                    "parameters": {}
                },
                "noise": {
                    "parameters": {
                        "sides": {
                            "type": "discrete",
                            "levels": {
                                "up": {
                                    "description": "nur nach oben"
                                },
                                "down": {
                                    "description": "nur nach unten"
                                },
                                "all": {
                                    "description": "alle"
                                },
                                "inner": {
                                    "description": "nur innere"
                                }
                            },
                            "current_level": "down"
                        },
                        "brightness": {
                            "type": "discrete",
                            "levels": {
                                "night": {
                                    "description": "dunkel"
                                },
                                "day": {
                                    "description": "hell"
                                }
                            },
                            "current_level": "night"
                        }
                    }
                },
                "strobo": {
                    "parameters": {
                        "sine_speed": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 100,
                            "current": 50
                        },
                        "sine_threshold": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0.9
                        },
                        "sine_exponent": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 20,
                            "current": 8
                        }
                    }
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["spoider-inner-down-r", "spoider-outer-r", "spoider-inner-down-g", "spoider-inner-up-g", "spoider-inner-up-b", "spoider-inner-down-b", "spoider-inner-down-w", "spoider-outer-b", "spoider-inner-up-r", "spoider-outer-g", "spoider-outer-w", "spoider-inner-up-w"]
        },
        "klo_rgbw": {
            "programs": {
                "ON": {
                    "parameters": {}
                },
                "MANUAL": {
                    "parameters": {
                        "klo-r": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 1
                        },
                        "klo-g": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "klo-b": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "klo-w": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        }
                    }
                },
                "OFF": {
                    "parameters": {}
                },
                "EXTERNAL": {
                    "parameters": {}
                },
                "noise": {
                    "parameters": {
                        "brightness": {
                            "type": "discrete",
                            "levels": {
                                "night": {
                                    "description": "dunkel"
                                },
                                "day": {
                                    "description": "hell"
                                }
                            },
                            "current_level": "night"
                        }
                    }
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["klo-w", "klo-b", "klo-r", "klo-g"]
        },
        "putzlicht": {
            "programs": {
                "EXTERNAL": {
                    "parameters": {}
                },
                "ON": {
                    "parameters": {}
                },
                "MANUAL": {
                    "parameters": {
                        "putzlicht-front": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "putzlicht-anbau": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        }
                    }
                },
                "OFF": {
                    "parameters": {}
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["putzlicht-front", "putzlicht-anbau"]
        },
        "bedroom_light": {
            "programs": {
                "OFF": {
                    "parameters": {}
                },
                "ON": {
                    "parameters": {}
                },
                "EXTERNAL": {
                    "parameters": {}
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["bedroom-light"]
        },
        "lichterketten": {
            "programs": {
                "MANUAL": {
                    "parameters": {
                        "outlet-2-s1": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "outlet-8-s2": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "outlet-2-s2": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "outlet-4-s1": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "outlet-8-s1": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        }
                    }
                },
                "EXTERNAL": {
                    "parameters": {}
                },
                "party": {
                    "parameters": {
                        "sine_threshold": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0.5
                        },
                        "sine_exponent": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 10,
                            "current": 1
                        },
                        "sine_speed": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 10,
                            "current": 0.7
                        }
                    }
                },
                "OFF": {
                    "parameters": {}
                },
                "ON": {
                    "parameters": {}
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["outlet-8-s1", "outlet-8-s2", "outlet-2-s1", "outlet-4-s1", "outlet-2-s2"]
        },
        "umluft": {
            "programs": {
                "OFF": {
                    "parameters": {}
                },
                "ON": {
                    "parameters": {}
                },
                "EXTERNAL": {
                    "parameters": {}
                },
                "daily": {
                    "parameters": {}
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["circulation-fan"]
        },
        "blacklight": {
            "programs": {
                "OFF": {
                    "parameters": {}
                },
                "ON": {
                    "parameters": {}
                },
                "EXTERNAL": {
                    "parameters": {}
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["uv-hauptraum"]
        },
        "red_green_party_light": {
            "programs": {
                "party": {
                    "parameters": {
                        "sine_exponent": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 10,
                            "current": 1
                        },
                        "sine_speed": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 10,
                            "current": 1.2
                        },
                        "sine_threshold": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0.5
                        }
                    }
                },
                "OFF": {
                    "parameters": {}
                },
                "EXTERNAL": {
                    "parameters": {}
                },
                "ON": {
                    "parameters": {}
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["red-green-party-light"]
        },
        "kitchen_spots": {
            "programs": {
                "ON": {
                    "parameters": {}
                },
                "OFF": {
                    "parameters": {}
                },
                "EXTERNAL": {
                    "parameters": {}
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["kitchen-spots"]
        },
        "front_door": {
            "programs": {
                "EXTERNAL": {
                    "parameters": {}
                },
                "ON": {
                    "parameters": {}
                },
                "OFF": {
                    "parameters": {}
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["light-outside-front-door"]
        },
        "kitchen_rgbw": {
            "programs": {
                "ON": {
                    "parameters": {}
                },
                "EXTERNAL": {
                    "parameters": {}
                },
                "noise": {
                    "parameters": {
                        "rings": {
                            "type": "discrete",
                            "levels": {
                                "outer": {
                                    "description": "nur Ã¤uÃeres"
                                },
                                "inner": {
                                    "description": "nur inneres"
                                },
                                "inner_outer": {
                                    "description": "sowohl inneres als auch Ã¤uÃeres"
                                }
                            },
                            "current_level": "inner_outer"
                        },
                        "brightness": {
                            "type": "discrete",
                            "levels": {
                                "night": {
                                    "description": "dunkel"
                                },
                                "day": {
                                    "description": "hell"
                                }
                            },
                            "current_level": "day"
                        }
                    }
                },
                "strobo": {
                    "parameters": {
                        "sine_threshold": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0.9
                        },
                        "sine_speed": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 100,
                            "current": 50
                        },
                        "sine_exponent": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 20,
                            "current": 8
                        }
                    }
                },
                "OFF": {
                    "parameters": {}
                },
                "MANUAL": {
                    "parameters": {
                        "kitchen-innen-r": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "kitchen-out-g": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "kitchen-innen-b": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "kitchen-out-w": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "kitchen-out-b": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "kitchen-innen-g": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "kitchen-innen-w": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        },
                        "kitchen-out-r": {
                            "type": "continuous",
                            "lower_limit_incl": 0,
                            "upper_limit_incl": 1,
                            "current": 0
                        }
                    }
                }
            },
            "selected_program": "OFF",
            "output_aliases": ["kitchen-innen-r", "kitchen-innen-w", "kitchen-out-w", "kitchen-out-b", "kitchen-out-g", "kitchen-innen-g", "kitchen-innen-b", "kitchen-out-r"]
        }
    }
} as FixturesData;

export let kaleidoscopeMockData = kaleidoscopeMockData_off;

export function setProgram_mock(
    fixtureName: string,
    programName: string
) {
    kalLogger.info(`Setting program in mock data: ${fixtureName} -> ${programName}`);
    kaleidoscopeMockData = {
        ...kaleidoscopeMockData,
        fixtures: {
            ...kaleidoscopeMockData.fixtures,
            [fixtureName]: {
                ...kaleidoscopeMockData.fixtures[fixtureName],
                selected_program: programName,
            },
        },
    };
}


export function setDiscreteParameter_mock(
    fixtureName: string,
    programName: string,
    parameterName: string,
    value: string
) {
    kalLogger.info(`Setting discrete parameter in mock data: ${fixtureName} -> ${programName} -> ${parameterName} -> ${value}`);
    kaleidoscopeMockData = {
        ...kaleidoscopeMockData,
        fixtures: {
            ...kaleidoscopeMockData.fixtures,
            [fixtureName]: {
                ...kaleidoscopeMockData.fixtures[fixtureName],
                programs: {
                    ...kaleidoscopeMockData.fixtures[fixtureName].programs,
                    [programName]: {
                        ...kaleidoscopeMockData.fixtures[fixtureName].programs[programName],
                        parameters: {
                            ...kaleidoscopeMockData.fixtures[fixtureName].programs[programName].parameters,
                            [parameterName]: {
                                ...kaleidoscopeMockData.fixtures[fixtureName].programs[programName].parameters[parameterName],
                                type: "discrete",
                                current_level: value,
                            } as DiscreteParameter,
                        },
                    },
                },
            },
        },
    };
}



export function setContinuousParameter_mock(
    fixtureName: string,
    programName: string,
    parameterName: string,
    value: number
) {
    kalLogger.info(`Setting continuous parameter in mock data: ${fixtureName} -> ${programName} -> ${parameterName} -> ${value}`);
    kaleidoscopeMockData = {
        ...kaleidoscopeMockData,
        fixtures: {
            ...kaleidoscopeMockData.fixtures,
            [fixtureName]: {
                // @ts-ignore
                ...kaleidoscopeMockData.fixtures[fixtureName],
                programs: {
                    // @ts-ignore
                    ...kaleidoscopeMockData.fixtures[fixtureName].programs,
                    [programName]: {
                        // @ts-ignore
                        ...kaleidoscopeMockData.fixtures[fixtureName].programs[programName],
                        parameters: {
                            // @ts-ignore
                            ...kaleidoscopeMockData.fixtures[fixtureName].programs[programName].parameters,
                            [parameterName]: {
                                // @ts-ignore
                                ...kaleidoscopeMockData.fixtures[fixtureName].programs[programName].parameters[parameterName],
                                type: "continuous",
                                current: value
                            } as ContinuousParameter,
                        },
                    },
                },
            },
        },
    };
}