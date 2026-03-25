import React from "react";
import { CgClose } from "react-icons/cg";

interface ModalProps {show: boolean; title?: string; onClose: () => void; children: React.ReactNode; footer?: React.ReactNode; size?: "sm" | "md" | "lg" | "xl" | "fullscreen"; className?: string;}
const Modal: React.FC<ModalProps> = ({show, title, onClose, children, footer, size = "md", className = "",}) => {
  if (!show) return null;
  const getSizeClass = () => {
    switch (size) {
      case "sm": return "modal-sm";
      case "lg": return "modal-lg";
      case "xl": return "modal-xl";
      case "fullscreen": return "modal-fullscreen";
      default: return "";
    }
  };

  return (
    <>
      <div className={`modal fade show d-block ${className}`} tabIndex={-1}>
        <div className={`modal-dialog modal-dialog-centered ${getSizeClass()}`}>
          <div className="modal-content">
            {title && (
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button className="btn-close" onClick={onClose}><CgClose size={22} /></button>
              </div>
            )}
            <div className="modal-body">{children}</div>
            {footer && (
              <div className="modal-footer">{footer}</div>
            )}
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default Modal;