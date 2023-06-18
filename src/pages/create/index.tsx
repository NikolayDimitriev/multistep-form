import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

import cn from "classnames";

import { ProgressBar } from "../../components/progressBar";
import styles from "./createPage.module.scss";

function Create() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<number>(1);

  const onClickNext = () => {
    setToggle((prev) => prev + 1);
  };

  const onClickBack = () => {
    if (toggle === 1) {
      navigate(ROUTES.MAIN);
      return;
    }

    setToggle((prev) => prev - 1);
  };

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.wrapper}>
        <ProgressBar step={toggle} />
        <span>{toggle}</span>
        <button onClick={onClickBack}>Назад</button>
        <button onClick={onClickNext}>Далее</button>
      </div>
    </div>
  );
}
export default Create;
