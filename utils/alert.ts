import Swal, { SweetAlertIcon } from "sweetalert2";
import "@/public/styles/style.scss";

/* ================= BASE CONFIG ================= */
const baseConfig = {
  buttonsStyling: false,
  allowOutsideClick: false,
  reverseButtons: true,
  customClass: {
    actions: "actionsbtn-wrapper",
    confirmButton: "premium-btn active-down-effect",
    cancelButton: "btn-danger active-down-effect",
  },
};

/* ================= AUTO ALERT ================= */
const autoAlert = (
  icon: SweetAlertIcon,
  message: string,
  timer = 2200
) => {
  Swal.fire({
    ...baseConfig, icon, title: message, showConfirmButton: false, timer, timerProgressBar: true,
    didOpen: (toast) => { toast.addEventListener("mouseenter", Swal.stopTimer); toast.addEventListener("mouseleave", Swal.resumeTimer); },
  });
};

/* ================= SIMPLE ALERTS ================= */
export const showSuccess = (msg: string) => autoAlert("success", msg);
export const showError = (msg: string) => autoAlert("error", msg, 2600);
export const showWarning = (msg: string) => autoAlert("warning", msg, 2600);
export const showInfo = (msg: string) => autoAlert("info", msg, 2400);

/* ================= YES / NO QUESTION ================= */
export const showQuestion = async (message: string): Promise<boolean> => {
  const result = await Swal.fire({ ...baseConfig, icon: "question", title: message, showCancelButton: true, confirmButtonText: "<span>Yes</span>", cancelButtonText: "<span>No</span>", focusCancel: true, });
  return result.isConfirmed;
};

/* ========== ACCEPT POST CONSENT MODAL ========== */
export const showAcceptPostConsent = async (): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    showCloseButton: true,
    closeButtonHtml: "&times;",
    title: "Accept Post",
    html: `
      <div class="selectcont_wrap">
        <p>Please confirm before publishing this post.</p>
        <div class="select_wrap">
          <label class="radio_wrap"><input type="checkbox" name="consent[]" value="accept" id="accept"> I accept the Terms & Conditions</label>
          <label class="radio_wrap"><input type="checkbox" name="consent[]" value="tag" id="tag"> I Allow Myself To Be Tagged In This Post</label>
        </div>
      </div>
    `,
    confirmButtonText: "<span>Accept & Continue</span>",

    preConfirm: () => {
      const selected = document.querySelector('input[name="consent"]:checked') as HTMLInputElement | null;
      if (!selected) { Swal.showValidationMessage("Please select an option"); return false; }
      return true;
    },
  });

  return result.isConfirmed;
};

/* ========== DECLINE REASON MODAL ========== */
export const showDeclineReason = async (): Promise<string | null> => {
  const result = await Swal.fire({
    ...baseConfig,
    showCloseButton: true,
    closeButtonHtml: "&times;",
    title: "Decline Post",
    html: `
      <div class="input-wrap">
        <label>Description</label>
        <textarea id="declineNote" class="swal2-textarea" maxlength="300" placeholder="Tell us why you decline..."> </textarea>
        <label class="right">0/300</label>
      </div>
    `,
    confirmButtonText: "<span>Submit</span>",
    showCancelButton: false,
    didOpen: () => {
      const textarea = document.getElementById("declineNote") as HTMLTextAreaElement;
      const counter = document.getElementById("charCount");
      textarea.focus();
      textarea.addEventListener("input", () => { if (counter) counter.textContent = textarea.value.length.toString(); });
    },

    preConfirm: () => {
      const note = (document.getElementById("declineNote") as HTMLTextAreaElement).value;
      if (!note.trim()) { Swal.showValidationMessage("Please enter a reason"); return false; }
      return note;
    },
  });

  if (result.isConfirmed) { showWarning("Post declined"); return result.value; }
  showInfo("Decline cancelled");
  return null;
};



// Just Show Timer Modal Start
// import Swal from "sweetalert2";

// const baseConfig = {
//     buttonsStyling: false,
//     allowOutsideClick: false,
//     reverseButtons: true,

//     customClass: {
//         actions: "actionsbtn-wrapper",
//         confirmButton: "premium-btn active-down-effect",
//         cancelButton: "btn-danger active-down-effect",
//     },
// };

// export const showSuccess = (message: string) => {
//     Swal.fire({
//         ...baseConfig,
//         icon: "success",
//         title: message,
//         timer: 2000,
//         showConfirmButton: false, // hide button for auto alerts
//     });
// };

// export const showError = (message: string) => {
//     Swal.fire({
//         ...baseConfig,
//         icon: "error",
//         title: message,
//         timer: 2500,
//         showConfirmButton: false,
//     });
// };

// export const showWarning = (message: string) => {
//     Swal.fire({
//         ...baseConfig,
//         icon: "warning",
//         title: message,
//         timer: 2500,
//         showConfirmButton: false,
//     });
// };

// /* INFO */
// export const showInfo = (message: string) => {
//     Swal.fire({
//         ...baseConfig,
//         icon: "info",
//         title: message,
//         timer: 2500,
//         showConfirmButton: false,
//     });
// };

// export const showQuestion = async (message: string) => {
//     const result = await Swal.fire({
//         ...baseConfig,
//         icon: "question",
//         title: message,
//         showCancelButton: true,
//         showConfirmButton: true,
//         confirmButtonText: "<span>Yes</span>",
//         cancelButtonText: "<span>No</span>",
//     });

//     return result.isConfirmed;
// };

// Working With Buttons Start
// import Swal from "sweetalert2";

// const baseConfig = {
//     buttonsStyling: false,
//     allowOutsideClick: false,
//     reverseButtons: true,
//     customClass: {
//         actions: "actionsbtn-wrapper",
//         confirmButton: "premium-btn active-down-effect",
//         cancelButton: "btn-danger active-down-effect",
//     },
// };
// export const showSuccess = (message: string) =>
//     Swal.fire({
//         ...baseConfig,
//         icon: "success",
//         title: message,
//         confirmButtonText: "<span>OK</span>",
//     });

// export const showError = (message: string) =>
//     Swal.fire({
//         ...baseConfig,
//         icon: "error",
//         title: message,
//         confirmButtonText: "<span>OK</span>",
//     });

// export const showWarning = (message: string) =>
//     Swal.fire({
//         ...baseConfig,
//         icon: "warning",
//         title: message,
//         confirmButtonText: "<span>OK</span>",
//     });

// export const showInfo = (message: string) =>
//     Swal.fire({
//         ...baseConfig,
//         icon: "info",
//         title: message,
//         confirmButtonText: "<span>OK</span>",
//     });

// export const showQuestion = async (message: string) => {
//     const res = await Swal.fire({
//         ...baseConfig,
//         icon: "question",
//         title: message,
//         showCancelButton: true,
//         confirmButtonText: "<span>Yes</span>",
//         cancelButtonText: "<span>No</span>",
//     });

//     return res.isConfirmed;
// };