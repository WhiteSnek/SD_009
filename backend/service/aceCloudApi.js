import { ACECLOUDAPI_BASE_URL } from '../config/env.js';
import axios from 'axios';

// ?is_gpu=true&resource=instances&region=ap-south-mum-1

async function fetchGpuPricing(region) {
    if (!region) {
        region = 'ap-south-mum-1'; // Default region
    }
    try {
        const response = await axios.get(`${ACECLOUDAPI_BASE_URL}`, {
            params: { 
                region,
                is_gpu: true,
                resource: 'instances'
            }
        });
        if (response.status !== 200) {
            throw new Error(`Error fetching GPU pricing: ${response.statusText}`);
        }
        
        return response.data.data;
    } catch (error) {
        console.error('Error fetching GPU pricing:', error.message);
        return [];
    }
}

export default fetchGpuPricing;
