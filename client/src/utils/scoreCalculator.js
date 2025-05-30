// Standard scoring weights for all components
const SCORE_WEIGHTS = {
  // CPU Weights - Based on real-world performance impact
  cpu: {
    cores: 8,          // Reduced weight as not all cores are equally utilized
    threads: 4,        // Reduced weight as hyperthreading impact varies
    baseClock: 12,     // Base clock has less impact than boost
    boostClock: 25,    // Increased weight as boost clock is more important
    cache: 8,          // Increased weight as cache significantly impacts performance
    tdp: 3,           // TDP indicates power efficiency and potential performance
    architecture: 1.5  // Architecture has significant impact on performance
  },
  
  // GPU Weights - Based on gaming performance metrics
  gpu: {
    vramGB: 15,        // Increased weight as VRAM is crucial for modern games
    boostClockMHz: 0.02, // Increased weight for clock speed
    cores: 0.01,       // Adjusted for modern GPU architectures
    memoryBusWidth: 0.8, // Increased weight as memory bandwidth is crucial
    memoryType: 1.3,   // Memory type significantly impacts performance
    architecture: 1.6,  // Architecture has major impact on performance
    tdp: 0.015        // TDP indicates power efficiency and potential performance
  },
  
  // RAM Weights - Based on gaming performance impact
  ram: {
    sizeGB: 1.0,      // Normalized for 16GB as baseline
    speedMHz: 0.008,  // Adjusted for DDR4/DDR5 speeds
    type: 1.2,        // RAM type has significant impact
    channels: 1.3,    // Dual/triple/quad channel has major impact
    latency: 0.9      // CAS latency impacts performance
  }
};

// Component multipliers based on real-world performance data
const MULTIPLIERS = {
  // CPU Architecture multipliers - Based on relative performance
  cpuArchitecture: {
    'Zen 4': 1.5,     // Latest AMD architecture
    'Zen 3': 1.35,    // Previous generation AMD
    'Zen 2': 1.2,     // Older AMD architecture
    'Alder Lake': 1.45, // Latest Intel architecture
    'Raptor Lake': 1.5, // Latest Intel architecture
    'Rocket Lake': 1.3, // Previous generation Intel
    'Comet Lake': 1.25 // Older Intel architecture
  },

  // GPU Series multipliers - Based on relative performance tiers
  gpuSeries: {
    // NVIDIA
    'GTX 16': 0.8,    // Entry-level gaming
    'GTX 10': 0.7,    // Older entry-level
    'RTX 20': 1.0,    // Baseline for comparison
    'RTX 30': 1.25,   // Previous generation high-end
    'RTX 40': 1.5,    // Latest generation high-end
    'RTX 50': 1.7,    // Future generation (placeholder)
    // AMD
    'RX 5000': 0.9,   // Previous generation AMD
    'RX 6000': 1.15,  // Previous generation high-end
    'RX 7000': 1.4,   // Latest generation AMD
    // Intel
    'ARC A': 0.85,    // Entry-level Intel
    'ARC B': 1.1      // Mid-range Intel
  },

  // Memory type multipliers - Based on bandwidth and performance
  memoryType: {
    'GDDR6X': 1.4,    // Highest performance
    'GDDR6': 1.3,     // High performance
    'GDDR5X': 1.2,    // Mid-high performance
    'GDDR5': 1.0,     // Baseline
    'HBM2': 1.5,      // High bandwidth memory
    'HBM2e': 1.6      // Enhanced high bandwidth memory
  },

  // RAM type multipliers - Based on performance characteristics
  ramType: {
    'DDR5': 1.3,      // Latest generation
    'DDR4': 1.0,      // Current standard
    'DDR3': 0.7       // Older generation
  }
};

/**
 * Calculate CPU performance score
 * @param {Object} cpu - CPU component data
 * @returns {number} CPU performance score
 */
