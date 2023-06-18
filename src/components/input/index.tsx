import { FC, InputHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./input.module.scss";

type TButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  variant: string;
};

export const Button: FC<TButtonProps> = ({ className, ...props }) => {
  return <input className={cn(className)} {...props} />;
};
