import { useContext } from "react";
import { VoteContext } from "./voteContext";

export const useVoteContext = () => useContext(VoteContext);
