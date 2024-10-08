import { Fixture, DiscreteParameter, ContinuousParameter, FixturesData } from "./kaleidoscopeTypes";

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
//export const kaleidoscopeMockData_on = {"fixtures":{"klo_rgbw":{"programs":{"EXTERNAL":{"parameters":{}},"MANUAL":{"parameters":{"klo-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"klo-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"klo-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"klo-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":1}}},"noise":{"parameters":{"brightness":{"type":"discrete","levels":{"day":{"description":"hell"},"night":{"description":"dunkel"}},"current_level":"night"}}},"OFF":{"parameters":{}},"ON":{"parameters":{}}},"selected_program":"ON","output_aliases":["klo-r","klo-g","klo-w","klo-b"]},"spoider":{"programs":{"party":{"parameters":{"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":50,"current":0.8},"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":20,"current":1},"speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":5,"current":0.3}}},"OFF":{"parameters":{}},"EXTERNAL":{"parameters":{}},"noise":{"parameters":{"sides":{"type":"discrete","levels":{"inner":{"description":"nur innere"},"up":{"description":"nur nach oben"},"all":{"description":"alle"},"down":{"description":"nur nach unten"}},"current_level":"down"},"brightness":{"type":"discrete","levels":{"night":{"description":"dunkel"},"day":{"description":"hell"}},"current_level":"night"}}},"ON":{"parameters":{}},"strobo":{"parameters":{"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":100,"current":50},"sine_threshold":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.9},"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":20,"current":8}}},"MANUAL":{"parameters":{"spoider-outer-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-up-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-down-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-down-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-up-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-outer-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-up-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-up-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-down-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-down-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-outer-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-outer-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0}}},"bright":{"parameters":{}},"night_warm":{"parameters":{}}},"selected_program":"ON","output_aliases":["spoider-inner-down-b","spoider-inner-down-r","spoider-inner-down-g","spoider-outer-w","spoider-inner-up-b","spoider-inner-down-w","spoider-inner-up-r","spoider-outer-b","spoider-inner-up-g","spoider-outer-g","spoider-outer-r","spoider-inner-up-w"]},"blacklight":{"programs":{"OFF":{"parameters":{}},"ON":{"parameters":{}},"EXTERNAL":{"parameters":{}}},"selected_program":"ON","output_aliases":["uv-hauptraum"]},"lichterketten":{"programs":{"OFF":{"parameters":{}},"ON":{"parameters":{}},"MANUAL":{"parameters":{"outlet-2-s1":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"outlet-8-s2":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"outlet-8-s1":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"outlet-4-s1":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"outlet-2-s2":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0}}},"EXTERNAL":{"parameters":{}},"party":{"parameters":{"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":10,"current":1},"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":10,"current":0.7},"sine_threshold":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.5}}}},"selected_program":"ON","output_aliases":["outlet-8-s2","outlet-8-s1","outlet-2-s1","outlet-4-s1","outlet-2-s2"]},"front_door":{"programs":{"EXTERNAL":{"parameters":{}},"OFF":{"parameters":{}},"ON":{"parameters":{}}},"selected_program":"ON","output_aliases":["light-outside-front-door"]},"kitchen_spots":{"programs":{"EXTERNAL":{"parameters":{}},"ON":{"parameters":{}},"OFF":{"parameters":{}}},"selected_program":"ON","output_aliases":["kitchen-spots"]},"putzlicht":{"programs":{"ON":{"parameters":{}},"OFF":{"parameters":{}},"EXTERNAL":{"parameters":{}},"MANUAL":{"parameters":{"putzlicht-anbau":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"putzlicht-front":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0}}}},"selected_program":"ON","output_aliases":["putzlicht-anbau","putzlicht-front"]},"bedroom_light":{"programs":{"EXTERNAL":{"parameters":{}},"ON":{"parameters":{}},"OFF":{"parameters":{}}},"selected_program":"ON","output_aliases":["bedroom-light"]},"red_green_party_light":{"programs":{"ON":{"parameters":{}},"party":{"parameters":{"sine_threshold":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.5},"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":10,"current":1},"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":10,"current":1.2}}},"EXTERNAL":{"parameters":{}},"OFF":{"parameters":{}}},"selected_program":"ON","output_aliases":["red-green-party-light"]},"kitchen_rgbw":{"programs":{"MANUAL":{"parameters":{"kitchen-out-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-out-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-out-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-innen-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-innen-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-innen-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-out-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-innen-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0}}},"noise":{"parameters":{"rings":{"type":"discrete","levels":{"inner_outer":{"description":"sowohl inneres als auch Ã¤uÃeres"},"inner":{"description":"nur inneres"},"outer":{"description":"nur Ã¤uÃeres"}},"current_level":"inner_outer"},"brightness":{"type":"discrete","levels":{"night":{"description":"dunkel"},"day":{"description":"hell"}},"current_level":"day"}}},"OFF":{"parameters":{}},"strobo":{"parameters":{"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":20,"current":8},"sine_threshold":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.9},"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":100,"current":50}}},"EXTERNAL":{"parameters":{}},"ON":{"parameters":{}}},"selected_program":"ON","output_aliases":["kitchen-out-r","kitchen-out-b","kitchen-out-g","kitchen-out-w","kitchen-innen-w","kitchen-innen-g","kitchen-innen-r","kitchen-innen-b"]},"umluft":{"programs":{"daily":{"parameters":{}},"ON":{"parameters":{}},"OFF":{"parameters":{}},"EXTERNAL":{"parameters":{}}},"selected_program":"OFF","output_aliases":["circulation-fan"]}}};
//export const kaleidoscopeMockData_manual = {"fixtures":{"bedroom_light":{"programs":{"ON":{"parameters":{}},"EXTERNAL":{"parameters":{}},"OFF":{"parameters":{}}},"selected_program":"OFF","output_aliases":["bedroom-light"]},"spoider":{"programs":{"OFF":{"parameters":{}},"noise":{"parameters":{"sides":{"type":"discrete","levels":{"inner":{"description":"nur innere"},"up":{"description":"nur nach oben"},"all":{"description":"alle"},"down":{"description":"nur nach unten"}},"current_level":"down"},"brightness":{"type":"discrete","levels":{"day":{"description":"hell"},"night":{"description":"dunkel"}},"current_level":"night"}}},"strobo":{"parameters":{"sine_threshold":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.9},"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":100,"current":50},"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":20,"current":8}}},"night_warm":{"parameters":{}},"MANUAL":{"parameters":{"spoider-inner-down-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.7},"spoider-outer-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":1},"spoider-inner-down-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.5},"spoider-inner-down-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-up-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":1},"spoider-inner-down-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.2},"spoider-outer-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":1},"spoider-outer-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-outer-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"spoider-inner-up-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.7},"spoider-inner-up-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.2},"spoider-inner-up-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.3}}},"bright":{"parameters":{}},"ON":{"parameters":{}},"party":{"parameters":{"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":50,"current":0.8},"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":20,"current":1},"speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":5,"current":0.3}}},"EXTERNAL":{"parameters":{}}},"selected_program":"MANUAL","output_aliases":["spoider-outer-b","spoider-inner-down-b","spoider-inner-up-g","spoider-outer-r","spoider-inner-up-b","spoider-inner-down-g","spoider-inner-up-r","spoider-outer-g","spoider-inner-down-r","spoider-inner-down-w","spoider-outer-w","spoider-inner-up-w"]},"red_green_party_light":{"programs":{"party":{"parameters":{"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":10,"current":1.2},"sine_threshold":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.5},"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":10,"current":1}}},"OFF":{"parameters":{}},"ON":{"parameters":{}},"EXTERNAL":{"parameters":{}}},"selected_program":"party","output_aliases":["red-green-party-light"]},"putzlicht":{"programs":{"OFF":{"parameters":{}},"MANUAL":{"parameters":{"putzlicht-anbau":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":1},"putzlicht-front":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0}}},"ON":{"parameters":{}},"EXTERNAL":{"parameters":{}}},"selected_program":"MANUAL","output_aliases":["putzlicht-front","putzlicht-anbau"]},"kitchen_spots":{"programs":{"OFF":{"parameters":{}},"ON":{"parameters":{}},"EXTERNAL":{"parameters":{}}},"selected_program":"OFF","output_aliases":["kitchen-spots"]},"blacklight":{"programs":{"ON":{"parameters":{}},"OFF":{"parameters":{}},"EXTERNAL":{"parameters":{}}},"selected_program":"OFF","output_aliases":["uv-hauptraum"]},"lichterketten":{"programs":{"OFF":{"parameters":{}},"EXTERNAL":{"parameters":{}},"party":{"parameters":{"sine_threshold":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.5},"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":10,"current":0.7},"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":10,"current":1}}},"MANUAL":{"parameters":{"outlet-8-s1":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.3},"outlet-2-s2":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"outlet-2-s1":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.6},"outlet-8-s2":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"outlet-4-s1":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":1}}},"ON":{"parameters":{}}},"selected_program":"MANUAL","output_aliases":["outlet-8-s2","outlet-4-s1","outlet-2-s1","outlet-2-s2","outlet-8-s1"]},"kitchen_rgbw":{"programs":{"ON":{"parameters":{}},"MANUAL":{"parameters":{"kitchen-innen-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-out-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.3},"kitchen-innen-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"kitchen-out-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.3},"kitchen-innen-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.7},"kitchen-out-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.3},"kitchen-innen-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":1},"kitchen-out-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0}}},"OFF":{"parameters":{}},"strobo":{"parameters":{"sine_threshold":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.9},"sine_speed":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":100,"current":50},"sine_exponent":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":20,"current":8}}},"noise":{"parameters":{"rings":{"type":"discrete","levels":{"inner":{"description":"nur inneres"},"inner_outer":{"description":"sowohl inneres als auch Ã¤uÃeres"},"outer":{"description":"nur Ã¤uÃeres"}},"current_level":"inner_outer"},"brightness":{"type":"discrete","levels":{"day":{"description":"hell"},"night":{"description":"dunkel"}},"current_level":"day"}}},"EXTERNAL":{"parameters":{}}},"selected_program":"MANUAL","output_aliases":["kitchen-out-b","kitchen-innen-g","kitchen-innen-w","kitchen-innen-b","kitchen-out-r","kitchen-out-g","kitchen-out-w","kitchen-innen-r"]},"klo_rgbw":{"programs":{"ON":{"parameters":{}},"MANUAL":{"parameters":{"klo-r":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":1},"klo-w":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.5},"klo-g":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0},"klo-b":{"type":"continuous","lower_limit_incl":0,"upper_limit_incl":1,"current":0.4}}},"noise":{"parameters":{"brightness":{"type":"discrete","levels":{"night":{"description":"dunkel"},"day":{"description":"hell"}},"current_level":"night"}}},"OFF":{"parameters":{}},"EXTERNAL":{"parameters":{}}},"selected_program":"MANUAL","output_aliases":["klo-g","klo-r","klo-b","klo-w"]},"front_door":{"programs":{"ON":{"parameters":{}},"OFF":{"parameters":{}},"EXTERNAL":{"parameters":{}}},"selected_program":"OFF","output_aliases":["light-outside-front-door"]},"umluft":{"programs":{"OFF":{"parameters":{}},"daily":{"parameters":{}},"EXTERNAL":{"parameters":{}},"ON":{"parameters":{}}},"selected_program":"OFF","output_aliases":["circulation-fan"]}}};

export let kaleidoscopeMockData = kaleidoscopeMockData_off;

export function setProgram_mock(
    fixtureName: string,
    programName: string
) {
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