import { Formik, Form, ErrorMessage, Field } from "formik";
import _error from "next/dist/pages/_error";
import React, { useState } from "react";
import Layout from "../components/Layout";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
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

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .email("Invalid email")
    .min(2, "Email is too short"),
  password: Yup.string()
    .min(2, "Password is too short")
    .max(50, "Password is too long")
    .required("Required"),
});

const Login = (props: Props) => {
  const [_error, setError] = useState("");
  const { csrfToken } = props;

  const handleSubmit = () => {};
  return (
    <Layout>
      <div className="mt-[30%] flex  md:mt-[10%]">
        <Formik
          validationSchema={SignupSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form className="m-auto flex h-fit w-full flex-col justify-center self-center rounded-xl border bg-white p-4 shadow-xl lg:w-2/4 lg:p-16">
            <div className="mb-4 h-28 w-28 self-center rounded-full bg-violet-700 ring ring-violet-200" />

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
            <label
              htmlFor="email"
              className="text-lg font-bold text-neutral-800"
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
            <label
              htmlFor="password"
              className="mt-4 text-lg font-bold leading-none text-neutral-800"
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
            <Link href={"/register"}>
              <p className="mt-2 w-fit cursor-pointer text-sm font-light text-neutral-700 hover:underline">
                I don't have an account, register
              </p>
            </Link>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-200 py-1 text-lg font-medium text-blue-700 transition-all hover:bg-blue-300 focus:bg-blue-300"
            >
              Login
            </button>
            <button
              onClick={() => signIn("discord")}
              className="mt-4 flex w-full items-center justify-center gap-x-2 rounded-lg bg-neutral-100 py-2 text-lg font-medium text-neutral-700 shadow-md transition-all hover:bg-neutral-200 focus:bg-neutral-200"
            >
              <FaDiscord size={24} />
              Sign in with Discord
            </button>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};

Login.getInitialProps = async (ctx: NextPageContext) => {
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

export default Login;
