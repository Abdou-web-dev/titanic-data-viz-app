import { useState, useEffect } from "react";
import { getPassengers } from "../services/api";
import { Passenger } from "../types/types";

export const usePassengers = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPassengers = async () => {
    try {
      setLoading(true);
      const passengersData = await getPassengers();

      setPassengers(passengersData);
    } catch (err) {
      console.error("Error fetching passengers:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Refetch the passengers when needed (like after import)
  const refetchPassengers = async () => {
    await fetchPassengers();
  };

  useEffect(() => {
    fetchPassengers(); // Fetch passengers on initial load
  }, []);

  return { passengers, loading, error, refetchPassengers };
};
