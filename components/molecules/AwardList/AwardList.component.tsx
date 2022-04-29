import { useVoteContext } from "../../../store/useVoteContext";
import { Button } from "../../atoms/Button";
import { Category } from "../Category";
import styles from "./AwardList.module.css";

interface AwardListProps {
  showModal: () => void;
}

export const AwardList = ({ showModal }: AwardListProps): JSX.Element => {
  const { error, items, loading } = useVoteContext();

  if (error) {
    return <h2>{error}</h2>;
  }

  if (loading) {
    return <h2>Loading Movie Choices</h2>;
  }

  return (
    <div className={styles.awardList}>
      {items?.map((item) => (
        <Category key={item.id} item={item} />
      ))}

      <div className={styles.submitButton}>
        <Button type="secondary" onClick={showModal} size="large">
          Submit Votes
        </Button>
      </div>
    </div>
  );
};
