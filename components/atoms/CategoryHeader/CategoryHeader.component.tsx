import styles from "./CategoryHeader.module.css";

interface CategoryHeaderProps {
  title: string;
}

export const CategoryHeader = ({ title }: CategoryHeaderProps): JSX.Element => {
  return (
    <header className={styles.categoryHeader}>
      <h2 className={styles.categoryHeaderTitle}>{title}</h2>
    </header>
  );
};
