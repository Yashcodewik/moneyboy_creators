"use client";
import { useState } from "react";
import Link from "next/link";
import { TbCamera } from "react-icons/tb";
import CustomSelect from "@/components/CustomSelect";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { apiPostWithMultiForm } from "@/utils/endpoints/common";
import { API_CONTACT_US } from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";
import { useFormik } from "formik";

export const contactSchema = yup.object().shape({
  firstName: yup.string().trim().required("First name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().trim().required("Message is required"),
});

const ContactPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("email", values.email);
        formData.append("subject", values.subject);
        formData.append("message", values.message);

        if (file) {
          formData.append("document", file);
        }

        const res = await apiPostWithMultiForm({
          url: API_CONTACT_US,
          values: formData,
        });

        if (res?.success) {
          ShowToast(res.message, "success");
          resetForm();
          setFile(null);
        } else {
          ShowToast(res?.message || "Something went wrong", "error");
        }
      } catch (err: any) {
        ShowToast(err?.error || "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap" />
        <div className="backicons">
          <button
            className="btn-txt-gradient btn-outline"
            onClick={() => router.push("/")}
          >
            <IoArrowBackOutline className="icons" />
          </button>
        </div>
      </div>
      <div className="moneyboy-feed-page-container cont_wrap">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap" />
          <div className="moneyboy-post__container card">
            <h3 className="heading">Contact Us</h3>
            <p>
              {" "}
              <b>MoneyBoy.com</b> is operated by DNA Global Media B.V. (KvK No.
              97379654). Use the form below to contact our team for support,
              billing, or legal inquiries. We’ll respond within 24–48 hours.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <div className="form_grid">
                <div className="one">
                  <div className="label-input one">
                    <div className="input-placeholder-icon">
                      <i className="icons user svg-icon"></i>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <span className="error-message">
                      {formik.errors.firstName}
                    </span>
                  )}
                </div>
                <div className="one">
                  <div className="label-input one">
                    <div className="input-placeholder-icon">
                      <i className="icons message svg-icon"></i>
                    </div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email Address *"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <span className="error-message">{formik.errors.email}</span>
                  )}
                </div>
                <div className="one">
                  <CustomSelect
                    label="Subject *"
                    icon={<svg className="icons lockBox svg-icon" />}
                    options={[
                      {
                        label: "Account Verification Issue",
                        value: "Account Verification Issue",
                      },
                      { label: "Billing Issue", value: "Billing Issue" },
                      { label: "Report a Bug", value: "Report a Bug" },
                    ]}
                    value={formik.values.subject}
                    onChange={(val: any) => {
                      formik.setFieldValue("subject", val || "", true);
                      formik.setFieldTouched("subject", true, true);
                    }}
                  />

                  {/* {formik.touched.subject && formik.errors.subject && (
                    <span className="error-message">
                      {formik.errors.subject}
                    </span>
                  )} */}
                </div>
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
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      if (selectedFile) {
                        setFile(selectedFile);
                      }
                    }}
                  />
                </div>
                <div className="one">
                  <div className="label-input textarea one">
                    <div className="input-placeholder-icon">
                      <i className="icons documentIcon svg-icon"></i>
                    </div>
                    <textarea
                      rows={2}
                      name="message"
                      placeholder="Message *"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.message && formik.errors.message && (
                    <span className="error-message">
                      {formik.errors.message}
                    </span>
                  )}
                </div>
              </div>
              <button type="submit" className="premium-btn" disabled={loading}>
                {loading ? <span className="loader"></span> : <span>Send</span>}
              </button>
            </form>
            <p>
              Official contact: <Link href="#">support@moneyboy.com</Link>
            </p>
            <p className="fs-18">
              Please don’t send sensitive data or personal content through this
              form.
            </p>
          </div>
          <h4 className="account_login">
            Are you a creator? <Link href="/creator">Sign up here.</Link>
          </h4>
          <h4 className="account_login">
            <Link href="/help">Help & Support</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
