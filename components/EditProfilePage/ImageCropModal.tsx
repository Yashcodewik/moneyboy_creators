"use client";

import React, { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { CgClose } from "react-icons/cg";
import getCroppedImg from "@/libs/cropImage";

interface Props {
  show: boolean;
  image: string | null;
  aspect?: number;
  onClose: () => void;
  onSave: (img: string) => void;
}

export default function ImageCropModal({
  show,
  image,
  aspect = 1,
  onClose,
  onSave,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedPixels(pixels);
  }, []);

  const handleSave = async () => {
    if (!image || !croppedPixels) return;

    setLoading(true);
    const cropped = await getCroppedImg(image, croppedPixels);
    setLoading(false);
    onSave(cropped);
    onClose();
  };

  if (!show || !image) return null;

  return (
    <div className="modal show" role="dialog">
      <form
        className="modal-wrap imgcrop-modal"
        onSubmit={(e) => e.preventDefault()}
      >
        <button type="button" className="close-btn" onClick={onClose}>
          <CgClose size={22} />
        </button>

        <h3 className="title">Edit Image</h3>

        <div
          className="img_wrap"
          style={{ position: "relative", height: 350 }}
        >
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom slider */}
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-100 mt-3"
        />

        <div className="actions">
          <button
            className="premium-btn active-down-effect"
            type="button"
            onClick={handleSave}
            disabled={loading}
          >
            <span>{loading ? "Processing..." : "Save"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