export function calculateCPUScore({ 
  cores, 
  threads, 
  baseClock, 
  boostClock, 
  brand = 'Generic',
  cache = 0,
  tdp = 0,
  architecture = ''
}) {
  const parsedCores = parseFloat(cores) || 0;
  const parsedThreads = parseFloat(threads) || 0;
  const parsedBaseClock = parseFloat(baseClock) || 0;
  const parsedBoostClock = parseFloat(boostClock) || 0;
  const parsedCache = parseFloat(cache) || 0;
  const parsedTdp = parseFloat(tdp) || 0;

  // Calculate base score with normalized values
  const rawScore =
    (parsedCores * SCORE_WEIGHTS.cpu.cores) +
    (parsedThreads * SCORE_WEIGHTS.cpu.threads) +
    (parsedBaseClock * SCORE_WEIGHTS.cpu.baseClock) +
    (parsedBoostClock * SCORE_WEIGHTS.cpu.boostClock) +
    (parsedCache * SCORE_WEIGHTS.cpu.cache) +
    (parsedTdp * SCORE_WEIGHTS.cpu.tdp);

  // Apply architecture multiplier
  const architectureMultiplier = MULTIPLIERS.cpuArchitecture[architecture] || 1.0;

  // Apply brand bonus based on market performance
  const brandBonus = brand.toUpperCase() === 'AMD' ? 1.05 : 
                    brand.toUpperCase() === 'INTEL' ? 1.03 : 1.0;

  return parseFloat((rawScore * architectureMultiplier * brandBonus).toFixed(2));
}

/**
 * Calculate GPU performance score
 * @param {Object} gpu - GPU component data
 * @returns {number} GPU performance score
 */
export function calculateGPUScore({ 
  vramGB, 
  boostClockMHz, 
  cores, 
  series = '', 
  brand = 'Generic',
  memoryBusWidth = 256,
  memoryType = 'GDDR6',
  architecture = '',
  tdp = 0
}) {
  const parsedVramGB = parseFloat(vramGB) || 0;
  const parsedBoostClockMHz = parseFloat(boostClockMHz) || 0;
  const parsedCores = parseFloat(cores) || 0;
  const parsedMemoryBusWidth = parseFloat(memoryBusWidth) || 256;
  const parsedTdp = parseFloat(tdp) || 0;

  // Calculate base score with normalized values
  const rawScore =
    (parsedVramGB * SCORE_WEIGHTS.gpu.vramGB) +
    (parsedBoostClockMHz * SCORE_WEIGHTS.gpu.boostClockMHz) +
    (parsedCores * SCORE_WEIGHTS.gpu.cores) +
    (parsedMemoryBusWidth * SCORE_WEIGHTS.gpu.memoryBusWidth) +
    (parsedTdp * SCORE_WEIGHTS.gpu.tdp);

  // Apply multipliers
  const normalizedSeries = normalizeGPUSeries(series);
  const seriesMultiplier = MULTIPLIERS.gpuSeries[normalizedSeries] || 1.0;
  const memoryTypeMultiplier = MULTIPLIERS.memoryType[memoryType.toUpperCase()] || 1.0;
  const architectureMultiplier = MULTIPLIERS.cpuArchitecture[architecture] || 1.0;

  // Apply brand bonus based on market performance
  const brandBonus = brand.toUpperCase() === 'NVIDIA' ? 1.05 : 
                    brand.toUpperCase() === 'AMD' ? 1.03 : 
                    brand.toUpperCase() === 'INTEL' ? 1.02 : 1.0;

  return parseFloat((rawScore * seriesMultiplier * memoryTypeMultiplier * architectureMultiplier * brandBonus).toFixed(2));
}

/**
 * Calculate RAM performance score
 * @param {Object} ram - RAM component data
 * @returns {number} RAM performance score
 */
export function calculateRAMScore({ 
  sizeGB, 
  speedMHz, 
  type = 'DDR4',
  channels = 2,
  latency = 16
}) {
  const parsedSizeGB = parseFloat(sizeGB) || 0;
  const parsedSpeedMHz = parseFloat(speedMHz) || 0;
  const parsedChannels = parseFloat(channels) || 2;
  const parsedLatency = parseFloat(latency) || 16;
  
  // Calculate base score with normalized values
  const rawScore =
    (parsedSizeGB * SCORE_WEIGHTS.ram.sizeGB) +
    (parsedSpeedMHz * SCORE_WEIGHTS.ram.speedMHz) +
    (parsedChannels * SCORE_WEIGHTS.ram.channels) +
    (parsedLatency * SCORE_WEIGHTS.ram.latency);
  
  // Apply type multiplier
  const typeMultiplier = MULTIPLIERS.ramType[type.toUpperCase()] || 1.0;
  
  return parseFloat((rawScore * typeMultiplier).toFixed(2));
}

/**
 * Calculate total system performance score
 * @param {Object} scores - Component scores
 * @returns {number} Total system performance score
 */
