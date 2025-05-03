import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function NoResults() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center my-10 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <p className="text-white text-2xl font-semibold">No results found</p>
        <p className="text-gray-400 text-base">
          We couldn't find any GPUs matching your exact criteria.
        </p>
        <p className="text-gray-400 text-sm">
          You can request a GPU that fits your needs and we’ll work on it.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Button variant="outline" onClick={() => setOpen(true)} className="mt-2 text-black bg-white hover:bg-gray-100">
          Request GPU
        </Button>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <DialogHeader>
            <div className="flex items-center justify-center mb-2">
              <CheckCircle2 className="text-green-400 w-8 h-8" />
            </div>
            <DialogTitle className="text-white text-lg text-center">
              Request Submitted Successfully
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-400 mt-2 text-sm text-center">
            Your GPU request has been submitted. We'll notify you when it's available!
          </p>
          <DialogFooter className="mt-4 flex justify-center">
            <Button
              onClick={() => setOpen(false)}
              className="bg-zinc-800 text-white hover:bg-zinc-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 bg-zinc-800 text-gray-300 p-4 rounded-xl border border-zinc-700"
      >
        <p className="text-sm">
        <span className="font-medium text-white">Tip:</span> If you increase your budget slightly, we found some GPUs that match your requirements better.
        </p>
      </motion.div>
    </div>
  );
}
