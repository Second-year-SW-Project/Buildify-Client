// Defines the weights for the CPU scoring
const CPU_SCORE_WEIGHTS = {
  cores: 10,
  threads: 5,
  baseClock: 15,
  boostClock: 20,
};

// GPU scoring constants
const GPU_SCORE_WEIGHTS = {
  vramGB: 5,        // Base weight for VRAM, reduced to balance exponential scaling
  boostClockMHz: 0.01, // Reduced weight, used with logarithmic scaling
  cores: 0.005,     // Base weight for cores, reduced for exponential scaling
  tdp: 0.2,         // Weight for TDP (power potential)
  interfaceBandwidth: 2, // Weight for PCIe bandwidth
  powerDelivery: 3, // Weight for power connectors (indicative of performance capacity)
};

// GPU series multipliers (adjusted for modern features and performance tiers)
const GPU_SERIES_MULTIPLIERS = {
  GTX: 0.8,        // Older series, limited features
  'RTX 20': 0.9,   // Early ray tracing, basic DLSS
  'RTX 30': 1.1,   // Improved ray tracing, DLSS 2.0
  'RTX 40': 1.3,   // Advanced ray tracing, DLSS 3.0, higher efficiency
  'RTX 50': 1.5,   // Cutting-edge, AI-enhanced, future-proof
  'RX 5000': 0.9,  // Good performance, no ray tracing
  'RX 6000': 1.1,  // Ray tracing, FSR support
  'RX 7000': 1.3,  // Advanced ray tracing, FSR 3.0, competitive
  'ARC A': 0.9,    // Entry-level Arc, basic features
  'ARC B': 1.1,    // Improved Arc, better performance
};

// RAM scoring constants
const RAM_SCORE_WEIGHTS = {
  sizeGB: 0.9375, // 60/64
  speedMHz: 0.0067, // 40/6000
};

// RAM type multipliers
const RAM_TYPE_MULTIPLIERS = {
  DDR3: 0.9,
  DDR4: 1.0,
  DDR5: 1.1,
};

/**
 * Calculate CPU performance score
 * @param {Object} cpu - CPU component data
 * @param {number} cpu.cores - Number of CPU cores
 * @param {number} cpu.threads - Number of CPU threads
 * @param {number} cpu.baseClock - Base clock speed in GHz
 * @param {number} cpu.boostClock - Boost clock speed in GHz
 * @param {string} [cpu.brand='Generic'] - CPU brand
 * @returns {number} CPU performance score
 */
export function calculateCPUScore({ cores, threads, baseClock, boostClock, brand = 'Generic' }) {
  const parsedCores = parseFloat(cores) || 0;
  const parsedThreads = parseFloat(threads) || 0;
  const parsedBaseClock = parseFloat(baseClock) || 0;
  const parsedBoostClock = parseFloat(boostClock) || 0;

  const rawScore =
    (parsedCores * CPU_SCORE_WEIGHTS.cores) +
    (parsedThreads * CPU_SCORE_WEIGHTS.threads) +
    (parsedBaseClock * CPU_SCORE_WEIGHTS.baseClock) +
    (parsedBoostClock * CPU_SCORE_WEIGHTS.boostClock);
  
  return parseFloat(rawScore.toFixed(2));
}

/**
 * Calculate GPU performance score (advanced)
 * @param {Object} gpu - GPU component data
 * @param {number} gpu.vramGB - VRAM size in GB
 * @param {number} gpu.boostClockMHz - Boost clock speed in MHz
 * @param {number} gpu.cores - Number of GPU cores
 * @param {string} [gpu.series=''] - GPU series
 * @param {string} [gpu.brand='Generic'] - GPU brand
 * @param {number} [gpu.tdp=0] - Thermal Design Power in watts
 * @param {string} [gpu.interfaceType=''] - PCIe interface type
 * @param {string} [gpu.powerConnectors=''] - Power connector type
 * @returns {number} GPU performance score (0-1000 scale)
 */
