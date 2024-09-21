import axios from "axios";
import url from "./server-connection";

export const postLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${url}/login`, data, {
      params: {
        useCookies: true,
      },
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          throw new Error("INVALID_CREDENTIALS");
        } else if (status === 403) {
          throw new Error("ACCOUNT_NOT_CONFIRMED");
        } else {
          throw new Error("GENERAL_ERROR");
        }
      } else {
        throw new Error("UNEXPECTED_ERROR");
      }
    } else {
      throw new Error("UNEXPECTED_ERROR");
    }
  }
};

export const postPost = async (formData: FormData) => {
  // Log each key-value pair in the FormData
  const formDataObject: { [key: string]: string | Blob } = {};

  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Log the plain object
  console.log("FormData Object:", formDataObject);
  // try {
  //   const response = await axios.post(`${url}/api/Posts`, formData, {
  //     params: {
  //       useCookies: true,
  //     },
  //     withCredentials: true,
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });

  //   return response.data;
  // } catch (error: unknown) {
  //   if (axios.isAxiosError(error)) {
  //     if (error.response) {
  //       const status = error.response.status;
  //       if (status === 401) {
  //         throw new Error("INVALID_CREDENTIALS");
  //       } else if (status === 403) {
  //         throw new Error("ACCOUNT_NOT_CONFIRMED");
  //       } else {
  //         throw new Error("GENERAL_ERROR");
  //       }
  //     } else {
  //       throw new Error("UNEXPECTED_ERROR");
  //     }
  //   } else {
  //     throw new Error("UNEXPECTED_ERROR");
  //   }
  // }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${url}/api/Posts`, {
      params: {
        useCookies: true,
      },
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          throw new Error("INVALID_CREDENTIALS");
        } else if (status === 403) {
          throw new Error("ACCOUNT_NOT_CONFIRMED");
        } else {
          throw new Error("GENERAL_ERROR");
        }
      } else {
        throw new Error("UNEXPECTED_ERROR");
      }
    } else {
      throw new Error("UNEXPECTED_ERROR");
    }
  }
};

export const postLogout = async () => {
  const response = await axios.post(
    `${url}/logout`,
    {},
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const postRegister = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  terms: boolean;
}) => {
  const response = await axios.post(`${url}/register`, data);
  return response.data;
};

export const sendResetPasswordEmail = async (data: { email: string }) => {
  const emailRequest = {
    email: data.email,
  };
  const response = await axios.post(`${url}/forgotPassword`, emailRequest);
  return response.data;
};

export const resetPassword = async (data: {
  email: string;
  resetCode: string;
  newPassword: string;
}) => {
  const response = await axios.post(`${url}/resetPassword`, {
    email: data.email,
    resetCode: data.resetCode,
    newPassword: data.newPassword,
  });

  return response.data;
};

export const postSubscriberPlan = async (data: {
  price: number;
  description: string;
  plan: string;
}) => {
  let plan: number = 0;

  if (data.plan.includes("elite")) {
    plan = 0;
  }
  if (data.plan.includes("standard")) {
    plan = 1;
  }

  const objForApi = {
    price: data.price,
    description: data.description,
    plan: plan,
  };

  const response = await axios.post(`${url}/SubscriptionPlan`, objForApi, {
    params: {
      useCookies: true,
    },
    withCredentials: true,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getSubscriptionPlans = async () => {
  const response = await axios.get(`${url}/SubscriptionPlan`, {
    params: {
      useCookies: true,
    },
    withCredentials: true,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteSubscribtionPlan = async (id: number) => {
  const response = await axios.delete(`${url}/SubscriptionPlan/${id}`, {
    params: {
      useCookies: true,
    },
    withCredentials: true,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getUserData = async () => {
  const response = await axios.get(`${url}/UserData`, {
    params: {
      useCookies: true,
    },
    withCredentials: true,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const checkEmailExists = async (email: string) => {
  try {
    await axios.post(`${url}/checkEmailExists`, { email });
    return true;
  } catch {
    return false;
  }
};

const planStringToNumberMap: { [key: string]: number } = {
  standard: 1,
  elite: 0,
};

export const updateSubscriptionPlan = async (planData: {
  id: string;
  price: number;
  description: string;
  plan: string;
}) => {
  const planNumber =
    planStringToNumberMap[planData.plan as keyof typeof planStringToNumberMap];

  const response = await axios.put(
    `${url}/SubscriptionPlan/${planData.id}`,
    {
      price: planData.price,
      description: planData.description,
      plan: planNumber,
    },
    {
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};
