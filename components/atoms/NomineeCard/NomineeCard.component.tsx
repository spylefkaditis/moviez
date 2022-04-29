import cn from "classnames";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useVoteContext } from "../../../store/useVoteContext";
import { Button } from "../Button";
import styles from "./NomineeCard.module.css";

interface NomineeCardProps {
  id: string;
  category: string;
  name: string;
  url: string;
}

export const NomineeCard = ({
  id,
  category,
  name,
  url,
}: NomineeCardProps): JSX.Element => {
  const { votes, setVotes } = useVoteContext();

  const onClickHandler = useCallback(() => {
    setVotes((s) => ({ ...s, [category]: id }));
  }, [category, id, setVotes]);

  const isSelected = useMemo(() => {
    if (votes) {
      return votes[category] === id;
    }
    return false;
  }, [category, id, votes]);

  return (
    <article
      className={cn(styles.nomineeCard, {
        [styles.nomineeCardActive]: isSelected,
      })}
    >
      <h2 className={styles.nomineeCardTitle}>{name}</h2>
      <figure className={styles.nomineeCardImageWrapper}>
        <Image
          src={url}
          alt={`An image of ${name}`}
          layout="fill"
          objectFit="cover"
        />
      </figure>
      <Button onClick={onClickHandler} type="primary">
        Select
      </Button>
    </article>
  );
};
