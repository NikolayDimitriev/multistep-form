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
  const dispatch = useAppDispatch();

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
                className={styles.textarea}
                component="textarea"
                rows={4}
              />
              <span>
                Tip:
                <ErrorMessage name="about" component="span" className="error" />
              </span>
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
