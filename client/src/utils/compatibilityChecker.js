/**
 * Utility for checking PC part compatibility and generating warning messages
 */

// Base messages that always appear
const BASE_MESSAGES = [
  { type: "note", text: "Choose components that are compatible with each other." },
  { type: "disclaimer", text: "Prices are subject to change based on availability." },
];

/**
 * Component-specific compatibility checkers
 */
const compatibilityCheckers = {
  // CPU and Motherboard compatibility
  checkCpuMotherboard: (cpu, motherboard) => {
    const warnings = [];
    if (cpu.socketType !== motherboard.socketType) {
      warnings.push({
        type: "warning",
        text: `CPU socket (${cpu.socketType}) is not compatible with motherboard socket (${motherboard.socketType}).`,
      });
    }
    return warnings;
  },

  // CPU and Cooler compatibility
  checkCpuCooler: (cpu, cooler) => {
    const warnings = [];
    
    // Check socket compatibility
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
    } else {
      warnings.push({
        type: "warning",
        text: `CPU Cooler is missing supported socket information. Cannot verify compatibility with CPU socket (${cpu.socketType}).`,
      });
    }

    // Check TDP compatibility
    if (parseInt(cooler.maxTdp) < parseInt(cpu.tdp)) {
      warnings.push({
        type: "warning",
        text: `CPU Cooler max TDP (${cooler.maxTdp}W) is lower than CPU TDP (${cpu.tdp}W).`,
      });
    }

    return warnings;
  },

  // Cooler and Case compatibility
  checkCoolerCase: (cooler, pcCase) => {
    const warnings = [];
    if (parseInt(cooler.height) > parseInt(pcCase.maxCoolerHeight)) {
      warnings.push({
        type: "warning",
        text: `CPU Cooler height (${cooler.height}mm) exceeds case's max cooler height (${pcCase.maxCoolerHeight}mm).`,
      });
    }
    return warnings;
  },

  // RAM and Motherboard compatibility
  checkRamMotherboard: (ram, motherboard) => {
    const warnings = [];

    // Check RAM type compatibility
    if (!motherboard.supportedMemoryTypes.includes(ram.type)) {
      warnings.push({
        type: "warning",
        text: `RAM type (${ram.type}) is not compatible with motherboard supported memory types (${motherboard.supportedMemoryTypes}).`,
      });
    }

    // Check RAM speed compatibility
    if (parseInt(ram.speed) > parseInt(motherboard.maxRamSpeed)) {
      warnings.push({
        type: "warning",
        text: `RAM speed (${ram.speed}MHz) exceeds motherboard's max supported speed (${motherboard.maxRamSpeed}MHz). RAM will run at the lower speed.`,
      });
    }

    // Check RAM capacity and slots
    const ramModules = ram.memoryCapacity.split('+').length;
    const totalRamCapacity = ram.memoryCapacity
      .split('+')
      .reduce((sum, cap) => sum + parseInt(cap), 0);

    if (ramModules > parseInt(motherboard.ramSlots)) {
      warnings.push({
        type: "warning",
        text: `Number of RAM modules (${ramModules}) exceeds motherboard's available RAM slots (${motherboard.ramSlots}).`,
      });
    }

    if (totalRamCapacity > parseInt(motherboard.maxRam)) {
      warnings.push({
        type: "warning",
        text: `Total RAM capacity (${totalRamCapacity}GB) exceeds motherboard's max supported capacity (${motherboard.maxRam}GB).`,
      });
    }

    return warnings;
  },

  // GPU and Motherboard compatibility
  checkGpuMotherboard: (gpu, motherboard) => {
    const warnings = [];
    const requiredPcieType = gpu.interfaceType;
    const requiredPcieVersion = "4.0";
    const hasCompatiblePcieSlot = motherboard.pcieSlots.some(
      (slot) =>
        slot.type === requiredPcieType &&
        parseFloat(slot.version) >= parseFloat(requiredPcieVersion)
    );

    if (!hasCompatiblePcieSlot) {
      warnings.push({
        type: "warning",
        text: `GPU interface (${gpu.interfaceType}) is not compatible with motherboard PCIe slots.`,
      });
    }
    return warnings;
  },

  // GPU and Case compatibility
  checkGpuCase: (gpu, pcCase) => {
    const warnings = [];
    if (parseInt(gpu.length) > parseInt(pcCase.maxGpuLength)) {
      warnings.push({
        type: "warning",
        text: `GPU length (${gpu.length}mm) exceeds case's max GPU length (${pcCase.maxGpuLength}mm).`,
      });
    }
    return warnings;
  },

  // GPU and Power Supply compatibility
  checkGpuPowerSupply: (gpu, psu) => {
    const warnings = [];
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
    return warnings;
  },

  // Storage and Motherboard compatibility
  checkStorageMotherboard: (storage, motherboard) => {
    const warnings = [];
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
    return warnings;
  },

  // Expansion Network and Motherboard compatibility
  checkExpansionMotherboard: (expansion, motherboard) => {
    const warnings = [];
    const requiredInterface = expansion.interfaceType;
    const hasCompatiblePcieSlot = motherboard.pcieSlots.some(
      (slot) => slot.type === requiredInterface
    );

    if (!hasCompatiblePcieSlot) {
      warnings.push({
        type: "warning",
        text: `Expansion card interface (${expansion.interfaceType}) is not compatible with motherboard PCIe slots.`,
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
    return warnings;
  },

  // Case and Motherboard form factor compatibility
  checkCaseMotherboard: (pcCase, motherboard) => {
    const warnings = [];
    const supportedFormFactors = pcCase.supportedMotherboardSizes.split(',');
    
    if (!supportedFormFactors.includes(motherboard.formFactor)) {
      warnings.push({
        type: "warning",
        text: `Case does not support motherboard form factor (${motherboard.formFactor}). Supported: ${supportedFormFactors.join(', ')}.`,
      });
    }
    return warnings;
  },

  // CPU integrated graphics check
  checkCpuGraphics: (cpu) => {
    const warnings = [];
    if (!cpu.integratedGraphics) {
      warnings.push({
        type: "warning",
        text: `CPU does not have integrated graphics. A dedicated GPU is required.`,
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

  // Check CPU and Motherboard compatibility
  if (components.CPU && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCpuMotherboard(
      components.CPU.originalData,
      components.Motherboard.originalData
    ));
  }

  // Check CPU and Cooler compatibility
  if (components.CPU && components["CPU Cooler"]) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCpuCooler(
      components.CPU.originalData,
      components["CPU Cooler"].originalData
    ));
  }

  // Check Cooler and Case compatibility
  if (components["CPU Cooler"] && components.Case) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCoolerCase(
      components["CPU Cooler"].originalData,
      components.Case.originalData
    ));
  }

  // Check RAM and Motherboard compatibility
  if (components.RAM && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkRamMotherboard(
      components.RAM.originalData,
      components.Motherboard.originalData
    ));
  }

  // Check GPU and Motherboard compatibility
  if (components.GPU && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkGpuMotherboard(
      components.GPU.originalData,
      components.Motherboard.originalData
    ));
  }

  // Check GPU and Case compatibility
  if (components.GPU && components.Case) {
    compatibilityWarnings.push(...compatibilityCheckers.checkGpuCase(
      components.GPU.originalData,
      components.Case.originalData
    ));
  }

  // Check GPU and Power Supply compatibility
  if (components.GPU && components["Power Supply"]) {
    compatibilityWarnings.push(...compatibilityCheckers.checkGpuPowerSupply(
      components.GPU.originalData,
      components["Power Supply"].originalData
    ));
  }

  // Check Storage and Motherboard compatibility
  if (components.Storage && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkStorageMotherboard(
      components.Storage.originalData,
      components.Motherboard.originalData
    ));
  }

  // Check Expansion Network and Motherboard compatibility
  if (components["Expansion Network"] && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkExpansionMotherboard(
      components["Expansion Network"].originalData,
      components.Motherboard.originalData
    ));
  }

  // Check Power Supply wattage
  if (components["Power Supply"] && tdp > 0) {
    compatibilityWarnings.push(...compatibilityCheckers.checkPowerSupplyWattage(
      components["Power Supply"].originalData,
      tdp
    ));
  }

  // Check Case and Motherboard form factor compatibility
  if (components.Case && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCaseMotherboard(
      components.Case.originalData,
      components.Motherboard.originalData
    ));
  }

  // Check CPU integrated graphics
  if (components.CPU && !components.GPU) {
    compatibilityWarnings.push(...compatibilityCheckers.checkCpuGraphics(
      components.CPU.originalData
    ));
  }

  return {
    messages: compatibilityWarnings,
    totalTDP: `${tdp}W`,
    hasCompatibilityIssues: compatibilityWarnings.some(msg => msg.type === "warning"),
  };
};