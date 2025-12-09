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
                  <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
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
                  <div className="input-placeholder-icon"><i className="icons message svg-icon"></i></div>
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
                     <i className="icons lockBox svg-icon"></i>
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
                    <i className="icons idshape size-45"></i>
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
                  <i className="icons documentIcon svg-icon"></i>
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