import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cn from "classnames";

import { Button } from "../button";

import styles from "./tabs.module.scss";

type ValueTabThree = {
  about: string;
};

const ValidateSchema = Yup.object().shape({
  about: Yup.string().max(200, "макс. 200 символов"),
});

type TTabThreeProps = {
  onClickNext(): void;
  onClickBack(): void;
};

export const TabThree = ({ onClickNext, onClickBack }: TTabThreeProps) => {
  return (
    <>
      <Formik
        initialValues={{
          about: "",
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<ValueTabThree>) => {
          setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <div className={cn(styles.field, styles.textareaField)}>
            <label htmlFor="field-nickname">About</label>

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
              Отправить
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
