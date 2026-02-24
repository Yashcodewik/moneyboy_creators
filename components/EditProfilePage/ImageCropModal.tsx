"use client";
import React, { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { CgClose } from "react-icons/cg";
import getCroppedImg from "@/libs/cropImage";
import { RotateCw, FlipHorizontal, FlipVertical, RefreshCcw, ZoomIn, ZoomOut, Crop, RectangleVertical, RectangleHorizontal, Square, } from "lucide-react";

interface Props { show: boolean; image: string | null; aspect?: number; onClose: () => void; onSave: (img: string) => void; }

const RATIOS = [
  { value: 1, icon: Square, label: "1:1" },
  { value: 4 / 5, icon: RectangleVertical, label: "4:5" },
  { value: 16 / 9, icon: RectangleHorizontal, label: "16:9" },
  { value: undefined, icon: Crop, label: "Free" },
];

export default function ImageCropModal({ show, image, aspect = 1, onClose, onSave, }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [ratioIndex, setRatioIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(aspect);
  const [croppedPixels, setCroppedPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const changeRatio = () => {
    const next = (ratioIndex + 1) % RATIOS.length;
    setRatioIndex(next);
    setAspectRatio(RATIOS[next].value);
  };

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedPixels(pixels);
  }, []);

  const handleSave = async () => {
    if (!image || !croppedPixels) return;
    setLoading(true);
    const cropped = await getCroppedImg(image, croppedPixels, rotation, flip);
    setLoading(false);
    onSave(cropped);
    onClose();
  };

  const resetCrop = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setFlip({ horizontal: false, vertical: false });
  };

  if (!show || !image) return null;

  return (
    <div className="modal show" role="dialog">
      <form className="modal-wrap imgcrop-modal" onSubmit={(e) => e.preventDefault()}>
        <button type="button" className="close-btn" onClick={onClose}><CgClose size={22} /></button>
        <h3 className="title">Edit Image</h3>
        <div className="img_wrap">
          <Cropper image={image} crop={crop} zoom={zoom} rotation={rotation} aspect={aspectRatio} onCropChange={setCrop} onZoomChange={setZoom} onRotationChange={setRotation} onCropComplete={onCropComplete} />
        </div>
        <div className="controlers_wrap btntooltip_wrapper">
          <button type="button" className="active-down-effect" data-tooltip="Zoom Out" onClick={() => setZoom((z) => Math.max(1, z - 0.2))}><ZoomOut size={20} /></button>
          <button type="button" className="active-down-effect" data-tooltip="Zoom In" onClick={() => setZoom((z) => Math.min(3, z + 0.2))}> <ZoomIn size={20} /></button>
          <button type="button" className="active-down-effect" data-tooltip="Rotate" onClick={() => setRotation((r) => (r + 90) % 360)}> <RotateCw size={20} /></button>
          <button type="button" className="active-down-effect" data-tooltip="Flip Horizontal" onClick={() =>   setFlip((f) => ({ ...f, horizontal: !f.horizontal })) }> <FlipHorizontal size={20} /></button>
          <button type="button" className="active-down-effect" data-tooltip="Flip Vertical" onClick={() =>   setFlip((f) => ({ ...f, vertical: !f.vertical })) }> <FlipVertical size={20} /></button>
          {/* <button type="button" className="active-down-effect" data-tooltip="Change Ratio" onClick={changeRatio}> {React.createElement(RATIOS[ratioIndex].icon, { size: 20 })}</button> */}
          <button type="button" className="active-down-effect" data-tooltip="Reset" onClick={resetCrop}><RefreshCcw size={20} /></button>
        </div>
        <div className="actions mt-3">
          <button className="premium-btn active-down-effect" type="button" onClick={handleSave} disabled={loading}><span>{loading ? "Processing..." : "Save"}</span></button>
        </div>
      </form>
    </div>
  );
}