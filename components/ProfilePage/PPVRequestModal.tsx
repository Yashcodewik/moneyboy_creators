"use client";

import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";
import { apiPost } from "@/utils/endpoints/common";
import { useState } from "react";
import { API_CREATE_PPV_REQUEST } from "@/utils/api/APIConstant";
import { CircleDollarSign, CircleX } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/store";
import { fetchWallet } from "@/redux/wallet/Action";
import { useRouter } from "next/navigation";
import { showError } from "@/utils/alert";
import Modal from "../Modal";

const validationSchema = Yup.object({
  requestType: Yup.string().required("Request type is required"),

  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),

  offerPrice: Yup.number()
    .typeError("Price must be a number")
    .min(20, "Minimum price is 20$")
    .required("Price is required"),
});

interface PPVRequestModalProps {
  show: boolean; // ✅ ADD THIS
  onClose: () => void;
  creator: {
    userId: string;
    displayName?: string;
    userName?: string;
    profile?: string;
  };
  post: any;
  onSuccess: (payload: { amount: number; threadPublicId: string }) => void;
}
const PPVRequestModal = ({ show, onClose, creator, post, onSuccess, }: PPVRequestModalProps) => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState("");
  const [offerPrice, setOfferPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [requestType, setRequestType] = useState<"VIDEO" | "PHOTO">("VIDEO");
  const [file, setFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<{
    file: File;
    url: string;
    type: "image" | "video";
  } | null>(null);


  const router = useRouter();

  const handleRequestSuccess = async (receiverId: string) => {
    try {
      const res = await apiPost({
        url: "/messages/thread",
        values: { receiverId },
      });

      const threadId = res?.publicId;

      if (threadId) {
        router.push(`/message?threadId=${threadId}`);
      }
    } catch (err) {
      console.error("Thread create failed", err);
    }
  };

  const removeMedia = () => {
    if (mediaPreview?.url) {
      URL.revokeObjectURL(mediaPreview.url);
    }
    setMediaPreview(null);
  };
  const formik = useFormik({
    initialValues: {
      requestType: "VIDEO",
      description: "",
      offerPrice: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
      formData.append("creatorId", creator.userId);
      formData.append("type", values.requestType);
      formData.append("price", values.offerPrice.toString());
      formData.append("description", values.description);
      formData.append("paymentMethod", paymentMethod);

      if (mediaPreview?.file) {
        formData.append("file", mediaPreview.file);
      }
      const res = await apiPost({
        url: API_CREATE_PPV_REQUEST,
        values: formData,
      });

      setLoading(false);

      if (res?.success) {

        // refresh wallet instantly if wallet payment
        if (paymentMethod === "wallet") {
          dispatch(fetchWallet());
        }

        onSuccess({
          amount: Number(values.offerPrice),
          threadPublicId: res.threadPublicId,
        });
        router.push(`/message?threadId=${res.threadPublicId}`);
      }
    },
  });

  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet",
  );

  return (
    <>
      <Modal show={show} onClose={onClose} title="PPV - Request Custom Content" size="md" className="request_wrap">
        <div className="modal_containt request-modal">
          <div className="profile-card">
            <div className="profile-card__main justify-center">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  {creator.profile ? (
                    <img
                      src={creator.profile}
                      alt={creator.displayName || "Creator Avatar"}
                    />
                  ) : (
                    <div className="noprofile">
                      {/* SVG unchanged */}
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name">
                    {creator.displayName || "Creator"}
                  </div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="Profile Badge"
                    />
                  </div>
                </div>

                {creator.userName && (
                  <div className="profile-card__username">
                    @{creator.userName}
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="small">
            Request a personalized video or photo directly from this MoneyBoy.
          </p>
          <div>
            <label>Request type</label>
            <CustomSelect
              searchable={false}
              label="Request type"
              value={formik.values.requestType}
              onChange={(value) => formik.setFieldValue("requestType", value)}
              options={[
                { label: "Video", value: "VIDEO" },
                { label: "Photo", value: "PHOTO" },
              ]}
            />
            {formik.touched.requestType && formik.errors.requestType && (
              <span className="error-message">{formik.errors.requestType}</span>
            )}
          </div>
          <div>
            <label>Description</label>
            <textarea
              rows={3}
              placeholder="Describe what you’d like..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="description"
            />
            {formik.touched.description && formik.errors.description && (
              <span className="error-message">{formik.errors.description}</span>
            )}
          </div>
          <div>
            <label>Upload reference file</label>
            <div className="upload-wrapper">

              {mediaPreview && (
                <div className="img_wrap">
                  {mediaPreview.type === "image" ? (
                    <img src={mediaPreview.url} className="upldimg" />
                  ) : (
                    <video src={mediaPreview.url} className="upldimg" controls />
                  )}
                  <button type="button" onClick={removeMedia}>
                    ✕
                  </button>
                </div>
              )}

              {!mediaPreview && (
                <div
                  className="img_wrap"
                  onClick={() =>
                    document.getElementById("ppv-file-input")?.click()
                  }
                >
                  <svg className="icons idshape size-45" />
                </div>
              )}

              <input
                id="ppv-file-input"
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (!selectedFile) return;

                  const isImage = selectedFile.type.startsWith("image/");
                  const isVideo = selectedFile.type.startsWith("video/");

                  if (formik.values.requestType === "PHOTO" && !isImage) {
                    showError("Upload image for Photo request");
                    return;
                  }

                  if (formik.values.requestType === "VIDEO" && !isVideo) {
                    showError("Upload video for Video request");
                    return;
                  }

                  const previewUrl = URL.createObjectURL(selectedFile);

                  setMediaPreview({
                    file: selectedFile,
                    url: previewUrl,
                    type: isImage ? "image" : "video",
                  });
                }}
              />
            </div>
          </div>
          <div>
            <label>Offer your price $</label>
            <input
              type="number"
              placeholder="20.00"
              value={formik.values.offerPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="offerPrice"
            />
            {formik.touched.offerPrice && formik.errors.offerPrice && (
              <span className="error-message">{formik.errors.offerPrice}</span>
            )}
          </div>
          <p>Final price will be confirmed by the creator before payment.</p>
          <div>
            <label className="small">Payment Method</label>

            <label>
              <input
                type="radio"
                checked={paymentMethod === "wallet"}
                onChange={() => setPaymentMethod("wallet")}
              />
              Wallet
            </label>

            <label>
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Card
            </label>
          </div>
          {paymentMethod === "card" && (
         <CustomSelect
  label="Select Card"
  value={selectedCard}
  options={cards.map((card) => ({
    label: `${card.cardholderName} - **** ${card.cardNumber}`,
    value: card._id,
  }))}
  onChange={(value) => {
    // CustomSelect can return string or string[], handle both cases
    if (Array.isArray(value)) {
      setSelectedCard(value[0] ?? null); // pick first or null
    } else {
      setSelectedCard(value);
    }
  }}
/>
          )}
          <div className="actions">
            <button onClick={() => formik.handleSubmit()} disabled={loading}>
              {loading ? "Sending..." : "Send Request"}
            </button>

            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PPVRequestModal;
