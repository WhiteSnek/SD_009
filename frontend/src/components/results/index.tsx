import { Card, CardContent } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { motion } from "framer-motion";

const getExplanation = (gpu: string, ram: number, vcpus: number): string => {
  return `We recommended this instance because it includes ${gpu}, ${ram}GB RAM and ${vcpus} vCPUs — ideal for running or fine-tuning large models like GPT-3.`;
};

const Results = () => {
  const { data } = useApiContext();

  return (
    <div className="my-20 min-h-screen p-6">
      <h2 className="text-white text-3xl font-semibold mb-6 text-center">Recommended GPU Instances</h2>
      {data.length === 0 ? <div>
        <p className="text-white text-lg text-center">No results found. Please try again.</p>
        <p className="text-gray-400 text-sm text-center">Make sure to select a model and region.</p>
      </div> :<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={item.flavor_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Card className="bg-zinc-900 text-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="text-xl font-bold">{item.gpu_description}</div>
                <div className="text-sm text-zinc-400">{item.resource_name}</div>
                <div className="flex flex-wrap gap-3 mt-4 text-sm">
                  <span className="bg-zinc-700 px-3 py-1 rounded-full">Region: {item.region}</span>
                  <span className="bg-zinc-700 px-3 py-1 rounded-full">RAM: {item.ram} GB</span>
                  <span className="bg-zinc-700 px-3 py-1 rounded-full">vCPUs: {item.vcpus}</span>
                  <span className="bg-zinc-700 px-3 py-1 rounded-full">OS: {item.operating_system}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-zinc-300">💵 <strong>${item.price_per_hour.toFixed(2)}</strong> / hour</p>
                  <p className="text-sm text-zinc-300">📅 <strong>${item.price_per_month}</strong> / month</p>
                </div>
                <div className="mt-4 text-sm text-zinc-400">
                  <strong>Why this GPU?</strong>
                  <p className="mt-1">{getExplanation(item.gpu_description, item.ram, item.vcpus)}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>}
    </div>
  );
};

export default Results;
