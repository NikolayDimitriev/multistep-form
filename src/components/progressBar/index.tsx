import cn from "classnames";

import styles from "./progressBar.module.scss";

type TProgressBarProps = {
  step: number;
};

export const ProgressBar = ({ step }: TProgressBarProps) => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.lines}>
        <div
          className={cn(styles.line, {
            [styles.linePassed]: step > 1,
          })}
        ></div>
        <div
          className={cn(styles.line, {
            [styles.linePassed]: step === 3,
          })}
        ></div>
      </div>

      <div className={styles.circles}>
        <div
          className={cn(styles.circle, {
            [styles.circlePassed]: step >= 1,
          })}
        >
          <div
            className={cn(styles.circleInner, {
              [styles.circleInnerPassed]: step > 1,
            })}
          ></div>
        </div>
        <div
          className={cn(styles.circle, {
            [styles.circlePassed]: step >= 2,
          })}
        >
          <div
            className={cn(styles.circleInner, {
              [styles.circleInnerPassed]: step > 2,
            })}
          ></div>
        </div>
        <div
          className={cn(styles.circle, {
            [styles.circlePassed]: step >= 3,
          })}
        >
          <div
            className={cn(styles.circleInner, {
              [styles.circleInnerPassed]: step > 3,
            })}
          ></div>
        </div>
      </div>
      <div className={styles.steps}>
        <span
          className={cn(styles.number, {
            [styles.numberPassed]: step >= 1,
          })}
        >
          1
        </span>
        <span
          className={cn(styles.number, {
            [styles.numberPassed]: step >= 2,
          })}
        >
          2
        </span>
        <span
          className={cn(styles.number, {
            [styles.numberPassed]: step >= 3,
          })}
        >
          3
        </span>
      </div>
    </div>
  );
};
