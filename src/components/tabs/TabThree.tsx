import { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cn from "classnames";

import { Button } from "../button";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import { update } from "../../store/reducers/user.slice";

import styles from "./tabs.module.scss";
import { sendData } from "../../store/reducers/user.action";

type ValueTabThree = {
  about: string;
};

const ValidateSchema = Yup.object().shape({
  about: Yup.string().max(200, "макс. 200 символов"),
});

type TTabThreeProps = {
  onClickBack(): void;
  toggleModal(): void;
};

export const TabThree = ({ onClickBack, toggleModal }: TTabThreeProps) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const count = calcCountChar(user.about);
    setCount(count);
  }, []);

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;

    const count = calcCountChar(value);
    setCount(count);
  };

  const calcCountChar = (text: string) => {
    return text.split(" ").reduce((acc, cur) => acc + cur.length, 0);
  };

  return (
    <>
      <Formik
        initialValues={{
          about: user.about,
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<ValueTabThree>) => {
          setSubmitting(false);
          dispatch(update({ ...user, ...values }));
          dispatch(sendData({ ...user, ...values }));
          toggleModal();
        }}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <div className={cn(styles.field, styles.textareaField)}>
              <label htmlFor="field-about">About</label>

              <Field
                name="about"
                id="field-about"
                placeholder="Placeholder"
                onInput={(e: InputEvent) => handleInput(e)}
                className={styles.textarea}
                component="textarea"
                rows={4}
              />
              <div className={styles.info}>
                <span>
                  Tip:
                  <ErrorMessage
                    name="about"
                    component="span"
                    className="error"
                  />
                </span>
                <span className={styles.count}>
                  Кол-во символов без пробелов: {count}
                </span>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button
                id="button-back"
                onClick={() => {
                  dispatch(update({ ...user, ...values }));
                  onClickBack();
                }}
                variant="outlined"
              >
                Назад
              </Button>
              <Button id="button-send" variant="fulfilled" type="submit">
                Отправить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
