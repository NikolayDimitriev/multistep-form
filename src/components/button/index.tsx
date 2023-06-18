import { FC, ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./button.module.scss";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "fulfilled" | "outlined";
};

export const Button: FC<TButtonProps> = ({
  className,
  onClick,
  variant,
  ...props
}) => {
  return (
    <button
      className={cn(className, {
        [styles.fulfilled]: variant === "fulfilled",
        [styles.outlined]: variant === "outlined",
      })}
      onClick={onClick}
      {...props}
    />
  );
};
