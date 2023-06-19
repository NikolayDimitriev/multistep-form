import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button } from "../button";

import styles from "./tabs.module.scss";

type ValueTabOne = {
  nickname: string;
  name: string;
  surname: string;
  sex: string;
};

const ValidateSchema = Yup.object().shape({
  nickname: Yup.string()
    .test(
      "char-or-number",
      () => `только буквы и цифры`,
      (value) => value == null || /^[а-яА-Яa-zA-Z0-9]+$/.test(value)
    )
    .max(30, "макс. 30 символов")
    .required("обязательное поле"),
  name: Yup.string()
    .test(
      "only-char-name",
      () => `только буквы`,
      (value) => value == null || /^[а-яА-Яa-zA-Z]+$/.test(value)
    )
    .max(50, "макс. 50 символов")
    .required("обязательное поле"),
  surname: Yup.string()
    .test(
      "only-char-surname",
      () => `только буквы`,
      (value) => value == null || /^[а-яА-Яa-zA-Z]+$/.test(value)
    )
    .max(50, "макс. 50 символов")
    .required("обязательное поле"),
  sex: Yup.mixed()
    .oneOf(["man", "woman"] as const)
    .defined("укажите пол"),
});

type TTabOneProps = {
  onClickNext(): void;
  onClickBack(): void;
};

export const TabOne = ({ onClickNext, onClickBack }: TTabOneProps) => {
  return (
    <>
      <Formik
        initialValues={{
          nickname: "",
          name: "",
          surname: "",
          sex: "",
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<ValueTabOne>) => {
          setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="field-nickname">Nickname</label>

            <Field
              name="nickname"
              id="field-nickname"
              placeholder="Placeholder"
              className={styles.input}
            />
            <span>
              Tip:
              <ErrorMessage
                name="nickname"
                component="span"
                className="error"
              />
            </span>
          </div>
          <div className={styles.field}>
            <label htmlFor="field-name">Name</label>

            <Field
              name="name"
              id="field-name"
              placeholder="Placeholder"
              className={styles.input}
            />
            <span>
              Tip:
              <ErrorMessage name="name" component="span" className="error" />
            </span>
          </div>
          <div className={styles.field}>
            <label htmlFor="field-surname">Surname</label>

            <Field
              name="surname"
              id="field-surname"
              placeholder="Placeholder"
              className={styles.input}
            />
            <span>
              Tip:
              <ErrorMessage name="surname" component="span" className="error" />
            </span>
          </div>
          <div className={styles.field}>
            <label htmlFor="field-sex">Sex</label>

            <Field
              name="sex"
              id="field-sex"
              placeholder="Не выбрано"
              className={styles.select}
              as="select"
            >
              <option value="" style={{ display: "none" }}>
                Не выбрано
              </option>
              <option id="field-sex-option-man" value="man">
                man
              </option>
              <option id="field-sex-option-woman" value="woman">
                woman
              </option>
            </Field>
            <span>
              Tip:
              <ErrorMessage name="sex" component="span" className="error" />
            </span>
          </div>
          <div className={styles.buttons}>
            <Button
              id="button-back"
              onClick={onClickBack}
              variant="outlined"
              type="submit"
            >
              Назад
            </Button>
            <Button
              id="button-next"
              onClick={onClickNext}
              variant="fulfilled"
              type="submit"
            >
              Далее
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
