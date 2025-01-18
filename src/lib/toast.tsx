import { ConfettiToast } from "@/components/ui/confetti-toast";
import { confettiPatterns } from "@/lib/confetti";
import { Loader2, X } from "lucide-react";
import { ReactNode } from "react";
import { toast, ToasterProps } from "sonner";

// Export common toast configuration for reuse
export const toastConfig: Partial<ToasterProps> = {
  richColors: true,
  position: "top-right",
  closeButton: true,
  theme: "light",
  className: "toaster-wrapper",
  expand: false,
  duration: 3000,
  visibleToasts: 3,
  toastOptions: {
    className: "toast",
    style: {
      background: "white",
      color: "black",
      border: "1px solid #E2E8F0",
    },
  },
};

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  description?: string;
  onDismiss?: () => void;
  position?: ToasterProps["position"];
  loading?: boolean;
  progress?: number;
  cancelButton?: boolean;
  onCancel?: () => void;
}

const defaultOptions: Partial<ToastOptions> = {
  duration: 3000,
};

const ToastContent = ({
  message,
  description,
}: {
  message: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium">{message}</p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(
      () => (
        <ToastContent message={message} description={options?.description} />
      ),
      {
        ...defaultOptions,
        ...options,
        className: "toast-success",
      }
    );
  },
  error: (message: string, options?: ToastOptions) => {
    toast.error(
      () => (
        <ToastContent message={message} description={options?.description} />
      ),
      {
        ...defaultOptions,
        ...options,
        duration: options?.duration || 5000,
        className: "toast-error",
      }
    );
  },
  info: (message: string, options?: ToastOptions) => {
    toast.info(
      () => (
        <ToastContent message={message} description={options?.description} />
      ),
      {
        ...defaultOptions,
        ...options,
        className: "toast-info",
      }
    );
  },
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(
      () => (
        <ToastContent message={message} description={options?.description} />
      ),
      {
        ...defaultOptions,
        ...options,
        className: "toast-warning",
      }
    );
  },
  celebration: (
    message: string,
    options?: ToastOptions & { pattern?: keyof typeof confettiPatterns }
  ) => {
    toast.custom(
      () => (
        <ConfettiToast
          message={message}
          description={options?.description}
          pattern={options?.pattern}
        />
      ),
      {
        ...defaultOptions,
        ...options,
        className: "toast-success",
        duration: 5000,
      }
    );
  },
  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading?: string;
      success?: string;
      error?: string;
    } = {}
  ) => {
    const {
      loading = "Carregando...",
      success = "Operação concluída",
      error = "Ocorreu um erro",
    } = messages;
    return toast.promise<T>(promise, {
      loading: loading,
      success: success,
      error: error,
    });
  },
  custom: (
    message: string,
    {
      icon,
      ...options
    }: ToastOptions & {
      icon?: ReactNode;
    } = {}
  ) => {
    toast(
      () => (
        <div className="flex items-start gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <ToastContent message={message} description={options.description} />
        </div>
      ),
      {
        ...defaultOptions,
        ...options,
      }
    );
  },
  loading: (message: string, options?: ToastOptions) => {
    return toast.custom(
      () => (
        <div className="flex items-center gap-3">
          <Loader2 className="h-4 w-4 animate-spin" />
          <ToastContent message={message} description={options?.description} />
        </div>
      ),
      {
        ...defaultOptions,
        ...options,
        duration: Infinity,
        className: "toast-loading",
      }
    );
  },
  progress: (
    message: string,
    options?: ToastOptions & { progress?: number }
  ) => {
    return toast.custom(
      () => (
        <div className="relative">
          <ToastContent message={message} description={options?.description} />
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${options?.progress ?? 0}%` }}
            />
          </div>
        </div>
      ),
      {
        ...defaultOptions,
        ...options,
        className: "toast-progress",
      }
    );
  },
  cancelable: (message: string, options?: ToastOptions) => {
    return toast.custom(
      () => (
        <div className="flex items-start justify-between gap-2">
          <ToastContent message={message} description={options?.description} />
          {options?.cancelButton && (
            <button
              onClick={options.onCancel}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
      {
        ...defaultOptions,
        ...options,
        className: "toast-cancelable",
      }
    );
  },
};
