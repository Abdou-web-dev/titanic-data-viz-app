import { FunctionComponent } from "react";
import { Passenger } from "../types/types";

interface PassengerFilterProps {
  passengers: Passenger[];
  onFilterChange: (filteredData: Passenger[]) => void;
}

const PassengerFilter: FunctionComponent<PassengerFilterProps> = ({ passengers }) => {
  return <></>;
};

export default PassengerFilter;
