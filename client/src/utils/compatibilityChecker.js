// Base messages that always appear
const BASE_MESSAGES = [
  { type: "note", text: "Choose components that are compatible with each other." },
  { type: "disclaimer", text: "Prices are subject to change based on availability." },
];

//Component-specific compatibility checkers

const compatibilityCheckers = {
  // CPU and Motherboard compatibility
  checkCpuMotherboard: (cpu, motherboard) => {
    const warnings = [];

    // Socket compatibility
    if (cpu.socketType !== motherboard.socketType) {
      warnings.push({
        type: "warning",
        text: `CPU socket (${cpu.socketType}) is not compatible with motherboard socket (${motherboard.socketType}).`,
      });
    }

    // Chipset compatibility
    const cpuChipset = cpu.socketType.split('-')[0];
    if (!motherboard.motherboardChipset.includes(cpuChipset)) {
      warnings.push({
        type: "warning",
        text: `CPU chipset (${cpuChipset}) is not supported by motherboard chipset (${motherboard.motherboardChipset}).`,
      });
    }

    // TDP compatibility with motherboard power delivery
    if (cpu.tdp > 150 && !motherboard.powerDelivery.includes('High')) {
      warnings.push({
        type: "warning",
        text: `High TDP CPU (${cpu.tdp}W) may require better motherboard power delivery.`,
      });
    }

    // Check if CPU includes stock cooler
    if (!cpu.includesCooler) {
      warnings.push({
        type: "warning",
        text: "This CPU does not include a stock cooler. You must select a compatible CPU cooler.",
      });
    } else if (cpu.includesCooler && cpu.tdp > 65) {
      warnings.push({
        type: "note",
        text: "This CPU includes a stock cooler, but for better cooling performance with high TDP, consider an aftermarket cooler.",
      });
    }

    return warnings;
  },

  // CPU and Cooler compatibility
  checkCpuCooler: (cpu, cooler) => {
    const warnings = [];

    // Socket compatibility
    if (cooler.supportedSocket) {
      const supportedSockets = Array.isArray(cooler.supportedSocket)
        ? cooler.supportedSocket
        : cooler.supportedSocket.split(',').map(s => s.trim());

      if (!supportedSockets.includes(cpu.socketType)) {
        warnings.push({
          type: "warning",
          text: `CPU Cooler does not support CPU socket (${cpu.socketType}). Supported sockets: ${supportedSockets.join(', ')}.`,
        });
      }
    }

    // TDP compatibility
    if (parseInt(cooler.maxTdp) < parseInt(cpu.tdp)) {
      warnings.push({
        type: "warning",
        text: `CPU Cooler max TDP (${cooler.maxTdp}W) is lower than CPU TDP (${cpu.tdp}W). Consider a more powerful cooler.`,
      });
    }

    // Check if CPU includes cooler
    if (!cpu.includesCooler && !cooler) {
      warnings.push({
        type: "warning",
        text: "CPU does not include a cooler. A CPU cooler must be selected.",
      });
    }

    return warnings;
  },

  // Cooler and Case compatibility
  checkCoolerCase: (cooler, pcCase) => {
    const warnings = [];

    // Height compatibility
    if (parseInt(cooler.height) > parseInt(pcCase.maxCoolerHeight)) {
      warnings.push({
        type: "warning",
        text: `CPU Cooler height (${cooler.height}mm) exceeds case's max cooler height (${pcCase.maxCoolerHeight}mm).`,
      });
    }

    // Airflow compatibility
    if (cooler.coolerType === 'Air' && pcCase.airflowRating < 3) {
      warnings.push({
        type: "warning",
        text: "Case has limited airflow which may affect air cooler performance.",
      });
    }

    return warnings;
  },

  // RAM and Motherboard compatibility
  checkRamMotherboard: (ram, motherboard) => {
    const warnings = [];

    // RAM type compatibility
    const ramType = ram.memoryType?.toLowerCase().trim();
    const motherboardType = motherboard.supportedMemoryTypes?.toLowerCase().trim();

    if (!ramType || !motherboardType) {
      warnings.push({
        type: "warning",
        text: "Could not verify RAM type compatibility. Please check motherboard specifications.",
      });
    } else if (ramType !== motherboardType) {
      warnings.push({
        type: "warning",
        text: `RAM type (${ram.memoryType}) is not compatible with motherboard. Motherboard supports ${motherboard.supportedMemoryTypes}.`,
      });
    }

    // RAM capacity and slots
    const ramModules = ram.memoryCapacity?.split('+').length || 0;
    const totalRamCapacity = ram.memoryCapacity
      ?.split('+')
      .reduce((sum, cap) => sum + parseInt(cap.replace(/[^0-9]/g, '')), 0) || 0;

    if (ramModules > parseInt(motherboard.ramSlots || '0')) {
      warnings.push({
        type: "warning",
        text: `Number of RAM modules (${ramModules}) exceeds motherboard's available RAM slots (${motherboard.ramSlots}).`,
      });
    }

    if (totalRamCapacity > parseInt(motherboard.maxRam || '0')) {
      warnings.push({
        type: "warning",
        text: `Total RAM capacity (${totalRamCapacity}GB) exceeds motherboard's max supported capacity (${motherboard.maxRam}GB).`,
      });
    }

    // RAM voltage compatibility
    if (ram.voltage > 1.35 && !motherboard.highVoltageRamSupport) {
      warnings.push({
        type: "warning",
        text: "High voltage RAM may not be fully supported by the motherboard.",
      });
    }

    return warnings;
  },

  // Storage and Motherboard compatibility
  checkStorageMotherboard: (storage, motherboard) => {
    const warnings = [];

    // Storage interface compatibility
    const requiredStorageType = storage.storageType;
    const hasCompatibleStorageInterface = motherboard.storageInterfaces.some(
      (intf) => intf.type === requiredStorageType && intf.count > 0
    );

    if (!hasCompatibleStorageInterface) {
      warnings.push({
        type: "warning",
        text: `Storage type (${storage.storageType}) is not supported by motherboard storage interfaces.`,
      });
    }

    // Check available storage interfaces
    const usedInterfaces = motherboard.storageInterfaces.filter(intf => intf.count > 0).length;
    if (usedInterfaces >= motherboard.storageInterfaces.length) {
      warnings.push({
        type: "warning",
        text: "No more storage interfaces available on the motherboard.",
      });
    }

    // NVMe speed compatibility
    if (storage.storageType === 'NVMe' && storage.readSpeed > 3500 && !motherboard.nvmeGen4Support) {
      warnings.push({
        type: "note",
        text: "NVMe drive may not reach full speed without PCIe 4.0 support.",
      });
    }

    return warnings;
  },

  // GPU and Motherboard compatibility
  checkGpuMotherboard: (gpu, motherboard) => {
    const warnings = [];

    // PCIe slot compatibility
    const requiredPcieVersion = gpu.pcieVersion || "4.0";
    const hasCompatiblePcieSlot = motherboard.pcieSlots.some(
      (slot) =>
        slot.type === "x16" && // Must be x16 slot
        parseFloat(slot.version) >= parseFloat(requiredPcieVersion)
    );

    if (!hasCompatiblePcieSlot) {
      warnings.push({
        type: "warning",
        text: `No compatible PCIe x16 slot found for GPU (requires PCIe ${requiredPcieVersion}).`,
      });
    } else if (parseFloat(requiredPcieVersion) > parseFloat(motherboard.pcieSlots[0].version)) {
      warnings.push({
        type: "note",
        text: `GPU is PCIe ${requiredPcieVersion} but will run at PCIe ${motherboard.pcieSlots[0].version} speed.`,
      });
    }

    return warnings;
  },

  // GPU and Case compatibility
  checkGpuCase: (gpu, pcCase) => {
    const warnings = [];

    // Length compatibility
    if (parseInt(gpu.length) > parseInt(pcCase.maxGpuLength)) {
      warnings.push({
        type: "warning",
        text: `GPU length (${gpu.length}mm) exceeds case's max GPU length (${pcCase.maxGpuLength}mm).`,
      });
    }

    // Cooling compatibility
    if (gpu.coolingType === 'Open Air' && pcCase.airflowRating < 3) {
      warnings.push({
        type: "warning",
        text: "Case has limited airflow which may affect open-air GPU cooling.",
      });
    }

    return warnings;
  },

  // GPU and Power Supply compatibility
  checkGpuPowerSupply: (gpu, psu) => {
    const warnings = [];

    // Power connector compatibility
    const requiredConnectors = gpu.powerConnectors.split('+');
    const hasSufficientConnectors = requiredConnectors.every((connector) =>
      psu.modularType === "Fully Modular" || psu.modularType.includes(connector)
    );

    if (!hasSufficientConnectors) {
      warnings.push({
        type: "warning",
        text: `Power supply does not provide required power connectors for GPU (${gpu.powerConnectors}).`,
      });
    }

    // Power efficiency
    if (gpu.tdp > 300 && psu.efficiencyRating < 'Gold') {
      warnings.push({
        type: "note",
        text: "Consider a higher efficiency power supply for high-power GPU.",
      });
    }

    return warnings;
  },

  // Case and Motherboard form factor compatibility
  checkCaseMotherboard: (pcCase, motherboard) => {
    const warnings = [];
    const supportedFormFactors = pcCase.supportedMotherboardSizes.split(',');

    // Form factor compatibility
    if (!supportedFormFactors.includes(motherboard.formFactor)) {
      warnings.push({
        type: "warning",
        text: `Case does not support motherboard form factor (${motherboard.formFactor}). Supported: ${supportedFormFactors.join(', ')}.`,
      });
    }

    // Cooling compatibility
    if (motherboard.vrmCooling === 'High' && pcCase.airflowRating < 3) {
      warnings.push({
        type: "warning",
        text: "Case may have insufficient airflow for motherboard VRM cooling.",
      });
    }

    return warnings;
  },

  // CPU integrated graphics and cooler check
  checkCpuGraphics: (cpu) => {
    const warnings = [];

    // Check integrated graphics
    if (!cpu.integratedGraphics) {
      warnings.push({
        type: "warning",
        text: `CPU does not have integrated graphics. A dedicated GPU is required.`,
      });
    } else if (cpu.integratedGraphics && cpu.graphicsModel) {
      warnings.push({
        type: "note",
        text: `CPU includes integrated ${cpu.graphicsModel} graphics.`,
      });
    }

    // Check stock cooler
    if (!cpu.includesCooler) {
      warnings.push({
        type: "warning",
        text: "This CPU does not include a stock cooler. You must select a compatible CPU cooler.",
      });
    } else if (cpu.includesCooler && cpu.tdp > 65) {
      warnings.push({
        type: "note",
        text: "This CPU includes a stock cooler, but for better cooling performance with high TDP, consider an aftermarket cooler.",
      });
    }

    return warnings;
  },

  // Power Supply wattage check
  checkPowerSupplyWattage: (psu, totalTdp) => {
    const warnings = [];
    const recommendedWattage = totalTdp * 1.3; // 30% overhead for system stability

    if (parseInt(psu.wattage) < recommendedWattage) {
      warnings.push({
        type: "warning",
        text: `Power supply (${psu.wattage}W) may be insufficient for system TDP (${totalTdp}W). Recommended: ${Math.ceil(recommendedWattage)}W.`,
      });
    }

    // Efficiency rating check
    if (totalTdp > 500 && psu.efficiencyRating < 'Gold') {
      warnings.push({
        type: "note",
        text: "Consider a higher efficiency power supply for high-power systems.",
      });
    }

    // Modular type check
    if (psu.modularType === 'Non-Modular' && totalTdp > 400) {
      warnings.push({
        type: "note",
        text: "Consider a modular power supply for better cable management in high-power systems.",
      });
    }

    return warnings;
  },
};