export function calculateGPUScore({ vramGB, boostClockMHz, cores, series = '', brand = 'Generic', tdp = 0, interfaceType = '', powerConnectors = '' }) {
  const parsedVramGB = parseFloat(vramGB) || 0;
  const parsedBoostClockMHz = parseFloat(boostClockMHz) || 0;
  const parsedCores = parseFloat(cores) || 0;
  const parsedTdp = parseFloat(tdp) || 0;

  // Exponential scaling for VRAM and cores to emphasize high-end GPUs
  const vramScore = Math.pow(parsedVramGB, 1.5) * GPU_SCORE_WEIGHTS.vramGB;
  const coresScore = Math.pow(parsedCores / 1000, 1.3) * GPU_SCORE_WEIGHTS.cores * 1000;
  // Logarithmic scaling for boost clock to avoid over-dominance
  const clockScore = Math.log1p(parsedBoostClockMHz / 1000) * GPU_SCORE_WEIGHTS.boostClockMHz * 1000;
  // TDP score: moderate weight, capped to avoid over-favoring high power
  const tdpScore = Math.min(parsedTdp, 400) * GPU_SCORE_WEIGHTS.tdp;

  // Interface bandwidth score based on PCIe type
  let interfaceScore = 0;
  if (interfaceType) {
    const upperInterface = interfaceType.toUpperCase();
    if (upperInterface.includes('PCIE_5_0_X16')) interfaceScore = 100;
    else if (upperInterface.includes('PCIE_5_0_X8')) interfaceScore = 80;
    else if (upperInterface.includes('PCIE_4_0_X16')) interfaceScore = 70;
    else if (upperInterface.includes('PCIE_4_0_X8')) interfaceScore = 60;
    else if (upperInterface.includes('PCIE_3_0_X16')) interfaceScore = 50;
    else if (upperInterface.includes('PCIE_3_0_X8')) interfaceScore = 40;
  }
  const interfaceContribution = interfaceScore * GPU_SCORE_WEIGHTS.interfaceBandwidth;

  // Power delivery score based on connectors
  let powerScore = 0;
  if (powerConnectors) {
    const upperConnectors = powerConnectors.toUpperCase();
    if (upperConnectors.includes('16-PIN')) powerScore = 100; // High-end, modern (e.g., RTX 40/50)
    else if (upperConnectors.includes('2X8-PIN')) powerScore = 90;
    else if (upperConnectors.includes('6+8-PIN')) powerScore = 80;
    else if (upperConnectors.includes('8-PIN')) powerScore = 60;
    else if (upperConnectors.includes('6-PIN')) powerScore = 40;
  }
  const powerContribution = powerScore * GPU_SCORE_WEIGHTS.powerDelivery;

  // Raw score combining all factors
  const rawScore = vramScore + clockScore + coresScore + tdpScore + interfaceContribution + powerContribution;

  // Apply series multiplier for modern features (ray tracing, AI, etc.)
  const normalizedSeries = normalizeGPUSeries(series);
  const seriesMultiplier = GPU_SERIES_MULTIPLIERS[normalizedSeries] || 1.0;

  // Scale to 0-1000 range (assuming a rough max raw score of ~1000 before multiplier)
  const maxRawScore = 1000; // Approximate max for balancing
  const scaledScore = (rawScore * seriesMultiplier) * (1000 / maxRawScore);
  
  // Cap at 1000 and ensure non-negative
  return parseFloat(Math.min(Math.max(scaledScore, 0), 1000).toFixed(2));
}

/**
 * Calculate RAM performance score
 * @param {Object} ram - RAM component data
 * @param {number} ram.sizeGB - RAM size in GB
 * @param {number} ram.speedMHz - RAM speed in MHz
 * @param {string} [ram.type='DDR4'] - RAM type
 * @returns {number} RAM performance score
 */
export function calculateRAMScore({ sizeGB, speedMHz, type = 'DDR4' }) {
  const parsedSizeGB = parseFloat(sizeGB) || 0;
  const parsedSpeedMHz = parseFloat(speedMHz) || 0;
  
  const rawScore =
    (parsedSizeGB * RAM_SCORE_WEIGHTS.sizeGB) +
    (parsedSpeedMHz * RAM_SCORE_WEIGHTS.speedMHz);
  
  const typeMultiplier = RAM_TYPE_MULTIPLIERS[type.toUpperCase()] || 1.0;
  
  return parseFloat((rawScore * typeMultiplier).toFixed(2));
}

