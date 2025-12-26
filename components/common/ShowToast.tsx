import toast from "react-hot-toast";

const toastStyles = (theme: "light" | "dark") => ({
  success: {
    background: theme === "dark" ? "linear-gradient(135deg, var(--color-card), var(--color-muted))" : "linear-gradient(135deg, #e8f5e9, #ffffff)",
    borderLeft: `6px solid var(--color-ring)`,
    color: "var(--color-foreground)",
    boxShadow: theme === "dark" ? "0px 0px 14px rgba(0, 0, 0, 0.4)" : "0px 0px 12px rgba(0, 0, 0, 0.15)",
  },
  error: {
    background: theme === "dark" ? "linear-gradient(135deg, #3b1a1a, #2a1a1a)" : "linear-gradient(135deg, #ffebee, #ffffff)",
    borderLeft: `6px solid var(--color-destructive)`,
    color: "var(--color-destructive)",
    boxShadow: theme === "dark" ? "0px 0px 14px rgba(0, 0, 0, 0.5)" : "0px 0px 12px rgba(0, 0, 0, 0.2)",
  },
  warning: {
    background:
      theme === "dark" ? "linear-gradient(135deg, #4c3b00, #2e2500)" : "linear-gradient(135deg, #fff9e6, #ffffff)",
    borderLeft: `6px solid var(--color-warning-foreground)`,
    color: "var(--color-warning-foreground)",
    boxShadow: theme === "dark" ? "0px 0px 14px rgba(0, 0, 0, 0.5)" : "0px 0px 12px rgba(0, 0, 0, 0.2)",
  },
});

const getTheme = (): "light" | "dark" =>
  typeof window !== "undefined" &&
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export default function ShowToast(
  message: string,
  type: "success" | "error" | "warning",
  position: | "top-center" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "bottom-center" = "top-center"
) {
  const theme = getTheme();
  const styleSet = toastStyles(theme)[type];

  const toastParam = {
    position,
    duration: 3000,
    style: { ...styleSet, borderRadius: "8px", padding: "12px 16px", fontSize: "0.95rem", fontWeight: 500,},
  };

  switch (type) {
    case "success": toast.success(message, toastParam); break;
    case "error": toast.error(message, toastParam); break;
    case "warning": toast(message, toastParam); break;
    default: toast(message, toastParam);
  }
}
