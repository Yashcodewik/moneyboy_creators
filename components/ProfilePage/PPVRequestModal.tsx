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
const PPVRequestModal = ({
  onClose,
  creator,
  post,
  onSuccess,
}: PPVRequestModalProps) => {
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
      <div className="modal show" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
        <div className="modal-wrap request-modal">
          <button className="close-btn">
            <CgClose size={22} onClick={onClose} />
          </button>
          <h3 className="title">PPV - Request Custom Content</h3>
          {/* <div className="modal-body"> */}
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
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 66 54"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="animate-m"
                            d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z"
                            fill="url(#paint0_linear_4470_53804)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4470_53804"
                              x1="0"
                              y1="27"
                              x2="66"
                              y2="27"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FDAB0A" />
                              <stop offset="0.4" stopColor="#FECE26" />
                              <stop offset="1" stopColor="#FE990B" />
                            </linearGradient>
                          </defs>
                        </svg>
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
                        alt="MoneyBoy Social Profile Badge"
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
              <label>Desctiption</label>
              <textarea
                rows={3}
                placeholder="Describe what you’d like (tone, outfit, duration, etc.)"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="description"
              />
            </div>
            {formik.touched.description && formik.errors.description && (
              <span className="error-message">{formik.errors.description}</span>
            )}
            <div>
              <label>Upload reference file</label>

              <div className="upload-wrapper">
                {mediaPreview && (
                <div className="img_wrap">
                  {mediaPreview.type === "image" ? (
                    <img
                      src={mediaPreview.url}
                      className="img-fluid upldimg"
                      alt="preview"
                    />
                  ) : (
                    <video
                      src={mediaPreview.url}
                      className="img-fluid upldimg"
                      controls
                    />
                  )}
                  <button type="button" className="btn-danger" onClick={removeMedia}>
                    <CircleX size={16} />
                  </button>
                </div>
              )}
                {!mediaPreview && (
                <div className="img_wrap">
                  {/* SVG stays unchanged */}
                  <svg
                    className="icons idshape size-45"
                    onClick={() =>
                      document.getElementById("ppv-file-input")?.click()
                    }
                  />
                  
                </div>
                  )}
                 <input
                    id="ppv-file-input"
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (!selectedFile) return;

                    const isImage = selectedFile.type.startsWith("image/");
                    const isVideo = selectedFile.type.startsWith("video/");

                    // 🔥 strict validation based on request type
                    if (formik.values.requestType === "PHOTO" && !isImage) {
                      showError("You selected Request type Photo. Please upload an image for Photo request");
                      return;
                    }

                    if (formik.values.requestType === "VIDEO" && !isVideo) {
                      showError("You selected Request type Video. Please upload a video for Video request");
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
                className="form-input"
                type="number"
                placeholder="20.00"
                value={formik.values.offerPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="offerPrice"
              />
            </div>
            {formik.touched.offerPrice && formik.errors.offerPrice && (
              <span className="error-message">{formik.errors.offerPrice}</span>
            )}
            <div className="">
              {/* <p className="boldblack">Minimum request price: 20$</p> */}
              <p>Final price will be confirmed by the creator before payment.</p>
            </div>
            <div>
              <label className="small">Payment Method</label>
              <div className="select_wrap">
                <label className="radio_wrap">
                  <input type="radio" name="payment" value="wallet" checked={paymentMethod === "wallet"} onChange={() => setPaymentMethod("wallet")} />
                  <img src="/images/icons/wallet_icons.svg" alt="wallet" className="icons" />
                  <p>Pay With Wallet</p>
                </label>

                <label className="radio_wrap">
                  <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                  <img src="/images/icons/card_icons.svg" alt="card" className="icons" />
                  <p>Pay With Credit/Debit Card</p>
                </label>
              </div>
            </div>
            {paymentMethod === "card" &&
              <div>
                <label className="small">Choose Payment Method*</label>
                <CustomSelect
                  label="Select a Payment Card"
                  placeholder="Select a Payment Card"
                  value={selectedCard}
                  options={cards.map((card) => ({
                    label: `${card.cardholderName} - **** ${card.cardNumber}`,
                    value: card._id,
                  }))}
                  onChange={(val: any) => {
                    console.log("SELECTED VALUE:", val);
                    setSelectedCard(val);
                  }}
                />
              </div>
            }
            <div className="actions">
              <button
                className="premium-btn active-down-effect"
                onClick={() => formik.handleSubmit()}
                disabled={loading}
              >
                <span>{loading ? "Sending..." : "Send Request"}</span>
              </button>
              <button className="active-down-effect" onClick={onClose}>
                <span>Cancel</span>
              </button>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default PPVRequestModal;
