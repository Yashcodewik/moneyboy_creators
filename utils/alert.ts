import Swal, { SweetAlertIcon } from "sweetalert2";
import "@/public/styles/style.scss";
import { X } from "lucide-react";
import { createRoot } from "react-dom/client";

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
const autoAlert = (icon: SweetAlertIcon, message: string, timer = 2200) => {
  Swal.fire({
    ...baseConfig,
    icon,
    title: message,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

/* ================= SIMPLE ALERTS ================= */
export const showSuccess = (msg: string) => autoAlert("success", msg);
export const showError = (msg: string) => autoAlert("error", msg, 2600);
export const showWarning = (msg: string) => autoAlert("warning", msg, 2600);
export const showInfo = (msg: string) => autoAlert("info", msg, 2400);

export const showQuestion = async (
  message: string,
  confirmText = "Yes",
  cancelText = "No",
  useHtml = false,  // ← add this param
): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    icon: "question",
    // Use either `title` or `html` based on flag
    ...(useHtml ? { html: message } : { title: message }),
    showCancelButton: true,
    confirmButtonText: `<span>${confirmText}</span>`,
    cancelButtonText: `<span>${cancelText}</span>`,
    focusCancel: true,
  });

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
          <label class="radio_wrap"><input type="checkbox" name="consent[]" value="accept" id="accept"> I accept the <a href="/terms" target="_blank" class="theam_link">Terms & Conditions</a></label>
          <label class="radio_wrap"><input type="checkbox" name="consent[]" value="tag" id="tag"> I Allow Myself To Be Tagged In This Post</label>
        </div>
      </div>
    `,
    confirmButtonText: "<span>Accept & Continue</span>",

    preConfirm: () => {
      const selected = document.querySelector(
        'input[name="consent[]"]:checked',
      ) as HTMLInputElement | null;
      if (!selected) {
        Swal.showValidationMessage("Please select an option");
        return false;
      }
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
      const textarea = document.getElementById(
        "declineNote",
      ) as HTMLTextAreaElement;
      const counter = document.getElementById("charCount");
      textarea.focus();
      textarea.addEventListener("input", () => {
        if (counter) counter.textContent = textarea.value.length.toString();
      });
    },

    preConfirm: () => {
      const note = (
        document.getElementById("declineNote") as HTMLTextAreaElement
      ).value;
      if (!note.trim()) {
        Swal.showValidationMessage("Please enter a reason");
        return false;
      }
      return note;
    },
  });

  if (result.isConfirmed) {
    showWarning("Post declined");
    return result.value;
  }
  showInfo("Decline cancelled");
  return null;
};


/* ========== TAGGED USER LIST MODAL ========== */
export const showTaggedUserList = async (collaborators: any[] = []) => {
  if (!collaborators.length) {
    showInfo("No tagged users");
    return;
  }

  const listHtml = collaborators
    .map((collab: any) => {
      const user = collab?.user || collab || {};

      return `
        <li class="tagged-user-item" data-username="${user.userName || ""}">
          ${
            user.profile
              ? `<img src="${user.profile}" class="user_icons" alt="${user.userName || "user"}" onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';"/>`
              : `<div class="nomedia"><span>${(user.userName || "U").charAt(0).toUpperCase()}</span></div>`
          }
          <span>@${user.userName || "unknown"}</span>
        </li>
      `;
    })
    .join("");
  const result = await Swal.fire({
    ...baseConfig,
    title: "Tagged Users",
    showCloseButton: true,
    closeButtonHtml: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    showConfirmButton: true,
    confirmButtonText: `<span>Done</span>`,
    html: `
      <div class="tagged_userlist">
        <div class="user-dropdown">
          <ul>${listHtml}</ul>
        </div>
      </div>
    `,
    didOpen: (popup) => {
      const items = popup.querySelectorAll(".tagged-user-item");
      items.forEach((item) => {
        item.addEventListener("click", () => {
          const element = item as HTMLElement;
          const username = element.getAttribute("data-username");
          if (username) {
            window.location.href = `/${username}`;
          }
        });
      });
    },
  });

  return result;
};
// export const showTaggedUserList = async (collaborators: any[] = []) => {
//   if (!collaborators.length) { showInfo("No tagged users"); return; }
//   const listHtml = collaborators
//     .map((collab: any) => {
//       const user = collab?.user || {};
//       return `
//         <li class="tagged-user-item" data-username="${user.userName || ""}">
//           ${user.profile
//             ? `<img src="${user.profile}" class="user_icons" alt="${user.userName || "user"}"  onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';"/>`
//             : `<div class="nomedia"><span>${(user.userName || "U").charAt(0).toUpperCase()}</span></div>`
//           }
//           <span>@${user.userName || "unknown"}</span>
//         </li>
//       `;
//     })
//     .join("");
//   const result = await Swal.fire({
//     ...baseConfig,
//     title: "Tagged Users",
//     showCloseButton: true,
//     closeButtonHtml: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
//     showConfirmButton: true,
//     confirmButtonText: `<span>Done</span>`,
//     html: `
//       <div class="tagged_userlist">
//         <div class="user-dropdown">
//           <ul>${listHtml}</ul>
//         </div>
//       </div>
//     `,
//     didOpen: (popup) => {
//       const items = popup.querySelectorAll(".tagged-user-item");
//       items.forEach((item) => {
//         item.addEventListener("click", () => {
//           const element = item as HTMLElement;
//           const username = element.getAttribute("data-username");
//           if (username) {
//             window.location.href = `/${username}`;
//           }
//         });
//       });
//     },
//   });

//   return result;
// };