export function calculateTotalScore(scores) {
  const { cpu = 0, gpu = 0, ram = 0 } = scores;
  
  // Weighted average with emphasis on GPU for gaming
  // Adjusted weights based on real-world gaming performance impact
  return parseFloat((
    (cpu * 0.25) +  // CPU contributes 25% (reduced from 30%)
    (gpu * 0.60) +  // GPU contributes 60% (increased from 50%)
    (ram * 0.15)    // RAM contributes 15% (reduced from 20%)
  ).toFixed(2));
}

/**
 * Calculate scores for a product based on its type
 * @param {Object} product - Product data
 * @returns {Object} Component scores and total score
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
      cache: parseFloat(product.cpuCache) || 0,
      tdp: parseFloat(product.cpuTdp) || 0,
      architecture: product.cpuArchitecture || ''
    };

    const gpuData = {
      vramGB: parseFloat(product.gpuVram) || 0,
      boostClockMHz: parseFloat(product.gpuBoostClock) || 0,
      cores: parseFloat(product.gpuCores) || 0,
      series: product.gpuSeries || '',
      brand: product.manufacturer || 'Generic',
      memoryBusWidth: parseFloat(product.gpuMemoryBusWidth) || 256,
      memoryType: product.gpuMemoryType || 'GDDR6',
      architecture: product.gpuArchitecture || '',
      tdp: parseFloat(product.gpuTdp) || 0
    };

    const ramData = {
      sizeGB: parseFloat(product.ramSize) || 0,
      speedMHz: parseFloat(product.ramSpeed) || 0,
      type: product.ramType || 'DDR4',
      channels: parseFloat(product.ramChannels) || 2,
      latency: parseFloat(product.ramLatency) || 16
    };

    cpuScore = calculateCPUScore(cpuData);
    gpuScore = calculateGPUScore(gpuData);
    ramScore = calculateRAMScore(ramData);
    totalScore = calculateTotalScore({ cpu: cpuScore, gpu: gpuScore, ram: ramScore });
  } else if (type === 'processor') {
    cpuScore = calculateCPUScore({
      cores: parseFloat(product.coreCount) || 0,
      threads: parseFloat(product.threadCount) || 0,
      baseClock: parseFloat(product.baseClock) || 0,
      boostClock: parseFloat(product.boostClock) || 0,
      brand: product.manufacturer || 'Generic',
      cache: parseFloat(product.cache) || 0,
      tdp: parseFloat(product.tdp) || 0,
      architecture: product.architecture || ''
    });
  } else if (type === 'gpu') {
    gpuScore = calculateGPUScore({
      vramGB: parseFloat(product.vram) || 0,
      boostClockMHz: parseFloat(product.gpuBoostClock) || 0,
      cores: parseFloat(product.gpuCores) || 0,
      series: product.gpuChipset || '',
      brand: product.manufacturer || 'Generic',
      memoryBusWidth: parseFloat(product.memoryBusWidth) || 256,
      memoryType: product.memoryType || 'GDDR6',
      architecture: product.architecture || '',
      tdp: parseFloat(product.tdp) || 0
    });
  } else if (type === 'ram') {
    ramScore = calculateRAMScore({
      sizeGB: parseFloat(product.memoryCapacity) || 0,
      speedMHz: parseFloat(product.memorySpeed) || 0,
      type: product.memoryType || 'DDR4',
      channels: parseFloat(product.channels) || 2,
      latency: parseFloat(product.latency) || 16
    });
  }

  return {
    cpu: cpuScore,
    gpu: gpuScore,
    ram: ramScore,
    total: totalScore
  };
}

/**
 * Calculate game performance requirements
 * @param {Object} game - Game data
 * @returns {Object} Game performance scores
 */
export function calculateGameScore(game) {
  const cpuScore = calculateCPUScore(game.cpu);
  const gpuScore = calculateGPUScore(game.gpu);
  const ramScore = calculateRAMScore(game.ram);
  const totalScore = calculateTotalScore({ cpu: cpuScore, gpu: gpuScore, ram: ramScore });

  return {
    cpu: cpuScore,
    gpu: gpuScore,
    ram: ramScore,
    total: totalScore
  };
}

// Helper function to normalize GPU series names
function normalizeGPUSeries(series) {
  if (!series) return '';
  
  const upperSeries = series.toUpperCase();
  
  // NVIDIA Series
  if (upperSeries.includes('GTX 16')) return 'GTX 16';
  if (upperSeries.includes('GTX 10')) return 'GTX 10';
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
  
  // AMD Series
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
  
  // Intel Series
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