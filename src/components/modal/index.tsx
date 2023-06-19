import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import { ROUTES } from "../../routes";
import { useAppSelector } from "../../store/hook";

import { Button } from "../button";

import successIcon from "../../assets/success.svg";
import errorIcon from "../../assets/error.svg";
import closeIcon from "../../assets/closeIcon.svg";

import styles from "./modal.module.scss";

type TModalProps = {
  isOpen: boolean;
  closeModal(): void;
};

export const Modal = ({ isOpen, closeModal }: TModalProps) => {
  const { error } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const closeOnEscKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.charCode || e.keyCode) === 27) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscKeyDown);

    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscKeyDown);
    };
  }, [closeOnEscKeyDown]);

  return (
    <div
      className={cn(styles.modal, {
        [styles.show]: isOpen,
      })}
      onClick={closeModal}
      aria-hidden="true"
    >
      <div
        className={styles.content}
        aria-hidden="true"
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {error ? (
          <>
            <h3 className={cn(styles.title, styles.titleError)}>Ошибка</h3>
            <img src={errorIcon} alt="error icon" />
            <Button
              className={styles.button}
              variant="fulfilled"
              onClick={closeModal}
              id="button-close"
            >
              Закрыть
            </Button>
            <button className={styles.closeButton} onClick={closeModal}>
              <img src={closeIcon} alt="close icon" />
            </button>
          </>
        ) : (
          <>
            <h3 className={styles.title}>Форма успешно отправлена</h3>
            <img src={successIcon} alt="success icon" />
            <Button
              className={styles.button}
              variant="fulfilled"
              onClick={() => navigate(ROUTES.MAIN)}
              id="button-to-main"
            >
              На главную
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
