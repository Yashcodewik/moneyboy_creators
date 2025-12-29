"use client";
import CustomSelect from "@/components/CustomSelect";
import Link from "next/link";
import { useState } from "react";
import { TbCamera } from "react-icons/tb";
import { useFormik } from "formik";
import * as yup from "yup";
import { apiPost, apiPostWithMultiForm } from "@/utils/endpoints/common";
import {
  API_CREATOR_REGISTER,
  API_CREATOR_UPLOAD_KYC,
} from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";
import {ageGroupOptions, bodyTypeOptions, countryOptions, ethnicityOptions, eyeColorOptions, hairColorOptions, heightOptions, popularityOptions, sexualOrientationOptions, sizeOptions, styleOptions,} from "@/components/helper/creatorOptions";
import OtpModal from "@/components/OtpModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaFilePdf, FaTrash } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  displayName: yup.string().required("Display name is required"),
  userName: yup
    .string()
    .matches(
      /^[A-Za-z0-9]{5,20}$/,
      "Username must be 5-20 characters long, letters A-Z, and numbers 0-9 only, no spaces."
    )
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.string().required("Date of birth is required"),
  bio: yup.string().required("Bio is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  bodyType: yup.string().required("Body type is required"),
  sexualOrientation: yup.string().required("Sexual orientation is required"),
  age: yup.string().required("Age is required"),
  eyeColor: yup.string().required("Eye color is required"),
  hairColor: yup.string().required("Hair color is required"),
  ethnicity: yup.string().required("Ethnicity is required"),
  height: yup.string().required("Height is required"),
  style: yup.string().required("Style is required"),
  size: yup.string().required("Size is required"),
  popularity: yup.string().required("Popularity is required"),
});

