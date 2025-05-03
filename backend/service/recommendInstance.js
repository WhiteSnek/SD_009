
// Baseline resource needs per model (customize as needed)
const modelSpecs = {
    gpt3: {
      min_vram: 80,  // in GB
      min_ram: 96,   // in GB
      min_vcpus: 16,
      complexity_factor: 10  // Higher value indicates more computationally complex
    },
    "stable-diffusion": {
      min_vram: 24,  // in GB
      min_ram: 32,   // in GB
      min_vcpus: 8,
      complexity_factor: 7
    },
    yolov8: {
      min_vram: 16,  // in GB
      min_ram: 16,   // in GB
      min_vcpus: 4,
      complexity_factor: 6
    },
    bert: {
      min_vram: 32,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 8
    },
    "dalle-2": {
      min_vram: 32,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 9
    },
    resnet: {
      min_vram: 16,  // in GB
      min_ram: 32,   // in GB
      min_vcpus: 4,
      complexity_factor: 5
    },
    "vgg16": {
      min_vram: 16,  // in GB
      min_ram: 32,   // in GB
      min_vcpus: 4,
      complexity_factor: 5
    },
    "efficientnet": {
      min_vram: 16,  // in GB
      min_ram: 32,   // in GB
      min_vcpus: 4,
      complexity_factor: 6
    },
    "deeplabv3": {
      min_vram: 32,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 7
    },
    t5: {
      min_vram: 64,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 9
    },
    clip: {
      min_vram: 32,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 8
    },
    "deepspeech": {
      min_vram: 16,  // in GB
      min_ram: 16,   // in GB
      min_vcpus: 4,
      complexity_factor: 4
    },
    "wavenet": {
      min_vram: 32,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 8
    },
    "tacotron-2": {
      min_vram: 32,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 7
    },
    "alphafold": {
      min_vram: 64,  // in GB
      min_ram: 128,  // in GB
      min_vcpus: 16,
      complexity_factor: 10
    },
    "transformer": {
      min_vram: 64,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 9
    },
    "openaicodex": {
      min_vram: 32,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 8
    },
    "alphago": {
      min_vram: 16,  // in GB
      min_ram: 32,   // in GB
      min_vcpus: 8,
      complexity_factor: 6
    },
    "gpt-neo": {
      min_vram: 64,  // in GB
      min_ram: 64,   // in GB
      min_vcpus: 8,
      complexity_factor: 9
    }
};
  
// Dataset size multipliers
const datasetMultipliers = {
    small: 1,
    medium: 1.25,
    large: 1.5,
    huge: 2,
};

// Training vs Inference multipliers
const modeMultipliers = {
    training: 1,
    inference: 0.5,
};

function parseVRAM(description) {
    const match = description.match(/(\d+)x\s?[A-Za-z0-9\-]+?(\d+)(?:GB)/i);
    if (!match) return 0;
  
    const count = parseInt(match[1], 10);
    const size = parseInt(match[2], 10);
    return count * size;
}

// Estimate processing time for the dataset on the GPU
function estimateProcessingTime(datasetSize, complexityFactor, vram, vcpus) {
    console.log("Dataset Size:", datasetSize);
    console.log("Complexity Factor:", complexityFactor);
    console.log("VRAM:", vram);
    console.log("vCPUs:", vcpus);
    return (datasetSize * complexityFactor) / (vram * vcpus);
}
  
export function recommendInstance(model, datasetSize, mode,gpuOptions) {

    const modelSpec = modelSpecs[model.toLowerCase()];
    if (!modelSpec) {
        throw new Error(`Model type ${model} not recognized.`);
    }

    const datasetMultiplier = datasetMultipliers[datasetSize.toLowerCase()] || 1;
    const modeMultiplier = modeMultipliers[mode.toLowerCase()] || 1;

    const requiredVram = modelSpec.min_vram * datasetMultiplier * modeMultiplier;
    const requiredRam = modelSpec.min_ram * datasetMultiplier * modeMultiplier;
    const requiredVcpus = modelSpec.min_vcpus * datasetMultiplier * modeMultiplier;

    // Filter GPU options based on the calculated requirements
    const recommendedOptions = gpuOptions.reduce((acc, option) => {
        const description = option.gpu_description || option.description || "";
        const vram = parseVRAM(description);
    
        if (
            vram >= requiredVram &&
            option.ram >= requiredRam &&
            option.vcpus >= requiredVcpus
        ) {
            // Estimate processing time for each GPU (in seconds)
            const processingTime = estimateProcessingTime(
                datasetMultiplier,
                modelSpec.complexity_factor,
                vram,
                option.vcpus
            );

            acc.push({
                ...option,
                onDemand: option.price_per_hour,
                spot: option.price_per_spot,
                vram,
                totalCost: option.price_per_hour * processingTime,
                processingTime,
                explanation: `This instance is recommended for ${model} with a dataset size of ${datasetSize} in ${mode} mode. It meets the required specifications of VRAM: ${requiredVram} GB, RAM: ${requiredRam} GB, and vCPUs: ${requiredVcpus}.`,
            });
        }
    
        return acc;
    }, []);

    // Sort the recommended options by total cost (ascending)
    recommendedOptions.sort((a, b) => a.totalCost - b.totalCost);
    // return result;
    return recommendedOptions;

};
  