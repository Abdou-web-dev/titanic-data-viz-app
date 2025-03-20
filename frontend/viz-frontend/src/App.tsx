import { useEffect, useState } from "react";
import { usePassengers } from "./hooks/usePassengers";
import PassengerTable from "./components/PassengerTable";
import PassengerGraph from "./components/PassengerGraph";
import PassengerFilter from "./components/PassengerFilter";
import ImportPassengersButton from "./components/ImportPassengersButton.tsx";
import { NiceSpinner } from "./components/NiceSpinner.tsx";
import "./App.css";

function App() {
  const { passengers: fetchedPassengers = [], loading, refetchPassengers } = usePassengers(); // Default passengers to an empty array if undefined
  const [passengers, setPassengers] = useState(fetchedPassengers); // Local state for passengers
  const [filteredPassengers, setFilteredPassengers] = useState(passengers);
  const [clearData, setClearData] = useState(false); // State to control when to clear the data

  // Update filtered passengers based on selected criteria
  const handleFilterChange = (filteredData: typeof passengers) => {
    setFilteredPassengers(filteredData);
  };

  // Handle clearing passengers data
  const handleClearData = () => {
    setPassengers([]); // Clear passengers data from the state
    setClearData(true); // Set clearData to true
  };

  useEffect(() => {
    if (clearData) {
      // After clearing, reset filtered data as well
      setFilteredPassengers([]);
      setClearData(false); // Reset clearData state after clearing the data
    }
  }, [clearData]);

  useEffect(() => {
    // Update filtered passengers when the fetched passengers change
    setPassengers(fetchedPassengers);
    setFilteredPassengers(fetchedPassengers);
  }, [fetchedPassengers]);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6 font-raleway font-medium">
      <h1 className="text-3xl font-bold mb-6">Titanic Passenger Data</h1>

      {loading ? (
        <NiceSpinner />
      ) : passengers.length ? (
        <>
          {/* Render Clear Data button only if passengers exist */}
          <button
            onClick={handleClearData}
            className="bg-red-500 text-white px-4 py-2 rounded my-4 cursor-pointer hover:bg-red-600"
          >
            Clear Data
          </button>

          <PassengerFilter
            passengers={passengers}
            onFilterChange={handleFilterChange}
          />
          <PassengerTable passengers={passengers} />
          <PassengerGraph passengers={filteredPassengers} />
        </>
      ) : (
        <div className="text-center">
          {/* Render message when there are no passengers */}
          <p className="mb-4">No passenger data available.</p>

          {/* Show ImportPassengersButton only when no passengers */}
          <ImportPassengersButton refetchPassengers={refetchPassengers} />
        </div>
      )}
    </div>
  );
}

export default App;
