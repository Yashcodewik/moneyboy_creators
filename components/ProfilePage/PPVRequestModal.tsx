"use client";

import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";
import { apiPost } from "@/utils/endpoints/common";
import { useState } from "react";
import { API_CREATE_PPV_REQUEST } from "@/utils/api/APIConstant";
interface PPVRequestModalProps {
  onClose: () => void;
  creator: {
    userId: string;
    displayName?: string;
    userName?: string;
    profile?: string;
  };
  post: any;
  onSuccess: (payload: { amount: number }) => void;
}
const PPVRequestModal = ({ onClose, creator, post, onSuccess }: PPVRequestModalProps) => {
  const [description, setDescription] = useState("");
const [offerPrice, setOfferPrice] = useState<number | "">("");
const [loading, setLoading] = useState(false);
const [requestType, setRequestType] = useState<"VIDEO" | "PHOTO" >("VIDEO") ;
const [file, setFile] = useState<File | null>(null);



const handleSendRequest = async () => {
  if (!offerPrice || offerPrice < 20) {
    alert("Minimum request price is 20€");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("postId", post._id);  
  formData.append("creatorId", creator.userId); 
  formData.append("type", requestType);      
  formData.append("price", offerPrice.toString());
  formData.append("description", description);

  if (file) {
    formData.append("file", file);
  }

  const res = await apiPost({
    url: API_CREATE_PPV_REQUEST,
    values: formData,
  });

  setLoading(false);

  if (res?.success) {
    onSuccess({ amount: offerPrice });
  } else {
    alert(res?.message || "Failed to send PPV request");
  }
};

  return (
    <>
    <div
        className="modal show"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap request-modal">
          <button className="close-btn">
            <CgClose size={22} onClick={onClose} />
          </button>
          <h3 className="title">PPV - Request Custom Content</h3>
          <div className="profile-card">
            <div className="profile-card__main justify-center">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  <img
                    src="/images/profile-avatars/profile-avatar-1.png"
                    alt="MoneyBoy Social Profile Avatar"
                  />
                </div>
              </div>
              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name">Gogo</div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">@gogo</div>
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
              value={requestType}
              onChange={(value) => setRequestType(value as "VIDEO" | "PHOTO")}
              options={[
                { label: "Video", value: "VIDEO" },
                { label: "Photo", value: "PHOTO" },
              ]}
            />
          </div>
          <div>
            <label>Request type</label>
            <textarea
              rows={3}
              placeholder="Describe what you’d like (tone, outfit, duration, etc.)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Upload reference file</label>

            <div className="upload-wrapper">
              <div className="img_wrap">

                {/* SVG stays unchanged */}
                <svg
                  className="icons idshape size-45"
                  onClick={() => document.getElementById("ppv-file-input")?.click()}
                />
                <input
                  id="ppv-file-input"
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <label>Offer your price</label>
           <input
              className="form-input"
              type="number"
              placeholder="10.99"
              value={offerPrice}
              onChange={(e) => setOfferPrice(Number(e.target.value))}
            />

          </div>
          <div className="">
            <p className="boldblack">Minimum request price: 20€</p>
            <p>Final price will be confirmed by the creator before payment.</p>
          </div>
          <div className="actions">
            <button className="premium-btn active-down-effect"
            onClick={handleSendRequest}
            disabled={loading}
            >
              <span>{loading ? "Sending..." : "Send Request"}</span>
            </button>
            <button className="active-down-effect" onClick={onClose}>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PPVRequestModal;
