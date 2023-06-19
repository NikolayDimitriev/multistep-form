import {
  Formik,
  Form,
  FormikHelpers,
  Field,
  ErrorMessage,
  FieldArray,
} from "formik";
import * as Yup from "yup";

import { Button } from "../button";

import basket from "../../assets/basket.svg";
import plus from "../../assets/plus.svg";

import styles from "./tabs.module.scss";

type ValueTabTwo = {
  advantages: string[];
  checkbox: string[];
  radio: string;
};

const ValidateSchema = Yup.object().shape({
  advantages: Yup.array().of(
    Yup.string()
      .test(
        "char-or-number",
        () => `только буквы и цифры`,
        (value) => value == null || /^[а-яА-Яa-zA-Z0-9]+$/.test(value)
      )
      .max(30, "макс. 30 символов")
      .required("обязательное поле")
  ),
  radio: Yup.string().required("обязательное поле"),
  checkbox: Yup.array().min(1, "обязательное поле"),
});

type TTabTwoProps = {
  onClickNext(): void;
  onClickBack(): void;
};

export const TabTwo = ({ onClickBack }: TTabTwoProps) => {
  return (
    <>
      <Formik
        initialValues={{
          advantages: ["", "", ""],
          checkbox: [],
          radio: "",
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<ValueTabTwo>) => {
          console.log(values);

          setSubmitting(false);
        }}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <h5 className={styles.title}>Advantages</h5>

              <FieldArray name="advantages">
                {({
                  remove,
                  push,
                }: {
                  remove(index: number): void;
                  push(index: string): void;
                }) => (
                  <>
                    {values.advantages.length > 0 &&
                      values.advantages.map((advantage, index) => (
                        <div className={styles.advantage} key={index}>
                          <div className={styles.advantageBlock}>
                            <Field
                              id={`field-advantages-${index + 1}`}
                              name={`advantages.${index}`}
                              placeholder="Placeholder"
                              className={styles.input}
                              type="text"
                            />
                            <ErrorMessage
                              name={`advantages.${index}`}
                              component="span"
                              className="error"
                            />
                          </div>

                          <button
                            type="button"
                            className={styles.advantageDelete}
                            onClick={() => remove(index)}
                          >
                            <img src={basket} alt="basket icon" />
                          </button>
                        </div>
                      ))}
                    <Button
                      type="button"
                      variant="outlined"
                      className={styles.advantageAdd}
                      onClick={() => push("")}
                    >
                      <img src={plus} alt="plus icon" />
                    </Button>
                  </>
                )}
              </FieldArray>
            </div>

            <div className={styles.field}>
              <h5 className={styles.title}>Checkbox group</h5>

              <div
                role="group"
                aria-labelledby="checkbox-group"
                className={styles.group}
              >
                <label className={styles.groupItem}>
                  <Field type="checkbox" name="checkbox" value="1" />
                  <span>1</span>
                </label>
                <label className={styles.groupItem}>
                  <Field type="checkbox" name="checkbox" value="2" />
                  <span>2</span>
                </label>
                <label className={styles.groupItem}>
                  <Field type="checkbox" name="checkbox" value="3" />
                  <span>3</span>
                </label>
              </div>

              <ErrorMessage
                name="checkbox"
                component="span"
                className="error"
              />
            </div>

            <div className={styles.field}>
              <h5 className={styles.title}>Radio group</h5>

              <div
                role="group"
                aria-labelledby="my-radio-group"
                className={styles.group}
              >
                <label className={styles.groupItem}>
                  <Field type="radio" name="radio" value="1" />
                  <span>1</span>
                </label>
                <label className={styles.groupItem}>
                  <Field type="radio" name="radio" value="2" />
                  <span>2</span>
                </label>
                <label className={styles.groupItem}>
                  <Field type="radio" name="radio" value="3" />
                  <span>3</span>
                </label>
              </div>

              <ErrorMessage name="radio" component="span" className="error" />
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
                // onClick={onClickNext}
                variant="fulfilled"
                type="submit"
              >
                Далее
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
