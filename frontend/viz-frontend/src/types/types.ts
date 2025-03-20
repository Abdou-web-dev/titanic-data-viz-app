export interface Passenger {
  id: number;
  name: string;
  age?: number; // Optional if some passengers have missing age data
  gender: "male" | "female";
  ticket: string;
  embarked: "S" | "C" | "Q"; // Southampton, Cherbourg, Queenstown
  cabin?: string; // Optional, since some data might not have cabin info
  fare: number;
  survived: boolean;
  pclass: 1 | 2 | 3; // Passenger class
}
