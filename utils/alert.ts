import Swal from "sweetalert2";

const baseConfig = {
    buttonsStyling: false,
    allowOutsideClick: false,
    reverseButtons: true, // optional: Yes on right

  customClass: {
    actions: "actionsbtn-wrapper",
    confirmButton: "premium-btn active-down-effect",
    cancelButton: "btn-danger active-down-effect",
  },
};
export const showSuccess = (message: string) =>
  Swal.fire({
    ...baseConfig,
    icon: "success",
    title: message,
    confirmButtonText: "<span>OK</span>",
  });

export const showError = (message: string) =>
  Swal.fire({
    ...baseConfig,
    icon: "error",
    title: message,
    confirmButtonText: "<span>OK</span>",
  });

export const showWarning = (message: string) =>
  Swal.fire({
    ...baseConfig,
    icon: "warning",
    title: message,
    confirmButtonText: "<span>OK</span>",
  });

export const showInfo = (message: string) =>
  Swal.fire({
    ...baseConfig,
    icon: "info",
    title: message,
    confirmButtonText: "<span>OK</span>",
  });

export const showQuestion = async (message: string) => {
  const res = await Swal.fire({
    ...baseConfig,
    icon: "question",
    title: message,
    showCancelButton: true,
    confirmButtonText: "<span>Yes</span>",
    cancelButtonText: "<span>No</span>",
  });

  return res.isConfirmed;
};
// import Swal from "sweetalert2";

// const baseConfig = {
//   showConfirmButton: false,
//   timerProgressBar: true,
//   position: "center" as const,
// };

// export const showSuccess = (message: string) => {
//   Swal.fire({
//     icon: "success",
//     title: message,
//     timer: 2000,
//     ...baseConfig,
//   });
// };

// export const showError = (message: string) => {
//   Swal.fire({
//     icon: "error",
//     title: message,
//     timer: 2500,
//     ...baseConfig,
//   });
// };

// export const showWarning = (message: string) => {
//   Swal.fire({
//     icon: "warning",
//     title: message,
//     timer: 2500,
//     ...baseConfig,
//   });
// };

// export const showInfo = (message: string) => {
//   Swal.fire({
//     icon: "info",
//     title: message,
//     timer: 2500,
//     ...baseConfig,
//   });
// };

// export const showQuestion = async (message: string) => {
//   const result = await Swal.fire({
//     icon: "question",
//     title: message,
//     showCancelButton: true,
//     confirmButtonText: "Yes",
//     cancelButtonText: "No",
//   });

//   return result.isConfirmed;
// };