/**
 * Main compatibility checking function
 * @param {Object} components - Object containing selected components
 * @returns {Object} - Contains compatibility warnings, total TDP, and issues flag
 */
export const checkCompatibility = (components) => {
  let tdp = 0;
  let compatibilityWarnings = [...BASE_MESSAGES];

  // Calculate total TDP
  Object.values(components).forEach((component) => {
    if (component.tdp) {
      tdp += parseInt(component.tdp);
    }
  });

  // Perform all compatibility checks
  if (components.CPU && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCpuMotherboard(
      components.CPU,
      components.Motherboard
    ));
  }

  if (components.CPU && components["CPU Cooler"]) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCpuCooler(
      components.CPU,
      components["CPU Cooler"]
    ));
  }

  if (components["CPU Cooler"] && components.Case) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCoolerCase(
      components["CPU Cooler"],
      components.Case
    ));
  }

  // Handle both "Memory" and "RAM" keys for RAM components
  const ramComponent = components.Memory || components.RAM;
  if (ramComponent && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkRamMotherboard(
      ramComponent,
      components.Motherboard
    ));
  }

  if (components.GPU && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkGpuMotherboard(
      components.GPU,
      components.Motherboard
    ));
  }

  if (components.GPU && components.Case) {
    compatibilityWarnings.push(...compatibilityCheckers.checkGpuCase(
      components.GPU,
      components.Case
    ));
  }

  if (components.GPU && components["Power Supply"]) {
    compatibilityWarnings.push(...compatibilityCheckers.checkGpuPowerSupply(
      components.GPU,
      components["Power Supply"]
    ));
  }

  if (components.Storage && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkStorageMotherboard(
      components.Storage,
      components.Motherboard
    ));
  }

  if (components["Power Supply"] && tdp > 0) {
    compatibilityWarnings.push(...compatibilityCheckers.checkPowerSupplyWattage(
      components["Power Supply"],
      tdp
    ));
  }

  if (components.Case && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCaseMotherboard(
      components.Case,
      components.Motherboard
    ));
  }

  if (components.CPU && !components.GPU) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCpuGraphics(
      components.CPU
    ));
  }

  return {
    messages: compatibilityWarnings,
    totalTDP: `${tdp}W`,
    hasCompatibilityIssues: compatibilityWarnings.some(msg => msg.type === "warning"),
  };
};