/**
 * Calculate total system performance score
 * @param {number} cpuScore - CPU performance score
 * @param {number} gpuScore - GPU performance score
 * @param {number} ramScore - RAM performance score
 * @returns {number} Total system performance score
 */
export function calculateTotalScore(cpuScore, gpuScore, ramScore) {
  // Adjust weights to account for GPU's larger score range (0-1000)
  const normalizedGpuScore = gpuScore / 10; // Scale GPU score down for balance
  return parseFloat(((cpuScore * 0.3) + (normalizedGpuScore * 0.5) + (ramScore * 0.2)).toFixed(2));
}

/**
 * Calculate scores for a product based on its type
 * @param {Object} product - Product data from API (camelCase keys)
 * @returns {Object} Component scores and total score (if applicable)
 */
export function calculateProductScore(product) {
  console.log('Calculating scores for product:', product.name);
  
  const type = product.type;
  let cpuScore = 0;
  let gpuScore = 0;
  let ramScore = 0;
  let totalScore = null;

  if (type === 'prebuild') {
    const cpuData = {
      cores: parseFloat(product.cpuCores) || 0,
      threads: parseFloat(product.cpuThreads) || 0,
      baseClock: parseFloat(product.cpuBaseClock) || 0,
      boostClock: parseFloat(product.cpuBoostClock) || 0,
      brand: product.manufacturer || 'Generic',
    };
    console.log('CPU Data:', cpuData);

    const gpuData = {
      vramGB: parseFloat(product.gpuVram) || 0,
      boostClockMHz: parseFloat(product.gpuBoostClock) || 0,
      cores: parseFloat(product.gpuCores) || 0,
      series: product.gpuSeries || '',
      brand: product.manufacturer || 'Generic',
      tdp: parseFloat(product.tdp) || 0,
      interfaceType: product.interfaceType || '',
      powerConnectors: product.powerConnectors || '',
    };
    console.log('GPU Data:', gpuData);

    const ramData = {
      sizeGB: parseFloat(product.ramSize) || 0,
      speedMHz: parseFloat(product.ramSpeed) || 0,
      type: product.ramType?.toUpperCase() || 'DDR4',
    };
    console.log('RAM Data:', ramData);

    cpuScore = calculateCPUScore(cpuData);
    gpuScore = calculateGPUScore(gpuData);
    ramScore = calculateRAMScore(ramData);
    totalScore = calculateTotalScore(cpuScore, gpuScore, ramScore);
  } else if (type === 'processor') {
    const cpuData = {
      cores: parseFloat(product.coreCount) || 0,
      threads: parseFloat(product.threadCount) || 0,
      baseClock: parseFloat(product.baseClock) || 0,
      boostClock: parseFloat(product.boostClock) || 0,
      brand: product.manufacturer || 'Generic',
    };
    console.log('CPU Data:', cpuData);
    cpuScore = calculateCPUScore(cpuData);
  } else if (type === 'gpu') {
    const gpuData = {
      vramGB: parseFloat(product.vram) || 0,
      boostClockMHz: parseFloat(product.gpuBoostClock) || 0,
      cores: parseFloat(product.gpuCores) || 0,
      series: product.gpuChipset || '',
      brand: product.manufacturer || 'Generic',
      tdp: parseFloat(product.tdp) || 0,
      interfaceType: product.interfaceType || '',
      powerConnectors: product.powerConnectors || '',
    };
    console.log('GPU Data:', gpuData);
    gpuScore = calculateGPUScore(gpuData);
  } else if (type === 'ram') {
    const ramData = {
      sizeGB: parseFloat(product.memoryCapacity) || 0,
      speedMHz: parseFloat(product.memorySpeed) || 0,
      type: product.memoryType?.toUpperCase() || 'DDR4',
    };
    console.log('RAM Data:', ramData);
    ramScore = calculateRAMScore(ramData);
  }

  console.log('Calculated Scores:', { cpuScore, gpuScore, ramScore, totalScore });

  return {
    cpu: cpuScore,
    gpu: gpuScore,
    ram: ramScore,
    total: totalScore, // Only non-null for prebuilt PCs
  };
}

