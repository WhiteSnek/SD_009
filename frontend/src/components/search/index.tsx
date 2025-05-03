import { useState } from "react";
import { motion } from "framer-motion";
import AutocompleteSelect from "./autocomplete";
import { Input } from "../ui/input";
import { useApiContext } from "@/context/ApiContext";
import { Settings, Globe, Database, CreditCard, Zap } from "lucide-react";
import { FormType } from "@/types/form.types";

const SearchForm = () => {
  const [formData, setFormData] = useState<FormType>({
    modelType: "",
    datasetSize: "small",
    mode: "",
    budget: 0,
    preferredRegion: "ap-south-mum-1",
  });

  const { fetchGpus } = useApiContext();

  const modelOptions = [
    { id: "gpt3", label: "GPT-3" },
    { id: "gpt4", label: "GPT-4" },
    { id: "claude", label: "Claude" },
    { id: "llama", label: "Llama" },
  ];

  const regionOptions = [
    { id: "ap-south-mum-1", label: "Mumbai" },
    { id: "us-east-1", label: "Virginia" },
    { id: "eu-west-1", label: "Ireland" },
    { id: "ap-southeast-1", label: "Singapore" },
    { id: "ap-northeast-1", label: "Tokyo" },
  ];

  const fetchModelSuggestions = async (query: string) => {
    return modelOptions.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  const fetchRegionSuggestions = async (query: string) => {
    return regionOptions.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
            name === "budget" ? Number(value) : value,
    });
  };

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    await fetchGpus(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl shadow-lg border border-zinc-700 backdrop-blur-lg bg-opacity-90">
      <motion.div
        className="flex items-center justify-center mb-8 space-x-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Settings className="w-6 h-6 text-blue-400" />
        <h2 className="text-3xl font-bold text-white">GPU Finder</h2>
      </motion.div>

      <motion.form
        onSubmit={() => handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-9">
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
          <label className="block text-sm font-medium text-blue-300 mb-2">
            Model Type
          </label>
          <AutocompleteSelect
            placeholder="Select Model Type"
            fetchSuggestions={fetchModelSuggestions}
            onSelect={(selected) => {
              setFormData((prev) => ({ ...prev, modelType: selected.id }));
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute left-3 top-9">
              <Database className="w-5 h-5 text-blue-400" />
            </div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Dataset Size (GB)
            </label>
            <select
              name="datasetSize"
              value={formData.datasetSize}
              onChange={handleInputChange}
              className="pl-10 py-2 w-full bg-zinc-800 border-zinc-600 text-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              required
            >
              <option value="small">Small (1-10 GB)</option>
              <option value="medium">Medium (10-50 GB)</option>
              <option value="large">Large (50-200 GB)</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute left-3 top-9">
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Budget (USD)
            </label>
            <Input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              min="0"
              step="100"
              className="pl-10 bg-zinc-800 border-zinc-600 text-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              required
            />
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700"
        >
          <label className="block text-sm font-medium text-blue-300 mb-3">
            Mode
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors cursor-pointer">
              <input
                type="radio"
                id="training"
                name="mode"
                value="training"
                checked={formData.mode === "training"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-600"
              />
              <label
                htmlFor="training"
                className="text-sm text-zinc-300 flex items-center"
              >
                <Zap className="w-4 h-4 text-blue-400 mr-2" />
                Training
              </label>
            </div>
            <div className="flex items-center space-x-3 bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors cursor-pointer">
              <input
                type="radio"
                id="inference"
                name="mode"
                value="inference"
                checked={formData.mode === "inference"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-600"
              />
              <label
                htmlFor="inference"
                className="text-sm text-zinc-300 flex items-center"
              >
                <Settings className="w-4 h-4 text-blue-400 mr-2" />
                Inference
              </label>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-9">
            <Globe className="w-5 h-5 text-blue-400" />
          </div>
          <label className="block text-sm font-medium text-blue-300 mb-2">
            Preferred Region
          </label>
          <AutocompleteSelect
            placeholder="Select Preferred Region"
            fetchSuggestions={fetchRegionSuggestions}
            onSelect={(selected) => {
              setFormData((prev) => ({
                ...prev,
                preferredRegion: selected.id,
              }));
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4">
          <motion.button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-5 h-5 mr-2" />
            Find GPUs
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default SearchForm;
