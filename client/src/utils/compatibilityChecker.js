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
        ? cooler.supportedSocket.map(s => s.toLowerCase().trim())
        : cooler.supportedSocket.split(',').map(s => s.toLowerCase().trim());

      if (!supportedSockets.includes(cpu.socketType.toLowerCase())) {
        const isIntelSocket = cpu.socketType.toLowerCase().startsWith('lga');
        const manufacturer = isIntelSocket ? 'Intel' : 'AMD';
        
        warnings.push({
          type: "warning",
          text: `CPU Cooler does not support ${manufacturer} socket (${cpu.socketType}). This cooler supports (${supportedSockets.join(', ')}).`,
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

    return warnings;
  },

  // RAM and Motherboard compatibility
  checkRamMotherboard: (ram, motherboard) => {
    const warnings = [];

    // Handle both single RAM and array of RAM modules
    const ramModules = Array.isArray(ram) ? ram : [ram];

    // Check total number of RAM modules against available slots
    if (ramModules.length > parseInt(motherboard.ramSlots || '0')) {
      warnings.push({
        type: "warning",
        text: `Number of RAM modules (${ramModules.length}) exceeds motherboard's available RAM slots (${motherboard.ramSlots}).`,
      });
    }

    // Check each RAM module
    ramModules.forEach((ramModule, index) => {
      // RAM type compatibility
      const ramType = ramModule.memoryType?.toLowerCase().trim();
      const motherboardType = motherboard.supportedMemoryTypes?.toLowerCase().trim();

      if (!ramType || !motherboardType) {
        warnings.push({
          type: "warning",
          text: "Could not verify RAM type compatibility. Please check motherboard specifications.",
        });
      } else if (ramType !== motherboardType) {
        warnings.push({
          type: "warning",
          text: `RAM module ${index + 1} type (${ramModule.memoryType}) is not compatible with motherboard. Motherboard supports (${motherboard.supportedMemoryTypes}).`,
        });
      }

      // Calculate total RAM capacity
      const totalRamCapacity = ramModules.reduce((sum, module) =>
        sum + parseInt(module.memoryCapacity?.replace(/[^0-9]/g, '') || '0'), 0
      );

      if (totalRamCapacity > parseInt(motherboard.maxRam || '0')) {
        warnings.push({
          type: "warning",
          text: `Total RAM capacity (${totalRamCapacity}GB) exceeds motherboard's max supported capacity (${motherboard.maxRam}GB).`,
        });
      }
    });

    return warnings;
  },

  // Storage and Motherboard compatibility
  checkStorageMotherboard: (storage, motherboard) => {
    const warnings = [];

    // Handle both single storage and array of storage devices
    const storageDevices = Array.isArray(storage) ? storage : [storage];

    // Map storage types to motherboard interface types
    const mapStorageTypeToInterface = (storageType) => {
      switch (storageType?.toLowerCase().trim()) {
        case 'nvme_m2':
          return 'M.2';
        case 'sata_ssd':
        case 'sata_hdd':
          return 'SATA';
        default:
          return storageType;
      }
    };

    // Track used slots
    let usedM2Slots = 0;
    let usedSataSlots = 0;

    // Get available slots from motherboard
    const m2Slots = motherboard.storageInterfaces?.find(intf => intf.type === 'M.2')?.count || 0;
    const sataSlots = motherboard.storageInterfaces?.find(intf => intf.type === 'SATA')?.count || 0;

    // Check each storage device
    storageDevices.forEach((storageDevice, index) => {
      // Storage type compatibility
      const storageType = mapStorageTypeToInterface(storageDevice.storageType);
      const motherboardStorageTypes = motherboard.storageInterfaces?.map(intf =>
        intf.type?.trim()
      ) || [];

      if (!storageType || motherboardStorageTypes.length === 0) {
        warnings.push({
          type: "warning",
          text: "Could not verify storage type compatibility. Please check motherboard specifications.",
        });
      } else if (!motherboardStorageTypes.includes(storageType)) {
        warnings.push({
          type: "warning",
          text: `Storage device ${index + 1} type (${storageDevice.storageType}) is not compatible with motherboard. Motherboard supports: ${motherboard.storageInterfaces.map(intf => intf.type).join(', ')}.`,
        });
      }

      // Track used slots
      if (storageDevice.storageType === 'nvme_m2') {
        usedM2Slots++;
        if (usedM2Slots > m2Slots) {
          warnings.push({
            type: "warning",
            text: `Number of M.2 drives (${usedM2Slots}) exceeds available M.2 slots (${m2Slots}).`,
          });
        }
      } else if (storageDevice.storageType === 'sata_ssd' || storageDevice.storageType === 'sata_hdd') {
        usedSataSlots++;
        if (usedSataSlots > sataSlots) {
          warnings.push({
            type: "warning",
            text: `Number of SATA drives (${usedSataSlots}) exceeds available SATA ports (${sataSlots}).`,
          });
        }
      }
    });

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

    return warnings;
  },

  // Case and Motherboard form factor compatibility
  checkCaseMotherboard: (pcCase, motherboard) => {
    const warnings = [];

    // Form factor sizes in order from smallest to largest
    const formFactorSizes = {
      'mini_itx': 1,
      'micro_atx': 2,
      'atx': 3,
      'e_atx': 4,
      'xl_atx': 5
    };

    // Get the size ranking for both case and motherboard
    const caseSize = formFactorSizes[pcCase.supportedMotherboardSizes.toLowerCase()] || 0;
    const motherboardSize = formFactorSizes[motherboard.formFactor.toLowerCase()] || 0;

    // Check if motherboard is larger than case
    if (motherboardSize > caseSize) {
      warnings.push({
        type: "warning",
        text: `Case form factor (${pcCase.supportedMotherboardSizes}) is too small for motherboard (${motherboard.formFactor}).`,
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

    // Power supply efficiency ratings in order from lowest to highest
    const efficiencyRatings = {
      '80_plus_white': 1,
      '80_plus_bronze': 2,
      '80_plus_silver': 3,
      '80_plus_gold': 4,
      '80_plus_platinum': 5,
      '80_plus_titanium': 6
    };

    // Power supply modular types in order from least to most modular
    const modularTypes = {
      'non_modular': 1,
      'semi_modular': 2,
      'fully_modular': 3
    };

    if (parseInt(psu.wattage) < recommendedWattage) {
      warnings.push({
        type: "warning",
        text: `Power supply (${psu.wattage}W) may be insufficient for system TDP (${totalTdp}W). Recommended (${Math.ceil(recommendedWattage)}W).`,
      });
    }

    // Efficiency rating check
    const currentEfficiency = efficiencyRatings[psu.efficiencyRating] || 0;
    const goldEfficiency = efficiencyRatings['80_plus_gold'];

    if (totalTdp > 500 && currentEfficiency < goldEfficiency) {
      warnings.push({
        type: "note",
        text: "Consider a higher efficiency power supply (80+ Gold or better) for high-power systems.",
      });
    }

    // Modular type check
    const currentModularity = modularTypes[psu.modularType] || 0;
    const nonModular = modularTypes['non_modular'];

    if (currentModularity === nonModular && totalTdp > 400) {
      warnings.push({
        type: "note",
        text: "Consider a semi-modular or fully-modular power supply for better cable management in high-power systems.",
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