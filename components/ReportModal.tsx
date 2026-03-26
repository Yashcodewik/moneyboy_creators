"use client";

import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import { showSuccess, showError } from "../utils/alert";
import { apiPost } from "@/utils/endpoints/common";
import { API_REPORT_POST } from "@/utils/api/APIConstant"; // ✅ fixed typo
import * as yup from "yup";
import { useFormik } from "formik";
import VideoPlayer from "./Purchased-MediaPage/VideoPlayer";
import Modal from "./Modal";

interface MediaItem {
  _id: string;
  publicId: string;
  watchedSeconds: number;
  videoDuration: number;
  media: {
    type: "video" | "photo";
    mediaFiles: string[];
  }[];
}

interface ReportModalProps {
  onClose: (reported?: boolean) => void;
  post: MediaItem;
  show: boolean;
}

// ✅ improved validation
export const reportSchema = yup.object().shape({
  title: yup
    .string()
    .required("Please select a report reason")
    .notOneOf([""], "Please select a valid reason"),
  description: yup
    .string()
    .max(300, "Maximum 300 characters allowed"),
});

const ReportModal: React.FC<ReportModalProps> = ({
  onClose,
  post,
  show,
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "", // ✅ cleaner default
      description: "",
    },
    validationSchema: reportSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const res = await apiPost({
          url: API_REPORT_POST,
          values: {
            title: values.title,
            description: values.description,
            postId: post._id,
          },
        });

        if (res?.error) {
          showError(res.error);
        } else {
          showSuccess("Report submitted successfully");
          onClose(true);
        }
      } catch (err: any) {
        showError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Modal show={show} onClose={() => onClose()} title="Report Post" className="report_wrap">
      <form className="modal_containt report-modal" onSubmit={formik.handleSubmit} >
        {/* ===== MEDIA PREVIEW ===== */}
        <div className="post_wrap">
          {post.media?.[0]?.type === "video" ? (
            <VideoPlayer src={post.media[0].mediaFiles[0]} publicId={post.publicId} watchedSeconds={post.watchedSeconds} postId={post._id} duration={post.videoDuration}/>
          ) : post.media?.[0]?.mediaFiles?.[0] ? (
            <img src={post.media[0].mediaFiles[0]} alt={post.publicId}/>
          ) : (
            <div className="nomedia" />
          )}
        </div>
        {/* ===== REPORT TITLE ===== */}
        <div>
          <label>Title <span>*</span></label>
          <CustomSelect
            searchable={false}
            label="Select Report Option"
            value={formik.values.title}
            onChange={(value: string | string[]) => {const val = Array.isArray(value) ? value[0] : value; formik.setFieldValue("title", val);}}
            options={[
              { label: "Select Report Option", value: "" },
              { label: "Violent or repulsive content", value: "violent" },
              { label: "Hateful or abusive content", value: "abusive" },
              { label: "Harassment or bullying", value: "harassment" },
              { label: "Harmful or dangerous acts", value: "dangerous" },
              { label: "Child abuse", value: "child_abuse" },
              { label: "Promotes terrorism", value: "terrorism" },
              { label: "Spam or misleading", value: "spam" },
              { label: "Infringes my rights", value: "rights" },
              { label: "Others", value: "others" },
            ]}/>
          {formik.touched.title && formik.errors.title && (<span className="error-message">{formik.errors.title}</span>)}
        </div>
        {/* ===== DESCRIPTION ===== */}
        <div className="input-wrap">
          <label>Description</label>
          <textarea rows={3} name="description" placeholder="Tell us why you report?" value={formik.values.description} onChange={formik.handleChange} maxLength={300}/>
          <label className="right">{formik.values.description.length}/300</label>
        </div>
        {/* ===== SUBMIT BUTTON ===== */}
        <div className="actions">
          <button type="submit" className="premium-btn active-down-effect" disabled={loading}><span>{loading ? "Submitting..." : "Submit"}</span></button>
        </div>
      </form>
    </Modal>
  );
};

export default ReportModal;