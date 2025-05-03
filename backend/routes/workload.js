import { Router } from "express";
import fetchGpuPricing from "../service/aceCloudApi.js";

const workloadRouter = Router();

workloadRouter.post("/", async (req, res) => {
    const input = req.body;

    // if (!input || !input.modelType || !input.datasetSize || !input.budget || !input.prefferdRegion || !input.mode) {
    //     return res.status(400).json({ error: 'Missing required fields in request body.' });
    // }

    try {
        const gpuOptions = await fetchGpuPricing(input.prefferdRegion);
        // const recommendations = recommendInstance(input, gpuOptions);
        res.status(200).json({ 
            success: true,
            message: 'Workload processed successfully.',
            recommendations: gpuOptions 
        });
    } catch (err) {
        console.error('Workload processing error:', err);
        res.status(500).json({ error: 'Failed to process workload.' });
    }

});


export default workloadRouter;