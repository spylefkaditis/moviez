import styles from "./Button.module.css";
import cn from "classnames";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "primary" | "secondary";
  size?: "large" | "small";
}

export const Button = ({
  onClick,
  children,
  type = "primary",
  size = "small",
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={cn(styles.button, {
        [styles.buttonPrimary]: type === "primary",
        [styles.buttonSecondary]: type === "secondary",
        [styles.buttonLarge]: size === "large",
      })}
      onClick={onClick}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};
