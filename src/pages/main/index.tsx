import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import styles from "./mainPage.module.scss";

function Main() {
  const navigate = useNavigate();

  const onClickStart = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <div className={styles.root}>
      <button onClick={onClickStart}>Начать</button>
    </div>
  );
}
export default Main;
