// src/utils/scoreCalculator.js
export function calculateCPUScore({ cores, threads, baseClock, boostClock, brand = 'Generic' }) {
  const rawScore = (cores * 10) + (threads * 5) + (baseClock * 15) + (boostClock * 20);
  return rawScore;
}

export function calculateGPUScore({ vramGB, boostClockMHz, cores, series = '', brand = 'Generic' }) {
  const rawScore = (vramGB * 8) + (boostClockMHz / 50) + (cores / 100);
  const normalizedSeries = normalizeGPUSeries(series);
  const seriesBonus = {
    GTX: 0.9,
    'RTX 20': 1.0,
    'RTX 30': 1.1,
    'RTX 40': 1.2,
    'RX 5000': 1.0,
    'RX 6000': 1.1,
    'RX 7000': 1.2,
    'ARC A': 1.0,
  };
  const bonus = seriesBonus[normalizedSeries] || 1.0;
  return rawScore * bonus;
}

export function calculateRAMScore({ sizeGB, speedMHz, type = 'DDR4' }) {
  const typeMultiplier = type.toUpperCase() === 'DDR5' ? 1.1 : 1.0;
  const score = ((sizeGB / 64) * 60) + ((speedMHz / 6000) * 40);
  return score * typeMultiplier;
}

export function calculateTotalScore(cpuScore, gpuScore, ramScore) {
  return parseFloat(((cpuScore * 0.3) + (gpuScore * 0.5) + (ramScore * 0.2)).toFixed(2));
}

function normalizeGPUSeries(series) {
  if (!series) return '';
  const upperSeries = series.toUpperCase();
  if (upperSeries.includes('GTX')) return 'GTX';
  if (upperSeries.includes('RTX 20')) return 'RTX 20';
  if (upperSeries.includes('RTX 30') || upperSeries.includes('3060') || upperSeries.includes('3070') || upperSeries.includes('3080') || upperSeries.includes('3090')) return 'RTX 30';
  if (upperSeries.includes('RTX 40') || upperSeries.includes('4090') || upperSeries.includes('4080') || upperSeries.includes('4070')) return 'RTX 40';
  if (upperSeries.includes('RX 5')) return 'RX 5000';
  if (upperSeries.includes('RX 6') || upperSeries.includes('6700') || upperSeries.includes('6800') || upperSeries.includes('6900')) return 'RX 6000';
  if (upperSeries.includes('RX 7') || upperSeries.includes('7900') || upperSeries.includes('7800') || upperSeries.includes('7700')) return 'RX 7000';
  if (upperSeries.includes('ARC') || upperSeries.includes('A770') || upperSeries.includes('A750')) return 'ARC A';
  return '';
}

// New function to calculate scores for prebuilt PCs
export function calculatePrebuiltPcScore(prebuilt) {
  const cpuData = {
    cores: parseFloat(prebuilt.cpuCores) || 0,
    threads: parseFloat(prebuilt.cpuThreads) || 0,
    baseClock: parseFloat(prebuilt.cpuBaseClock) || 0,
    boostClock: parseFloat(prebuilt.cpuBoostClock) || 0,
  };
  const gpuData = {
    vramGB: parseFloat(prebuilt.gpuVramGb) || 0,
    boostClockMHz: parseFloat(prebuilt.gpuBoostClockMhz) || 0,
    cores: parseFloat(prebuilt.gpuCores) || 0,
    series: prebuilt.gpuSeries || '',
  };
  const ramData = {
    sizeGB: parseFloat(prebuilt.ramSizeGb) || 0,
    speedMHz: parseFloat(prebuilt.ramSpeedMhz) || 0,
    type: prebuilt.ramType || 'DDR4',
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