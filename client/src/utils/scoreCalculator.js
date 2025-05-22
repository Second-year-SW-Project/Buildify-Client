//Defines the weights for the CPU scoring
const CPU_SCORE_WEIGHTS = {
  cores: 10,
  threads: 5,
  baseClock: 15,
  boostClock: 20,
};

// GPU scoring constants. Norminalized as suits
const GPU_SCORE_WEIGHTS = {
  vramGB: 8,
  boostClockMHz: 0.02, // 1/50
  cores: 0.01, // 1/100
};

// RAM scoring constants
const RAM_SCORE_WEIGHTS = {
  sizeGB: 0.9375, // 60/64
  speedMHz: 0.0067, // 40/6000
};

// GPU series multipliers
const GPU_SERIES_MULTIPLIERS = {
  GTX: 0.9,
  'RTX 20': 1.0,
  'RTX 30': 1.1,
  'RTX 40': 1.2,
  'RX 5000': 1.0,
  'RX 6000': 1.1,
  'RX 7000': 1.2,
  'ARC A': 1.0,
};

// RAM type multipliers
const RAM_TYPE_MULTIPLIERS = {
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
  const rawScore = 
    (cores * CPU_SCORE_WEIGHTS.cores) +
    (threads * CPU_SCORE_WEIGHTS.threads) +
    (baseClock * CPU_SCORE_WEIGHTS.baseClock) +
    (boostClock * CPU_SCORE_WEIGHTS.boostClock);
  
  return parseFloat(rawScore.toFixed(2));
}

/**
 * Calculate GPU performance score
 * @param {Object} gpu - GPU component data
 * @param {number} gpu.vramGB - VRAM size in GB
 * @param {number} gpu.boostClockMHz - Boost clock speed in MHz
 * @param {number} gpu.cores - Number of GPU cores
 * @param {string} [gpu.series=''] - GPU series
 * @param {string} [gpu.brand='Generic'] - GPU brand
 * @returns {number} GPU performance score
 */
export function calculateGPUScore({ vramGB, boostClockMHz, cores, series = '', brand = 'Generic' }) {
  const rawScore = 
    (vramGB * GPU_SCORE_WEIGHTS.vramGB) +
    (boostClockMHz * GPU_SCORE_WEIGHTS.boostClockMHz) +
    (cores * GPU_SCORE_WEIGHTS.cores);
  
  const normalizedSeries = normalizeGPUSeries(series);
  const seriesMultiplier = GPU_SERIES_MULTIPLIERS[normalizedSeries] || 1.0;
  
  return parseFloat((rawScore * seriesMultiplier).toFixed(2));
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
  const rawScore = 
    (sizeGB * RAM_SCORE_WEIGHTS.sizeGB) +
    (speedMHz * RAM_SCORE_WEIGHTS.speedMHz);
  
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
  return parseFloat(((cpuScore * 0.3) + (gpuScore * 0.5) + (ramScore * 0.2)).toFixed(2));//Normalized as suits
}

/**
 * Calculate scores for all components in a prebuilt PC
 * @param {Object} prebuilt - Prebuilt PC data
 * @returns {Object} Component scores and total score
 */
export function calculatePrebuiltPcScore(prebuilt) {
  console.log('Calculating scores for PC:', prebuilt.name);
  
  const cpuData = {
    cores: parseFloat(prebuilt.cpuCores) || 0,
    threads: parseFloat(prebuilt.cpuThreads) || 0,
    baseClock: parseFloat(prebuilt.cpuBaseClock) || 0,
    boostClock: parseFloat(prebuilt.cpuBoostClock) || 0,
  };
  console.log('CPU Data:', cpuData);

  const gpuData = {
    vramGB: parseFloat(prebuilt.gpuVram) || 0,
    boostClockMHz: parseFloat(prebuilt.gpuBoostClock) || 0,
    cores: parseFloat(prebuilt.gpuCores) || 0,
    series: prebuilt.gpuSeries || '',
  };
  console.log('GPU Data:', gpuData);

  // Extract RAM size and speed from string values (e.g., "16 GB", "3200 MHz")
  const ramSize = parseFloat(prebuilt.ramSize?.toString().replace(/[^\d.]/g, '')) || 0;
  const ramSpeed = parseFloat(prebuilt.ramSpeed?.toString().replace(/[^\d.]/g, '')) || 0;
  const ramType = prebuilt.ramType?.toUpperCase() || 'DDR4';

  const ramData = {
    sizeGB: ramSize,
    speedMHz: ramSpeed,
    type: ramType,
  };
  console.log('RAM Data:', ramData);

  const cpuScore = calculateCPUScore(cpuData);
  const gpuScore = calculateGPUScore(gpuData);
  const ramScore = calculateRAMScore(ramData);
  const totalScore = calculateTotalScore(cpuScore, gpuScore, ramScore);
  
  console.log('Calculated Scores:', { cpuScore, gpuScore, ramScore, totalScore });

  return {
    cpu: cpuScore,
    gpu: gpuScore,
    ram: ramScore,
    total: totalScore,
  };
}

/**
 * Normalize GPU series name for consistent comparison
 * @param {string} series - GPU series name
 * @returns {string} Normalized GPU series name
 */
function normalizeGPUSeries(series) {
  if (!series) return '';//If the series is not found, return an empty string
  
  const upperSeries = series.toUpperCase();//Converts the series to uppercase
  
  if (upperSeries.includes('GTX')) return 'GTX';//If the series includes GTX, return GTX
  if (upperSeries.includes('RTX 20')) return 'RTX 20';//If the series includes RTX 20, return RTX 20
  if (upperSeries.includes('RTX 30') || 
      upperSeries.includes('3060') || 
      upperSeries.includes('3070') || 
      upperSeries.includes('3080') || 
      upperSeries.includes('3090')) return 'RTX 30';
  if (upperSeries.includes('RTX 40') || 
      upperSeries.includes('4090') || 
      upperSeries.includes('4080') || 
      upperSeries.includes('4070')) return 'RTX 40';
  if (upperSeries.includes('RX 5')) return 'RX 5000';
  if (upperSeries.includes('RX 6') || 
      upperSeries.includes('6700') || 
      upperSeries.includes('6800') || 
      upperSeries.includes('6900')) return 'RX 6000';
  if (upperSeries.includes('RX 7') || 
      upperSeries.includes('7900') || 
      upperSeries.includes('7800') || 
      upperSeries.includes('7700')) return 'RX 7000';
  if (upperSeries.includes('ARC') || 
      upperSeries.includes('A770') || 
      upperSeries.includes('A750')) return 'ARC A';
  
  return '';
}