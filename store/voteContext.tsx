import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { useMoviesBallot } from "../hooks/useMoviesBallot";

type VoteState = Record<string, string>;

export interface VoteContextState {
  error: string | null;
  items: Category[] | undefined;
  loading: boolean;
  votes: VoteState | undefined;
  setVotes: Dispatch<SetStateAction<VoteState | undefined>>;
}

export interface VoteProviderProps {
  children: React.ReactNode;
}

export const VoteContext = createContext({} as VoteContextState);

export const VoteProvider = ({ children }: VoteProviderProps): JSX.Element => {
  const { data, error, loading } = useMoviesBallot();
  const [votes, setVotes] = useState(
    data?.items?.reduce((acc: VoteState, next: Category) => {
      acc[next.id] = "";
      return acc;
    }, {})
  );

  const contextState = useMemo(
    () => ({
      error,
      items: data?.items,
      loading,
      votes,
      setVotes,
    }),
    [data?.items, votes, setVotes, loading]
  );

  return (
    <VoteContext.Provider value={contextState}>{children}</VoteContext.Provider>
  );
};
