"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import ShowToast from "@/components/common/ShowToast";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "not_registered") {
      ShowToast("Account not found. Please register first.", "error");
    }
  }, [error]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid Email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      setSubmitting(false);

      if (res?.error) {
        setFieldError("password", "Invalid email or password");
        return;
      }

      router.push("/feed");
    },
  });

  const handleSocialLogin = async (provider: "google" | "twitter") => {
    document.cookie = "userType=Login; path=/";

    const res = await signIn(provider, {
      callbackUrl: "/feed",
    });

    console.log(res);

    if (res?.error) {
      console.log("Login failed");
    }

    if (res?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="container login_wrap lg_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap" />
        <div className="backicons">
          <button
            className="btn-txt-gradient btn-outline"
            onClick={() => router.push("/feed")}
          >
            <IoArrowBackOutline className="icons" />
          </button>
        </div>
      </div>
      <div className="moneyboy-feed-page-container cont_wrap justify-center">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap" />
          <form onSubmit={formik.handleSubmit}>
            <div className="moneyboy-post__container card">
              <h3 className="heading">Login</h3>
              <p>Welcome back! Sign in to your account</p>
              <div className="loginbtn_wrap">
                <button
                  type="button"
                  className="google-button active-down-effect "
                  onClick={() => handleSocialLogin("google")}
                >
                  <FcGoogle size={18} /> Sign up with Google
                </button>
                <button
                  type="button"
                  className="x-button active-down-effect"
                  onClick={() => handleSocialLogin("twitter")}
                >
                  <FaXTwitter size={18} /> Sign up with X
                </button>
              </div>
              <div className="or-divider">
                <span>Or</span>
              </div>
              <div className="form_grid">
                <div className="one">
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons message svg-icon"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Email Address *"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <span className="error-message">{formik.errors.email}</span>
                  )}
                </div>
                <div className="one">
                  <div className="label-input password">
                    <div className="input-placeholder-icon">
                      <i className="icons lock svg-icon"></i>
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password *"
                      {...formik.getFieldProps("password")}
                    />
                    <span
                      onClick={() => setShowPass(!showPass)}
                      className="input-placeholder-icon eye-icon"
                    >
                      {showPass ? (
                        <i className="icons eye svg-icon"></i>
                      ) : (
                        <i className="icons eye-slash svg-icon"></i>
                      )}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <span className="error-message">
                      {formik.errors.password}
                    </span>
                  )}
                </div>
                <div className="one text-right">
                  <Link href="/forgot-password" className="forget_link">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="premium-btn mb-10"
                disabled={formik.isSubmitting}
              >
                <span>{formik.isSubmitting ? "Signing in..." : "Sign in"}</span>
              </button>
              <p className="fs-18 mb-0">
                Don’t have an account? <Link href="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
