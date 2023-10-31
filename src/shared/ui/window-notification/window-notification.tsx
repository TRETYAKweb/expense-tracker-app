import { useToast } from "react-native-toast-notifications";

export const openNotificationSuccess = (description: string): void => {
  const toast = useToast();

  toast.show(description, {
    type: "success",
    placement: "bottom",
    duration: 4000,
    animationType: "slide-in",
  });
};

export const openNotificationError = (description: string): void => {
  const toast = useToast();

  toast.show(description, {
    type: "danger",
    placement: "bottom",
    duration: 4000,
    animationType: "slide-in",
  });
};
