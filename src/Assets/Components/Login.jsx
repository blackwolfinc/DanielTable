import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "../Css/Login.scss"  
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'



export const Login = () => {
  const history = useHistory();

    return (
      <div className="loginCard">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
           
            if (!values.password) {
              errors.password = "Required";
            } 
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              const axios = require("axios");
            let data = JSON.stringify({
              // email: "test@logisfleet.com",
              email:   values.email,
        
              // password: "TestUser321",
              password: values.password,
            });

            let config = {
              method: "post",
              url: "https://test-api.logisfleet.com/auth/login",
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            };

            axios(config)
              .then((response) => {
                // setTokenLogin(response.data);
                setSubmitting(false);
                Cookies.set('Token', response.data, { expires: 3 });
                history.push("/Homepage");
              

              })
              .catch((error) => {
                alert("id / password Salah ")
              });
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <h3>Email</h3>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <h3>Password</h3>
              <Field type="password" name="password"  />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
}
