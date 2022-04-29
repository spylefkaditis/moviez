import { useEffect, useState } from "react";

const endpoint = "http://localhost:3000/api/ballots";

interface useMoviesBallotReturnType {
  error: string | null;
  data: BallotType | null;
  loading: boolean;
}

export const useMoviesBallot = (): useMoviesBallotReturnType => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const json = await response.json();
          setData(json);
          setError(null);
        } else {
          throw new Error(
            "Something went wrong. These are not the droids you are looking for."
          );
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return {
    data,
    error,
    loading,
  };
};
