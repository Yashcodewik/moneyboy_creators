import Swal, { SweetAlertIcon } from "sweetalert2";

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

const autoAlert = (icon: SweetAlertIcon, message: string, timer = 2200) => {
  Swal.fire({...baseConfig, icon, title: message, showConfirmButton: false, timer, timerProgressBar: true,
    didOpen: (toast) => {toast.addEventListener("mouseenter", Swal.stopTimer); toast.addEventListener("mouseleave", Swal.resumeTimer);},
  });
};

export const showSuccess = (message: string) =>
  autoAlert("success", message);

export const showError = (message: string) =>
  autoAlert("error", message, 2600);

export const showWarning = (message: string) =>
  autoAlert("warning", message, 2600);

export const showInfo = (message: string) =>
  autoAlert("info", message, 2400);

export const showQuestion = async (message: string): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    icon: "question",
    title: message,
    showCancelButton: true,
    confirmButtonText: "<span>Yes</span>",
    cancelButtonText: "<span>No</span>",
    focusCancel: true,
  });

  return result.isConfirmed;
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