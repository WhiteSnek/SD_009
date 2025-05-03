import { Card, CardContent } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { motion } from "framer-motion";
import NoResults from "./no-results";
import { BadgeDollarSign, Cpu, Globe, MemoryStick, TerminalSquare } from "lucide-react";

const Results = () => {
  const { data, inBudget } = useApiContext();
  if (data.length == 0) return <NoResults />;
  return (
    <div className="my-20 min-h-screen px-6">
      <h2 className="text-white text-4xl font-bold mb-10 text-center">
        Recommended GPU Instances
      </h2>
        {!inBudget && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, idx) => (
          <motion.div
            key={item.flavor_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-zinc-700">
              <CardContent className="p-6 space-y-5">
                <div className="text-xl font-bold tracking-tight">
                  {item.gpu_description}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                  <span className="bg-zinc-700 px-3 py-1 rounded-full flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Region: {item.region}
                  </span>
                  <span className="bg-zinc-700 px-3 py-1 rounded-full flex items-center gap-2">
                    <MemoryStick className="w-4 h-4" /> RAM: {item.ram} GB
                  </span>
                  <span className="bg-zinc-700 px-3 py-1 rounded-full flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> vCPUs: {item.vcpus}
                  </span>
                  <span className="bg-zinc-700 px-3 py-1 rounded-full flex items-center gap-2">
                    <TerminalSquare className="w-4 h-4" /> OS: {item.operating_system}
                  </span>
                </div>

                <div className="mt-4 space-y-1 text-sm">
                  <p className="text-green-400 flex items-center gap-1">
                    <BadgeDollarSign className="w-4 h-4" /> <strong>${item.price_per_hour.toFixed(2)}</strong> / hour
                  </p>
                  <p className="text-blue-400 flex items-center gap-1">
                    <BadgeDollarSign className="w-4 h-4" /> <strong>${item.price_per_month}</strong> / month
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-700 text-sm text-zinc-300">
                  <strong className="block text-white mb-1">Why this GPU?</strong>
                  <p className="leading-relaxed">{item.explanation}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Results;
