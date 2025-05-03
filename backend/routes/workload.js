import { Router } from "express";
import fetchGpuPricing from "../service/aceCloudApi.js";
import { recommendInstance } from "../service/recommendInstance.js";

const workloadRouter = Router();

workloadRouter.post("/", async (req, res) => {
    const input = req.body;

    // if (!input || !input.modelType || !input.datasetSize || !input.budget || !input.prefferdRegion || !input.mode) {
    //     return res.status(400).json({ error: 'Missing required fields in request body.' });
    // }

    try {
        const gpuOptions = await fetchGpuPricing(input.prefferdRegion);
        const recommendations = recommendInstance(input.modelType, input.datasetSize, input.mode, gpuOptions);

        if(input.budget === 0) {
            return res.status(200).json({ 
                success: true,
                message: 'No budget provided.',
                length: gpuOptions.length,
                filterGpus: 0,
                recommendations: recommendations[0] || [],
                unfiltered: gpuOptions
            });
        }
        
        const filterGpus = recommendations.filter((option) => {
            return option.totalCost <= input.budget
        })

        if (filterGpus.length === 0) {
            
            return res.status(200).json({ 
                success: true,
                message: 'No GPUs found within the budget.',
                length: recommendations.length,
                filterGpus: filterGpus.length,
                recommendations: [recommendations[0]],
                unfiltered: gpuOptions
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'Workload processed successfully.',
            length: gpuOptions.length,
            filterGpus: filterGpus.length,
            recommendations: filterGpus 
        });

    } catch (err) {
        console.error('Workload processing error:', err);
        res.status(500).json({ error: 'Failed to process workload.' });
    }

});


export default workloadRouter;