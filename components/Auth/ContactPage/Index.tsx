"use client";
import Link from "next/link";
import { TbCamera } from "react-icons/tb";
import { useFormik } from "formik";
import * as Yup from "yup";

import ShowToast from "@/components/common/ShowToast";
import { apiPost } from "@/utils/endpoints/common";
import { API_CONTACT_US } from "@/utils/api/APIConstant";

const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await apiPost({
          url: API_CONTACT_US,
          values,
        });

        if (res?.success) {
          ShowToast(res.message, "success");
          resetForm();
        } else {
          ShowToast(res?.message || "Something went wrong", "error");
        }
      } catch (err) {
        ShowToast("Server error", "error");
      }
    },
  });

  const renderError = (fieldName: keyof typeof formik.values) => {
    return formik.touched[fieldName] && formik.errors[fieldName] ? (
      <div
        className="error-message"
        style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
      >
        {formik.errors[fieldName]}
      </div>
    ) : null;
  };

  return (
    <div className="login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap" />
      </div>

      <div className="moneyboy-feed-page-container cont_wrap">
        <div className="main_cont">
          <img src="/images/logo/moneyboy-logo.png" className="logo_wrap" />

          <div className="moneyboy-post__container card">
            <h3 className="heading">Contact Us</h3>
            <p>
              <b>MoneyBoy.com</b> is operated by DNA Global Media B.V. (KvK No.
              97379654). Use the form below to contact our team for support,
              billing, or legal inquiries. We'll respond within 24-48 hours.
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="form_grid">
                {/* FIRST NAME */}
                <div className="label-input one">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name *"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.firstName && formik.errors.firstName
                        ? "error"
                        : ""
                    }
                  />
                </div>
                {renderError("firstName")}

                {/* EMAIL */}
                <div className="label-input one">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                        stroke="black"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Email Address *"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.email && formik.errors.email ? "error" : ""
                    }
                  />
                </div>
                {renderError("email")}

                {/* SUBJECT */}
                <div
                  className="custom-select-element one"
                  data-custom-select-element=""
                  data-custom-select-value=""
                >
                  <div
                    className="custom-select-label-wrapper"
                    data-custom-select-triger=""
                  >
                    <div className="custom-select-icon-txt">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V15.9995C21 19.9995 20 21.9995 15 21.9995H9C4 21.9995 3 19.9995 3 15.9995V9.99953C3 5.43953 4.67 4.19953 8 4.01953"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="custom-select-label-txt">
                        {formik.values.subject || "Subject *"}
                      </span>
                    </div>
                  </div>

                  <select
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="real-file-input"
                    style={{ opacity: 0, position: "absolute", inset: 0 }}
                  >
                    <option value="">Select Subject</option>
                    <option value="Account Verification">
                      Account Verification
                    </option>
                    <option value="Billing Issue">Billing Issue</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Report a Bug">Report a Bug</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                {renderError("subject")}

                {/* FILE */}
                <div className="label-input one file-upload-wrapper">
                  <div className="input-placeholder-icon">
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M31.5871 15.2255L30.1579 21.3213C28.9329 26.5859 26.5121 28.715 21.9621 28.2775C21.2329 28.2192 20.4454 28.088 19.5996 27.8838L17.1496 27.3005C11.0684 25.8567 9.18711 22.8526 10.6163 16.7567L12.0454 10.6463C12.3371 9.40673 12.6871 8.32756 13.1246 7.43798C14.8309 3.90881 17.7329 2.9609 22.6038 4.11298L25.0392 4.68173C31.1496 6.1109 33.0163 9.12964 31.5871 15.2255Z"
                        fill="#E5741F"
                      />
                      <path
                        opacity="0.4"
                        d="M18.4523 9.53563C19.1663 9.69787 19.8766 9.2506 20.0389 8.53661C20.2011 7.82261 19.7539 7.11228 19.0399 6.95003C18.3259 6.78778 17.6155 7.23506 17.4533 7.94905C17.291 8.66304 17.7383 9.37338 18.4523 9.53563Z"
                        fill="white"
                      />
                      <path
                        d="M18.3005 10.1806C17.0051 9.88621 15.7528 10.5152 15.5095 11.5857C15.4931 11.6581 15.537 11.7279 15.6094 11.7443L20.0515 12.7538C20.1239 12.7702 20.1937 12.7263 20.2101 12.6539C20.4534 11.5834 19.5959 10.4749 18.3005 10.1806Z"
                        fill="white"
                      />
                      <path
                        d="M21.9627 28.2771C21.0586 28.8896 19.9211 29.4 18.5357 29.8521L16.2315 30.6104C10.4419 32.4771 7.394 30.9167 5.51275 25.1271L3.64609 19.3667C1.77942 13.5771 3.32525 10.5146 9.11483 8.64792L11.419 7.88958C12.0169 7.7 12.5857 7.53958 13.1252 7.4375C12.6877 8.32708 12.3377 9.40625 12.0461 10.6458L10.6169 16.7562C9.18775 22.8521 11.069 25.8562 17.1502 27.3L19.6002 27.8833C20.4461 28.0875 21.2336 28.2187 21.9627 28.2771Z"
                        fill="#E5741F"
                      />
                      <path
                        d="M26.4091 19.0909C26.3216 19.0909 26.2341 19.0763 26.132 19.0617L14.8206 16.1476C14.2372 16.0018 13.8872 15.4039 14.0331 14.8206C14.1789 14.2372 14.7768 13.8872 15.3601 14.0331L26.6716 16.9472C27.2549 17.093 27.6049 17.6909 27.4591 18.2742C27.3424 18.7555 26.8903 19.0909 26.4091 19.0909Z"
                        fill="#E5741F"
                      />
                      <path
                        d="M18.0689 21.0743C17.9814 21.0743 17.8939 21.0597 17.7918 21.0452L13.5481 19.966C12.9648 19.8202 12.6148 19.2222 12.7606 18.6389C12.9064 18.0556 13.5043 17.7056 14.0877 17.8514L18.3314 18.9306C18.9148 19.0764 19.2648 19.6743 19.1189 20.2577C19.0023 20.7535 18.5648 21.0743 18.0689 21.0743Z"
                        fill="#E5741F"
                      />
                    </svg>
                    <div className="imgicons">
                      <TbCamera size="16" />
                    </div>
                  </div>
                  <p>Your government issued ID card (Optional)</p>
                  <input
                    type="file"
                    className="real-file-input"
                    accept="image/*,.pdf"
                  />
                </div>

                {/* MESSAGE */}
                <div className="label-input textarea one">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 13H13"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 17H11"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <textarea
                    placeholder="Message *"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.message && formik.errors.message
                        ? "error"
                        : ""
                    }
                  ></textarea>
                </div>
                {renderError("message")}
              </div>

              <button
                type="submit"
                className="premium-btn"
                disabled={formik.isSubmitting}
              >
                <span>{formik.isSubmitting ? "Sending..." : "Send"}</span>
              </button>

              <p>
                Official contact: <Link href="#">support@moneyboy.com</Link>
              </p>

              <p className="fs-18">
                Please don't send sensitive data or personal content through
                this form.
              </p>
            </form>
          </div>

          <h4 className="account_login">
            Are you a creator? <a href="/signup">Sign up here.</a>
          </h4>
        </div> 
      </div>
    </div>
  );
};

export default ContactPage;