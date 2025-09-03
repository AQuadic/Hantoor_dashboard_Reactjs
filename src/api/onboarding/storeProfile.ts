import { axios } from "@/lib/axios";

export interface OnboardingData {
  image?: File;
  country_id: string;
  title?: {
    ar?: string;
    en?: string;
  };
  description?: {
    ar?: string;
    en?: string;
  };
}

export const createOnboarding = async (data: OnboardingData) => {
  try {
    const formData = new FormData();

    if (data.image) formData.append('image', data.image);
    formData.append('country_id', data.country_id);

    if (data.title) {
      if (data.title.ar) formData.append('title[ar]', data.title.ar);
      if (data.title.en) formData.append('title[en]', data.title.en);
    }

    if (data.description) {
      if (data.description.ar) formData.append('description[ar]', data.description.ar);
      if (data.description.en) formData.append('description[en]', data.description.en);
    }

    const response = await axios.post('/admin/setting/onboarding', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error creating onboarding:', error.response?.data || error.message);
    throw error;
  }
};