const CreatorSignupPage = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [governmentIdFile, setGovernmentIdFile] = useState<File | null>(null);
  const [selfieWithIdFile, setSelfieWithIdFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dob: "",
      country: "",
      city: "",
      bio: "",
      bodyType: "",
      sexualOrientation: "",
      age: "",
      eyeColor: "",
      hairColor: "",
      ethnicity: "",
      height: "",
      style: "",
      size: "",
      popularity: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Check files before registration
        if (!governmentIdFile || !selfieWithIdFile) {
          ShowToast("Please upload both KYC documents", "error");
          setLoading(false);
          return;
        }

        // Step 1: Register creator
        const res = await apiPost({ url: API_CREATOR_REGISTER, values });

        if (!res?.success) {
          ShowToast(res?.error || "Something went wrong", "error");
          setLoading(false);
          return;
        }

        // Step 2: Upload KYC
        await uploadCreatorKyc(values.email);

        ShowToast(res.message, "success");
        setEmailForOtp(values.email);
        setOtpOpen(true);
      } catch (err: any) {
        ShowToast(err?.message || "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "id" | "selfie"
  ) => {
    const file = e.target.files?.[0];

    console.log("📁 File input triggered:", type);

    if (!file) {
      console.log("❌ No file selected");
      return;
    }

    console.log("✅ File selected:", {
      type,
      name: file.name,
      size: file.size,
      fileType: file.type,
    });

    if (type === "id") {
      setGovernmentIdFile(file);
    } else {
      setSelfieWithIdFile(file);
    }

    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      type === "id" ? setIdPreview(previewUrl) : setSelfiePreview(previewUrl);
      console.log("🖼 Image preview generated");
    } else {
      type === "id" ? setIdPreview("pdf") : setSelfiePreview("pdf");
      console.log("📄 PDF uploaded");
    }
  };

  const uploadCreatorKyc = async (email: string) => {
    console.log("🚀 Uploading KYC for:", email);
    console.log("🆔 Government ID:", governmentIdFile);
    console.log("🤳 Selfie with ID:", selfieWithIdFile);

    if (!governmentIdFile || !selfieWithIdFile) {
      console.log("❌ KYC missing");
      ShowToast("Please upload both KYC documents", "error");
      throw new Error("Missing KYC");
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("governmentId", governmentIdFile);
    formData.append("selfieWithId", selfieWithIdFile);

    console.log("📤 FormData prepared, sending request...");

    const res = await apiPostWithMultiForm({
      url: API_CREATOR_UPLOAD_KYC,
      values: formData,
    });

    console.log("📥 KYC upload response:", res);

    if (!res?.success) {
      throw new Error(res?.message || "KYC upload failed");
    }

    return res;
  };

  const handleRemoveFile = (type: "id" | "selfie") => {
    if (type === "id") {
      setIdPreview(null);
    } else {
      setSelfiePreview(null);
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: emailForOtp,
        otp,
      });

      if (res?.error) {
        ShowToast(res.error, "error");
        return;
      }

      ShowToast("OTP verified successfully", "success");
      setOtpOpen(false);

      // redirect to feed
      router.push("/dashboard");
    } catch (err: any) {
      ShowToast(err?.message || "OTP verification failed", "error");
    }
  };

  return (
    <div className="bg-off-white">
      <div className="container login_wrap creator_wrap">
        <div className="moneyboy-feed-page-container cont_wrap">
          <div className="main_cont">
            <img src="/images/logo.svg" className="logo_wrap" />
            <div className="moneyboy-post__container card">
              <h3 className="heading">Creator Sign Up</h3>
              <p className="mb-10">
                Sign up to make money and interact with your fans!
              </p>
              <div className="creator_maingrid">
                <div className="form_grid">
                  <div>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons user svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="First Name *"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="firstName"
                      />
                    </div>
                    {formik.touched.firstName && formik.errors.firstName && (
                      <span className="error-message">
                        {formik.errors.firstName}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons user svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Last name *"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="lastName"
                      />
                    </div>
                    {formik.touched.lastName && formik.errors.lastName && (
                      <span className="error-message">
                        {formik.errors.lastName}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons user2 svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Display name *"
                        value={formik.values.displayName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="displayName"
                      />
                    </div>
                    {formik.touched.displayName &&
                      formik.errors.displayName && (
                        <span className="error-message">
                          {formik.errors.displayName}
                        </span>
                      )}
                  </div>
                  <div>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons profile-check svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="User name *"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="userName"
                      />
                    </div>
                    {formik.touched.userName && formik.errors.userName && (
                      <span className="error-message">
                        {formik.errors.userName}
                      </span>
                    )}
                  </div>
                  <div className="one">
                    <div className="label-input ">
                      <div className="input-placeholder-icon">
                        <i className="icons message svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Email Address *"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="email"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <span className="error-message">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="label-input password">
                      <div className="input-placeholder-icon">
                        <i className="icons lock svg-icon"></i>
                      </div>
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Password *"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                      />
                      <span
                        onClick={() => setShowPass(!showPass)}
                        className="input-placeholder-icon eye-icon"
                      >
                        {showPass ? (
                          <i className="icons eye-slash svg-icon"></i>
                        ) : (
                          <i className="icons eye svg-icon"></i>
                        )}
                      </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <span className="error-message">
                        {formik.errors.password}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="label-input password">
                      <div className="input-placeholder-icon">
                        <i className="icons lock svg-icon"></i>
                      </div>
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Confirm password *"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="confirmPassword"
                      />
                      <span
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="input-placeholder-icon eye-icon"
                      >
                        {showConfirmPass ? (
                          <i className="icons eye-slash svg-icon"></i>
                        ) : (
                          <i className="icons eye svg-icon"></i>
                        )}
                      </span>
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <span className="error-message">
                          {formik.errors.confirmPassword}
                        </span>
                      )}
                  </div>
                  <div>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons groupUser svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Male"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="gender"
                      />
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                      <span className="error-message">
                        {formik.errors.gender}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons bookmarkIcon svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Date of Birth (DD/MM/YYYY) *"
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="dob"
                      />
                    </div>
                    {formik.touched.dob && formik.errors.dob && (
                      <span className="error-message">{formik.errors.dob}</span>
                    )}
                  </div>
                  <div>
                    <CustomSelect
                      label="United States of America *"
                      icon={
                        <img
                          src="/images/united_flag.png"
                          className="svg-icon"
                        />
                      }
                      options={countryOptions}
                      value={formik.values.country}
                      onChange={(val) => formik.setFieldValue("country", val)}
                    />
                    {formik.touched.country && formik.errors.country && (
                      <span className="error-message">
                        {formik.errors.country}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <svg className="icons locationIcon svg-icon"></svg>
                      </div>
                      <input
                        type="text"
                        placeholder="City *"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="city"
                      />
                    </div>
                    {formik.touched.city && formik.errors.city && (
                      <span className="error-message">
                        {formik.errors.city}
                      </span>
                    )}
                  </div>
                  <div className="one">
                    <div className="label-input textarea one">
                      <div className="input-placeholder-icon">
                        <svg className="icons messageUser svg-icon"></svg>
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="bio"
                      ></textarea>
                    </div>
                    {formik.touched.bio && formik.errors.bio && (
                      <span className="error-message">{formik.errors.bio}</span>
                    )}
                  </div>
                  <div>
                    <CustomSelect
                      label="All Body Types"
                      icon={<svg className="icons handbody svg-icon" />}
                      options={bodyTypeOptions}
                      value={formik.values.bodyType}
                      onChange={(val) => formik.setFieldValue("bodyType", val)}
                    />
                    {formik.touched.bodyType && formik.errors.bodyType && (
                      <span className="error-message">
                        {formik.errors.bodyType}
                      </span>
                    )}
                  </div>
                  <div>
                    <CustomSelect
                      label="All Sexual Orientation *"
                      icon={<svg className="icons timeIcon svg-icon"></svg>}
                      options={sexualOrientationOptions}
                      value={formik.values.sexualOrientation}
                      onChange={(val) =>
                        formik.setFieldValue("sexualOrientation", val)
                      }
                    />
                    {formik.touched.sexualOrientation &&
                      formik.errors.sexualOrientation && (
                        <span className="error-message">
                          {formik.errors.sexualOrientation}
                        </span>
                      )}
                  </div>
                  <div>
                    <CustomSelect
                      label="All Ages"
                      icon={
                        <svg className="icons calendarClock svg-icon"></svg>
                      }
                      options={ageGroupOptions}
                      value={formik.values.age}
                      onChange={(val) => formik.setFieldValue("age", val)}
                    />
                    {formik.touched.age && formik.errors.age && (
                      <span className="error-message">{formik.errors.age}</span>
                    )}
                  </div>

                  <div>
                    <CustomSelect
                      label="All Eye Colors"
                      icon={<svg className="icons cameraEye svg-icon"></svg>}
                      options={eyeColorOptions}
                      value={formik.values.eyeColor}
                      onChange={(val) => formik.setFieldValue("eyeColor", val)}
                    />
                    {formik.touched.eyeColor && formik.errors.eyeColor && (
                      <span className="error-message">
                        {formik.errors.eyeColor}
                      </span>
                    )}
                  </div>
                  <div>
                    <CustomSelect
                      label="All Hair Colors"
                      icon={<svg className="icons paintDrop svg-icon"></svg>}
                      options={hairColorOptions}
                      value={formik.values.hairColor}
                      onChange={(val) => formik.setFieldValue("hairColor", val)}
                    />
                    {formik.touched.hairColor && formik.errors.hairColor && (
                      <span className="error-message">
                        {formik.errors.hairColor}
                      </span>
                    )}
                  </div>

                  <div>
                    <CustomSelect
                      label="All Ethnicities"
                      icon={<svg className="icons multiUser svg-icon"></svg>}
                      options={ethnicityOptions}
                      value={formik.values.ethnicity}
                      onChange={(val) => formik.setFieldValue("ethnicity", val)}
                    />
                    {formik.touched.ethnicity && formik.errors.ethnicity && (
                      <span className="error-message">
                        {formik.errors.ethnicity}
                      </span>
                    )}
                  </div>
                  <div>
                    <CustomSelect
                      label="All Heights"
                      icon={
                        <svg className="icons uploadDownload svg-icon"></svg>
                      }
                      options={heightOptions}
                      value={formik.values.height}
                      onChange={(val) => formik.setFieldValue("height", val)}
                    />
                    {formik.touched.height && formik.errors.height && (
                      <span className="error-message">
                        {formik.errors.height}
                      </span>
                    )}
                  </div>
                  <div>
                    <CustomSelect
                      label="All Styles"
                      icon={
                        <svg className="icons documentHeart svg-icon"></svg>
                      }
                      options={styleOptions}
                      value={formik.values.style}
                      onChange={(val) => formik.setFieldValue("style", val)}
                    />
                    {formik.touched.style && formik.errors.style && (
                      <span className="error-message">
                        {formik.errors.style}
                      </span>
                    )}
                  </div>
                  <div>
                    <CustomSelect label="All Sizes" icon={<svg className="icons expanddiagonal svg-icon size-18"></svg>}
                      options={sizeOptions}
                      value={formik.values.size}
                      onChange={(val) => formik.setFieldValue("size", val)}
                    />
                    {formik.touched.size && formik.errors.size && (
                      <span className="error-message">
                        {formik.errors.size}
                      </span>
                    )}
                  </div>
                  {/* <CustomSelect
                    label="All Popularity"
                    icon={<svg className="icons zigzagchart svg-icon"></svg>}
                    options={[
                      { label: "options 1", value: "options 2" },
                      { label: "options 2", value: "options 2" },
                    ]}
                  /> */}

                  <div>
                    <CustomSelect
                      label="All Popularity"
                      icon={<svg className="icons zigzagchart svg-icon"></svg>}
                      options={popularityOptions}
                      value={formik.values.popularity}
                      onChange={(val) =>
                        formik.setFieldValue("popularity", val)
                      }
                    />
                    {formik.touched.popularity && formik.errors.popularity && (
                      <span className="error-message">
                        {formik.errors.popularity}
                      </span>
                    )}
                  </div>
                </div>
                <div className="right_wrap">
                  <div className="label-input one file-upload-wrapper">
                    <div className="input-placeholder-icon">
                      <svg className="icons idshape size-45"></svg>
                      <div className="imgicons"><TbCamera size="16" /></div>
                    </div>
                    <p>Your government issued ID card, National ID card, Passport or Driving license *</p>
                    <input type="file" className="real-file-input" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, "id")}/>
                  </div>
                  {idPreview && (
                    <div className="label-input file-upload-wrapper preview-wrapper">
                      {idPreview === "pdf" ? (
                        <div className="input-placeholder-icon">
                          <FaFilePdf className="icons" color="#E5741F"/>
                        </div>
                        ) : (
                        <div className="input-placeholder-icon">
                          <img src={idPreview} className="preview-img" />
                        </div>
                        )}
                        <p>PDF Uploaded</p>
                        <div className="right_box">
                          <Link href="#" className="icons"><FiEdit /></Link>
                          <Link href="#" className="icons" onClick={() => handleRemoveFile("id")}><FaTrash /></Link>
                        </div>
                    </div>
                  )}
                  <div className="label-input one file-upload-wrapper">
                    <div className="input-placeholder-icon">
                      <svg className="icons profilecards size-45"></svg>
                      <div className="imgicons">
                        <TbCamera size="16" />
                      </div>
                    </div>
                    <p>Your selfie with your ID and handwritten note *</p>
                    <input
                      type="file"
                      className="real-file-input"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, "selfie")}
                    />
                    {selfiePreview && (
                      <div className="input-placeholder-icon">
                        <div className="preview-wrapper">
                          {selfiePreview === "pdf" ? (
                            <p>PDF Uploaded</p>
                          ) : (
                            <img src={selfiePreview} className="preview-img" />
                          )}

                          <span
                            className="remove-btn"
                            onClick={() => handleRemoveFile("selfie")}
                          >
                            ✕
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
              <button
                className="premium-btn"
                onClick={() => formik.handleSubmit()}
                disabled={loading}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <span>Create your account</span>
                )}
              </button>
              <p>
                By signing up you agree to our{" "}
                <Link href="#">Terms of Service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>, and confirm that you are
                at least 18 years old.
              </p>
              <p className="fs-18">
                Have an account already? <Link href="/login">Log in here.</Link>
              </p>
            </div>
            <h4 className="account_login">
              Are you a fan? <a href="/signup">Sign up here.</a>
            </h4>
          </div>
        </div>
      </div>
      {emailForOtp && otpOpen && (
        <OtpModal
          open={otpOpen}
          onClose={() => setOtpOpen(false)}
          email={emailForOtp}
          onSubmit={verifyOtp}
        />
      )}
    </div>
  );
};

export default CreatorSignupPage;
