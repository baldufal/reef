// Continuous parameter type
export interface ContinuousParameter {
    type: "continuous";
    lower_limit_incl: number;
    upper_limit_incl: number;
    current: number;
  }
  
  // Discrete parameter level type
  export interface DiscreteParameterLevel {
    description: string;
  }
  
  // Discrete parameter type
  export interface DiscreteParameter {
    type: "discrete";
    levels: {
      [key: string]: DiscreteParameterLevel;
    };
    current_level: string;
  }
  
  // Union type for all parameter types
  export type Parameter = ContinuousParameter | DiscreteParameter;
  
  export interface Program {
    parameters: {
      [key: string]: Parameter;  // Add an index signature to allow string indexing
    };
  }
  
  export interface Fixture {
    programs: {
      [key: string]: Program;  // Add an index signature to allow string indexing
    };
    selected_program: string;
    output_aliases: string[];
  }
  
  export interface FixturesData {
    fixtures: {
      [key: string]: Fixture;  // Add an index signature to allow string indexing
    };
}