import { FormType } from "@/types/form.types";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

type ApiResult = {
  country: string;
  currency: string;
  flavor_id: string;
  gpu_description: string;
  is_gpu: number;
  is_public: number;
  is_spot: number;
  operating_system: string;
  price_per_hour: number;
  price_per_month: number;
  price_per_spot: number;
  ram: number;
  region: string;
  resource: string;
  resource_class: string;
  resource_name: string;
  resource_type: string;
  vcpus: number;
};


interface ApiContextType {
  data: ApiResult[];
  setData: React.Dispatch<React.SetStateAction<ApiResult[]>>;
  fetchGpus: (formData: FormType) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApiContext = (): ApiContextType => {
  const context = useContext(ApiContext)
  if (!context) {
      throw new Error("useApiContext must be used within a ApiContextProvider");
  }
  return context;
}

export const ApiContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data,setData] = useState<ApiResult[]>([]);

  const fetchGpus = async (formData: FormType) : Promise<void> => {
    try {
      const response = await axios.post("http://localhost:8000/workload", formData);
      if(response.data.recommendations){
        setData(response.data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching GPUs:", error);
    }
    
  }

  return <ApiContext.Provider value={{data, setData, fetchGpus}}>{children}</ApiContext.Provider>;
};
