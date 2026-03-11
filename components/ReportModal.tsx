"use client";

import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

import { apiPost } from "@/utils/endpoints/common";
import { API_REPOET_POST } from "@/utils/api/APIConstant";
import * as yup from "yup";
import { useFormik } from "formik";
import ShowToast from "./common/ShowToast";
import VideoPlayer from "./Purchased-MediaPage/VideoPlayer";
import CustomSelect from "./CustomSelect";

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
}

export const reportSchema = yup.object().shape({
  title: yup
    .string()
    .required("Please select a report reason")
    .notOneOf(["Select Report Option"], "Please select a valid reason"),
});

const ReportModal: React.FC<ReportModalProps> = ({ onClose, post }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "Select Report Option",
      description: "",
    },
    validationSchema: reportSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const res = await apiPost({
          url: API_REPOET_POST,
          values: {
            title: values.title,
            description: values.description,
            postId: post._id,
          },
        });

        if (res?.error) {
          ShowToast(res.error, "error");
        } else {
          ShowToast("Report submitted successfully", "success");
          onClose(true);
        }
      } catch (err: any) {
        ShowToast(err?.message || "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      className="modal show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-modal-title"
    >
      <form className="modal-wrap report-modal" onSubmit={formik.handleSubmit}>
        <button
          type="button"
          className="close-btn"
          onClick={() => onClose(false)}
        >
          <CgClose size={22} />
        </button>

        <h3 className="title">Report Pop-Up</h3>

        {/* ===== MEDIA PREVIEW ===== */}
        <div className="post_wrap">
          {post.media?.[0]?.type === "video" ? (
            <VideoPlayer
              src={post.media[0].mediaFiles[0]}
              publicId={post.publicId}
              watchedSeconds={post.watchedSeconds}
              postId={post._id}
              duration={post.videoDuration}
            />
          ) : (
            <>
              {post.media?.[0]?.mediaFiles?.[0] ? (
                <img
                  src={post.media[0].mediaFiles[0]}
                  alt={post.publicId}
                />
              ) : (
                <div className="nomedia" />
              )}
            </>
          )}
        </div>

        {/* ===== REPORT TITLE ===== */}
        <div>
          <label>
            Title <span>*</span>
          </label>

          <CustomSelect
            searchable={false}
            label="Select Report Option"
            value={formik.values.title}
            onChange={(value: string | string[]) => {
              const val = Array.isArray(value) ? value[0] : value;
              formik.setFieldValue("title", val);
              formik.setFieldTouched("title", true);
            }}
            options={[
              { label: "Select Report Option", value: "Select Report Option" },
              {
                label: "Violent or repulsive content",
                value: "violent_or_repulsive",
              },
              {
                label: "Hateful or abusive content",
                value: "hateful_or_abusive",
              },
              {
                label: "Harassment or bullying",
                value: "harassment_or_bullying",
              },
              {
                label: "Harmful or dangerous acts",
                value: "harmful_or_dangerous",
              },
              { label: "Child abuse", value: "child_abuse" },
              { label: "Promotes terrorism", value: "promotes_terrorism" },
              { label: "Spam or misleading", value: "spam_or_misleading" },
              { label: "Infringes my rights", value: "infringes_my_rights" },
              { label: "Others", value: "others" },
            ]}
          />

          {formik.touched.title && formik.errors.title && (
            <span className="error-message">{formik.errors.title}</span>
          )}
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div className="input-wrap">
          <label>Description</label>
          <textarea
            rows={3}
            placeholder="Tell Us Why You Report?"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          />
          <label className="right">
            {formik.values.description.length}/300
          </label>
        </div>

        {/* ===== SUBMIT BUTTON ===== */}
        <div className="actions">
          <button
            type="submit"
            className="premium-btn active-down-effect"
            disabled={loading}
          >
            <span>{loading ? "Submitting..." : "Submit"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportModal;