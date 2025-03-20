import { FunctionComponent } from "react";
import { Passenger } from "../types/types";

interface PassengerTableProps {
  passengers: Passenger[];
}

const PassengerTable: FunctionComponent<PassengerTableProps> = ({ passengers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Survived</th>
            <th className="px-4 py-2 border">Pclass</th>
            <th className="px-4 py-2 border">Age</th>
            <th className="px-4 py-2 border">Fare</th>
            <th className="px-4 py-2 border">Embarked</th>
            <th className="px-4 py-2 border">Ticket</th>
          </tr>
        </thead>
        <tbody>
          {passengers?.map((passenger: Passenger) => (
            <tr
              key={passenger.id}
              className="border-b hover:bg-[rgba(225,170,155,0.15)]"
              // hover:bg-[rgba(208,126,104,0.956)]
            >
              <td className="px-4 py-2">{passenger.id}</td>

              <td className="px-4 py-2">{passenger.name}</td>
              <td className="px-4 py-2">{passenger.survived ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{passenger.pclass}</td>
              <td className="px-4 py-2">{passenger.age}</td>
              <td className="px-4 py-2">{passenger.fare}</td>
              <td className="px-4 py-2">{passenger.embarked}</td>
              <td className="px-4 py-2">{passenger.ticket}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassengerTable;
