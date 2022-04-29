import { CategoryHeader } from "../../atoms/CategoryHeader";
import { NomineeCard } from "../../atoms/NomineeCard";
import styles from "./Category.module.css";

interface CategoryProps {
  item: Category;
}

export const Category = ({ item }: CategoryProps): JSX.Element => {
  const { title, items: nominees } = item;
  return (
    <section key={item.id} className={styles.category}>
      <CategoryHeader title={title} />
      <ul className={styles.nomineeList}>
        {nominees.map((nominee) => {
          return (
            <NomineeCard
              key={nominee.id}
              category={item.id}
              id={nominee.id}
              name={nominee.title}
              url={nominee.photoUrL}
            />
          );
        })}
      </ul>
    </section>
  );
};
