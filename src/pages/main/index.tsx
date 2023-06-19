import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { Link } from "../../components/link";
import { Button } from "../../components/button";

import { ROUTES } from "../../routes";

import styles from "./mainPage.module.scss";
import { InputPhone } from "../../components/InputPhone";
import { useAppSelector } from "../../store/hook";

type Values = {
  phone: string;
  email: string;
};

const ValidateSchema = Yup.object().shape({
  phone: Yup.string().required("Обязательное поле"),
  email: Yup.string().email("Неверный email").required("Обязательное поле"),
});

function Main() {
  const navigate = useNavigate();
  const { phone, email } = useAppSelector((state) => state.userReducer.user);

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.user}>
        <div className={styles.avatar}>НД</div>
        <div className={styles.info}>
          <span className={styles.name}>Николай Димитриев</span>
          <div className={styles.links}>
            <Link href="https://t.me/dimitrievnikolay" text="Telegram" />
            <Link href="https://github.com/NikolayDimitriev" text="GitHub" />
            <Link
              href="https://drive.google.com/file/d/1Gqgz_2Qq5iRP2b3t-Efi6OzuRXgBkzAA/view?usp=sharing"
              text="Resume"
            />
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <Formik
        initialValues={{
          phone: phone,
          email: email,
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<Values>) => {
          setSubmitting(false);
          navigate(ROUTES.CREATE);
        }}
      >
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="phone">Номер телефона</label>

            <Field
              name="phone"
              id="phone"
              placeholder="+7 (999) 999 99 99"
              className={styles.input}
              as={InputPhone}
            />
            <ErrorMessage name="phone" component="span" className="error" />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              id="email"
              type="email"
              placeholder="tim.jennings@example.com"
              className={styles.input}
            />
            <ErrorMessage name="email" component="span" className="error" />
          </div>

          <Button
            id="button-start"
            className={styles.button}
            variant="fulfilled"
          >
            Начать
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
export default Main;