/**
 * Normalize GPU series name for consistent comparison
 * @param {string} series - GPU series name
 * @returns {string} Normalized GPU series name
 */
function normalizeGPUSeries(series) {
  if (!series) return '';
  
  const upperSeries = series.toUpperCase();
  
  if (upperSeries.includes('GTX')) return 'GTX';
  if (upperSeries.includes('RTX 20')) return 'RTX 20';
  if (upperSeries.includes('RTX 30') || 
      upperSeries.includes('3060') || 
      upperSeries.includes('3070') || 
      upperSeries.includes('3080') || 
      upperSeries.includes('3090')) return 'RTX 30';
  if (upperSeries.includes('RTX 40') || 
      upperSeries.includes('4090') || 
      upperSeries.includes('4080') || 
      upperSeries.includes('4070') || 
      upperSeries.includes('4060')) return 'RTX 40';
  if (upperSeries.includes('RTX 50') || 
      upperSeries.includes('5090') || 
      upperSeries.includes('5080') || 
      upperSeries.includes('5070') || 
      upperSeries.includes('5060')) return 'RTX 50';
  if (upperSeries.includes('RX 5')) return 'RX 5000';
  if (upperSeries.includes('RX 6') || 
      upperSeries.includes('6700') || 
      upperSeries.includes('6800') || 
      upperSeries.includes('6900') || 
      upperSeries.includes('6650') || 
      upperSeries.includes('6600')) return 'RX 6000';
  if (upperSeries.includes('RX 7') || 
      upperSeries.includes('7900') || 
      upperSeries.includes('7800') || 
      upperSeries.includes('7700') || 
      upperSeries.includes('7600')) return 'RX 7000';
  if (upperSeries.includes('ARC') && 
      (upperSeries.includes('A770') || 
       upperSeries.includes('A750') || 
       upperSeries.includes('A580') || 
       upperSeries.includes('A380') || 
       upperSeries.includes('A310'))) return 'ARC A';
  if (upperSeries.includes('ARC') && 
      (upperSeries.includes('B580') || 
       upperSeries.includes('B570'))) return 'ARC B';
  
  return '';
}

/**
 * Convert snake_case product data to camelCase for sending to backend
 * @param {Object} product - Product data with snake_case keys
 * @returns {Object} Product data with camelCase keys
 */
export function toCamelCase(product) {
  if (!product || typeof product !== 'object' || Array.isArray(product)) return product;
  return Object.fromEntries(
    Object.entries(product).map(([key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
      return [camelKey, toCamelCase(value)];
    })
  );
}

/**
 * Calculate scores for a prebuilt PC
 * @param {Object} product - Prebuilt PC product data
 * @returns {Object} Component scores and total score
 */
export function calculatePrebuiltPcScore(product) {
  const cpuData = {
    cores: parseFloat(product.cpuCores) || 0,
    threads: parseFloat(product.cpuThreads) || 0,
    baseClock: parseFloat(product.cpuBaseClock) || 0,
    boostClock: parseFloat(product.cpuBoostClock) || 0,
    brand: product.manufacturer || 'Generic',
  };

  const gpuData = {
    vramGB: parseFloat(product.gpuVram) || 0,
    boostClockMHz: parseFloat(product.gpuBoostClock) || 0,
    cores: parseFloat(product.gpuCores) || 0,
    series: product.gpuSeries || '',
    brand: product.manufacturer || 'Generic',
    tdp: parseFloat(product.tdp) || 0,
    interfaceType: product.interfaceType || '',
    powerConnectors: product.powerConnectors || '',
  };

  const ramData = {
    sizeGB: parseFloat(product.ramSize) || 0,
    speedMHz: parseFloat(product.ramSpeed) || 0,
    type: product.ramType?.toUpperCase() || 'DDR4',
  };

  const cpuScore = calculateCPUScore(cpuData);
  const gpuScore = calculateGPUScore(gpuData);
  const ramScore = calculateRAMScore(ramData);
  const totalScore = calculateTotalScore(cpuScore, gpuScore, ramScore);

  return {
    cpu: cpuScore,
    gpu: gpuScore,
    ram: ramScore,
    total: totalScore,
  };
}