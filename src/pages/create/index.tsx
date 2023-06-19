import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

import cn from "classnames";

import { ProgressBar } from "../../components/progressBar";
import { TabOne } from "../../components/tabs/TabOne";

import styles from "./createPage.module.scss";
import { TabTwo } from "../../components/tabs/TabTwo";
import { TabThree } from "../../components/tabs/TabThree";

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
        {toggle === 1 && (
          <TabOne onClickNext={onClickNext} onClickBack={onClickBack} />
        )}
        {toggle === 2 && (
          <TabTwo onClickNext={onClickNext} onClickBack={onClickBack} />
        )}
        {toggle === 3 && (
          <TabThree onClickNext={onClickNext} onClickBack={onClickBack} />
        )}
      </div>
    </div>
  );
}
export default Create;
