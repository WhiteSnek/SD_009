import React, { useState } from "react";
import { motion } from "framer-motion";
import { FormType } from "../../types/form.types";
import AutocompleteSelect from "./autocomplete";
import { Input } from "../ui/input";

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState<FormType>({
    modelType: "",
    datasetSize: 0,
    mode: "",
    budget: 0,
    preferredRegion: "ap-south-mum-1",
  });

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
  ]

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
        name === "datasetSize" || name === "budget" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
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
    <div className="w-full max-w-2xl mx-auto p-6 dark:bg-zinc-800 rounded-lg shadow-md h-full  bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
      <motion.h2
        className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Search Parameters
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
        <div className="grid grid-cols-2 justify-center items-center gap-4">
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Dataset Size (GB)
          </label>
          <Input
            type="number"
            name="datasetSize"
            value={formData.datasetSize}
            onChange={handleInputChange}
            min="0"
            step="1"
            className=" px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Mode
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="training"
                name="mode"
                value="training"
                checked={formData.mode === "training"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300 dark:border-zinc-600"
              />
              <label
                htmlFor="training"
                className="ml-2 text-sm text-zinc-700 dark:text-zinc-300"
              >
                Training
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="inference"
                name="mode"
                value="inference"
                checked={formData.mode === "inference"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300 dark:border-zinc-600"
              />
              <label
                htmlFor="inference"
                className="ml-2 text-sm text-zinc-700 dark:text-zinc-300"
              >
                Inference
              </label>
            </div>
          </div>
        </motion.div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-4">
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Budget (USD)
          </label>
          <Input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            min="0"
            step="100"
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Preferred Region
          </label>
          <AutocompleteSelect
            placeholder="Select Preferred Region"
            fetchSuggestions={fetchRegionSuggestions}
            onSelect={(selected) => {
              setFormData((prev) => ({ ...prev, preferredRegion: selected.id }));
            }}
          />
        </motion.div>
        </div>
        <motion.div variants={itemVariants} className="pt-4">
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Search
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default SearchForm;
