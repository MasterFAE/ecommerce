import { Formik, Form, ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import Layout from "../components/Layout";
import * as Yup from "yup";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { NextPageContext } from "next";

type Props = {
  providers: any;
  csrfToken: any;
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .min(2, "First name is too short")
    .max(50, "First name is too long"),
  lastName: Yup.string()
    .required("Required")
    .min(2, "Last name is too short")
    .max(50, "Last name is too long"),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(phoneRegExp, "Phone number is not valid")
    .length(10, "Invalid length"),

  email: Yup.string()
    .required("Required")
    .email("Invalid email")
    .min(2, "Email is too short")
    .max(100, "Email is too long"),
  password: Yup.string()
    .min(6, "Password is too short")
    .max(100, "Password is too long")
    .required("Required"),
});

const Register = (props: Props) => {
  const [_error, setError] = useState("");
  const { csrfToken } = props;

  const handleSubmit = async (e) => {
    const response = await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify(e),
    });
    const data = await response.json();
    if (response.ok) {
      signIn("credentials", { email: e.email, password: e.password });
      return;
    }
    setError(data.error);
  };

  return (
    <Layout>
      <div className="mt-[5vh] flex">
        <Formik
          validationSchema={SignupSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="md:1/2 m-auto flex h-fit w-full flex-col justify-center self-center rounded-xl border bg-white p-4 shadow-xl lg:p-16 xl:w-3/5">
            <input
              readOnly={true}
              name="csrfToken"
              className="hidden"
              value={csrfToken}
            />
            {_error && (
              <div className="rounded-lg bg-red-200 px-2.5 py-2 text-sm font-medium text-red-900">
                {_error}
              </div>
            )}
            {/* INPUT */}
            <label
              htmlFor="firstName"
              className="mt-1 text-lg font-bold text-neutral-800"
            >
              First Name
            </label>
            <ErrorMessage name="firstName" component="div">
              {(msg) => (
                <div className="text-sm font-medium text-red-600">{msg}</div>
              )}
            </ErrorMessage>
            <Field
              id="firstName"
              name="firstName"
              className="rounded-md border bg-neutral-100 px-2 py-1 outline-none"
              placeholder="Your First Name"
            />
            {/* END INPUT */}
            {/* INPUT */}
            <label
              htmlFor="lastName"
              className="mt-2 text-lg font-bold text-neutral-800"
            >
              Last Name
            </label>
            <ErrorMessage name="lastName" component="div">
              {(msg) => (
                <div className="text-sm font-medium text-red-600">{msg}</div>
              )}
            </ErrorMessage>
            <Field
              id="lastName"
              name="lastName"
              className="rounded-md border bg-neutral-100 px-2 py-1 outline-none"
              placeholder="Your Last Name"
            />
            {/* END INPUT */}
            {/* INPUT */}
            <label
              htmlFor="phoneNumber"
              className="mt-2 text-lg font-bold text-neutral-800"
            >
              Phone Number
            </label>
            <ErrorMessage name="phoneNumber" component="div">
              {(msg) => (
                <div className="text-sm font-medium text-red-600">{msg}</div>
              )}
            </ErrorMessage>
            <Field
              id="phoneNumber"
              name="phoneNumber"
              className="rounded-md border bg-neutral-100 px-2 py-1 outline-none"
              placeholder="Enter your phone number"
            />
            {/* END INPUT */}
            {/* INPUT */}
            <label
              htmlFor="email"
              className="mt-2  text-lg font-bold text-neutral-800"
            >
              Email
            </label>
            <ErrorMessage name="email" component="div">
              {(msg) => (
                <div className="text-sm font-medium text-red-600">{msg}</div>
              )}
            </ErrorMessage>
            <Field
              id="email"
              name="email"
              className="rounded-md border bg-neutral-100 px-2 py-1 outline-none"
              placeholder="Enter your email"
            />
            {/* END INPUT */}
            {/* INPUT */}
            <label
              htmlFor="password"
              className="mt-2 text-lg font-bold leading-none text-neutral-800"
            >
              Password
            </label>
            <ErrorMessage component="div" name="password">
              {(msg) => (
                <div className="py-1 text-sm font-medium text-red-600">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <Field
              id="password"
              name="password"
              className="rounded-md border bg-neutral-100 px-2 py-1 outline-none"
              type="password"
              placeholder="Enter password"
            />
            {/* END INPUT */}
            <Link href={"/login"}>
              <p className="mt-2 w-fit cursor-pointer text-sm font-light text-neutral-700 hover:underline">
                I have an account, login
              </p>
            </Link>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-200 py-1 text-lg font-medium text-blue-700 transition-all hover:bg-blue-300 focus:bg-blue-300"
            >
              Register
            </button>
            {/* <button
              onClick={() => signIn("discord")}
              className="mt-4 flex w-full items-center justify-center gap-x-2 rounded-lg bg-neutral-100 py-2 text-lg font-medium text-neutral-700 shadow-md transition-all hover:bg-neutral-200 focus:bg-neutral-200"
            >
              <FaDiscord size={24} />
              Sign in with Discord
            </button> */}
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};

Register.getInitialProps = async (ctx: NextPageContext) => {
  const { req, res } = ctx;
  const session = await getSession({ req });
  if (session && res && session.user?.id) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await getProviders(),
    csrfToken: await getCsrfToken(ctx),
  };
};

export default Register;
