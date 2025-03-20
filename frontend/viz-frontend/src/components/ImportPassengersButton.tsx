import { useState } from "react";
import { triggerImport } from "../services/api";

interface ImportPassengersButtonProps {
  refetchPassengers: () => void; // Accept refetchPassengers function as a prop
}

const ImportPassengersButton = ({ refetchPassengers }: ImportPassengersButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    try {
      await triggerImport(); // Trigger the import
      await refetchPassengers(); // Refetch passengers after import
    } catch (error) {
      console.error("Error importing passengers:", error);
    }
    setLoading(false);
  };
  return (
    <button
      onClick={handleImport}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 cursor-pointer hover:bg-blue-600"
    >
      {loading ? "Importing..." : "Trigger Import"}
    </button>
  );
};

export default ImportPassengersButton;
