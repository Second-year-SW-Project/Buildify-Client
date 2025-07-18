// Base messages that always appear
const BASE_MESSAGES = [
  { type: "note", text: "Most of our motherboards have sound and networking capabilities. Please contact us if you need to add sound or network cards to in your build." },
  { type: "note", text: "Multiple GPU builds are not allowed in online mode. You have to visit the store physically for such configurations." },
  { type: "disclaimer", text: "Prices are subject to change based on availability." },
];

//Component-specific compatibility checkers
const compatibilityCheckers = {
  // CPU and Motherboard compatibility
  checkCpuMotherboard: (cpu, motherboard) => {
    const warnings = [];

    // Check if required properties exist
    if (!cpu?.socketType || !motherboard?.socketType) {
      return warnings; // Return empty warnings if properties are missing
    }

    // Socket compatibility
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

    // Check if required properties exist
    if (!cpu?.socketType || !cooler) {
      return warnings; // Return empty warnings if properties are missing
    }

    // Socket compatibility
    if (cooler.supportedSocket) {
      const supportedSockets = Array.isArray(cooler.supportedSocket)
        ? cooler.supportedSocket.map(s => s.toLowerCase().trim())
        : [cooler.supportedSocket.toLowerCase().trim()];

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

    return warnings;
  },

  // Cooler and Case compatibility
  checkCoolerCase: (cooler, pcCase) => {
    const warnings = [];

    // Check if required properties exist
    if (!cooler?.height || !pcCase?.maxCoolerHeight) {
      return warnings; // Return empty warnings if properties are missing
    }

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

    // Check if required properties exist
    if (!ram || !motherboard) {
      return warnings; // Return empty warnings if properties are missing
    }

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

    // Check if required properties exist
    if (!storage || !motherboard) {
      return warnings; // Return empty warnings if properties are missing
    }

    // Handle both single storage and array of storage devices
    const storageDevices = Array.isArray(storage) ? storage : [storage];

    // Map storage types to motherboard interface types
    const mapStorageTypeToInterface = (storageType) => {
      switch (storageType?.toLowerCase().trim()) {
        case 'nvme_m.2':
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
        return;
      }

      // Check if the storage type is supported by the motherboard
      if (!motherboardStorageTypes.includes(storageType)) {
        warnings.push({
          type: "warning",
          text: `Storage device ${index + 1} type (${storageDevice.storageType}) is not compatible with motherboard. Motherboard supports: ${motherboardStorageTypes.join(', ')}.`,
        });
        return;
      }

      // Track used slots based on storage type
      if (storageDevice.storageType.toLowerCase().includes('nvme') || storageDevice.storageType.toLowerCase().includes('m.2')) {
        usedM2Slots++;
        if (usedM2Slots > m2Slots) {
          warnings.push({
            type: "warning",
            text: `Number of M.2 drives (${usedM2Slots}) exceeds available M.2 slots (${m2Slots}).`,
          });
        }
      } else if (storageDevice.storageType.toLowerCase().includes('sata')) {
        usedSataSlots++;
        if (usedSataSlots > sataSlots) {
          warnings.push({
            type: "warning",
            text: `Number of SATA drives (${usedSataSlots}) exceeds available SATA ports (${sataSlots}).`,
          });
        }
      }

      // Add note about available slots
      if (storageType === 'M.2' && m2Slots > 0) {
        warnings.push({
          type: "note",
          text: `Motherboard has ${m2Slots} M.2 slot(s) available.`,
        });
      } else if (storageType === 'SATA' && sataSlots > 0) {
        warnings.push({
          type: "note",
          text: `Motherboard has ${sataSlots} SATA port(s) available.`,
        });
      }
    });

    return warnings;
  },

  // GPU and Motherboard compatibility
  checkGpuMotherboard: (gpu, motherboard) => {
    const warnings = [];

    // Check if required properties exist
    if (!gpu || !motherboard) {
      return warnings; // Return empty warnings if properties are missing
    }

    // Check if motherboard has PCIe slots
    if (!motherboard.pcieSlots || motherboard.pcieSlots.length === 0) {
      warnings.push({
        type: "warning",
        text: "Motherboard has no PCIe slots available for the GPU.",
      });
      return warnings;
    }

    // Extract PCIe version and slot type from GPU interface
    const gpuInterface = gpu?.interfaceType?.toLowerCase();
    const match = gpuInterface?.match(/pcie_(\d+_\d+)_(x\d+)/);
    const gpuVersion = match?.[1];
    const gpuSlotType = match?.[2];

    if (!gpuVersion || !gpuSlotType) {
      warnings.push({
        type: "warning",
        text: "Could not determine GPU's PCIe version and slot type.",
      });
      return warnings;
    }

    // Convert GPU version format (e.g., "5_0" to "5.0")
    const formattedGpuVersion = gpuVersion.replace('_', '.');

    // Check compatibility with motherboard slots
    const hasCompatibleSlot = motherboard.pcieSlots.some(slot => {
      const slotVersion = parseFloat(slot.version);
      const gpuVersionNum = parseFloat(formattedGpuVersion);
      
      // Check if slot type matches and version is compatible (GPU can work in lower version slots)
      return slot.type.toLowerCase() === gpuSlotType && slotVersion >= gpuVersionNum;
    });

    if (!hasCompatibleSlot) {
      const availableSlots = motherboard.pcieSlots.map(slot => 
        `PCIe ${slot.version} ${slot.type}`
      ).join(', ');

      warnings.push({
        type: "warning",
        text: `GPU requires PCIe (${formattedGpuVersion} ${gpuSlotType.toUpperCase()}) slot, but motherboard only has (${availableSlots}).`,
      });
    } else {
      // Check if GPU will run at lower speed
      const matchingSlot = motherboard.pcieSlots.find(slot => 
        slot.type.toLowerCase() === gpuSlotType
      );
      
      if (matchingSlot && parseFloat(matchingSlot.version) < parseFloat(formattedGpuVersion)) {
        warnings.push({
          type: "note",
          text: `GPU is PCIe ${formattedGpuVersion} but will run at PCIe ${matchingSlot.version} speed.`,
        });
      }
    }

    return warnings;
  },

  // GPU and Case compatibility
  checkGpuCase: (gpu, pcCase) => {
    const warnings = [];

    // Get length values using camelCase property names
    const gpuLength = gpu?.length;
    const caseMaxLength = pcCase?.maxGpuLength;

    // Check if we have valid length values
    if (gpuLength === undefined || gpuLength === null || caseMaxLength === undefined || caseMaxLength === null) {
      warnings.push({
        type: "warning",
        text: "Could not verify GPU length compatibility. Please check case specifications.",
      });
      return warnings;
    }

    // Length compatibility check
    if (gpuLength > caseMaxLength) {
      warnings.push({
        type: "warning",
        text: `GPU length (${gpuLength}mm) exceeds case's max GPU length (${caseMaxLength}mm).`,
      });
    }

    return warnings;
  },

  // Case and Motherboard form factor compatibility
  checkCaseMotherboard: (pcCase, motherboard) => {
    const warnings = [];

    // Check if required properties exist
    if (!pcCase?.supportedMotherboardSizes || !motherboard?.formFactor) {
      return warnings; // Return empty warnings if properties are missing
    }

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
  checkCpuGraphics: (cpu, components) => {
    const warnings = [];

    // Check if required properties exist
    if (!cpu) {
      return warnings; // Return empty warnings if cpu is missing
    }

    // Check if there's a GPU component (either as GPU or Video Card)
    const hasGpu = components.GPU || components["Video Card"];
    const hasCooler = components["CPU Cooler"];

    // Only show integrated graphics warning if no GPU is present
    if (!cpu.integratedGraphics && !hasGpu) {
      warnings.push({
        type: "warning",
        text: "CPU does not have integrated graphics. A dedicated GPU is required.",
      });
    } else if (cpu.integratedGraphics && cpu.graphicsModel && !hasGpu) {
      warnings.push({
        type: "note",
        text: `CPU includes integrated ${cpu.graphicsModel} graphics.`,
      });
    }

    // Check stock cooler only if no aftermarket cooler is selected
    if (!hasCooler) {
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
    }

    return warnings;
  },

  // Power Supply wattage check
  checkPowerSupplyWattage: (psu, totalTdp) => {
    const warnings = [];
    
    // Check if required properties exist
    if (!psu?.wattage) {
      return warnings; // Return empty warnings if properties are missing
    }
    
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

// Function to remove duplicate messages
const removeDuplicateMessages = (messages) => {
  const seen = new Set();
  return messages.filter(message => {
    const key = `${message.type}-${message.text}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

/**
 * Main compatibility checking function
 * @param {Object} components - Object containing selected components
 * @returns {Object} - Contains compatibility warnings, total TDP, and issues flag
 */
export const checkCompatibility = (components) => {
  let tdp = 0;
  let compatibilityWarnings = [...BASE_MESSAGES];

  // Check if components is valid
  if (!components || typeof components !== 'object') {
    return {
      messages: compatibilityWarnings,
      totalTDP: '0W',
      hasCompatibilityIssues: false
    };
  }

  // Debug logging to see what components and attributes we're receiving
  console.log('=== COMPATIBILITY CHECKER DEBUG ===');
  console.log('Components received:', Object.keys(components));
  
  Object.entries(components).forEach(([key, component]) => {
    if (component) {
      if (Array.isArray(component)) {
        console.log(`${key} (array with ${component.length} items):`, component.map(c => ({
          name: c.name,
          socketType: c.socketType,
          ramSlots: c.ramSlots,
          memoryType: c.memoryType,
          formFactor: c.formFactor,
          interfaceType: c.interfaceType,
          storageType: c.storageType
        })));
      } else {
        console.log(`${key}:`, {
          name: component.name,
          socketType: component.socketType,
          ramSlots: component.ramSlots,
          maxRam: component.maxRam,
          supportedMemoryTypes: component.supportedMemoryTypes,
          memoryType: component.memoryType,
          memoryCapacity: component.memoryCapacity,
          formFactor: component.formFactor,
          supportedMotherboardSizes: component.supportedMotherboardSizes,
          interfaceType: component.interfaceType,
          storageType: component.storageType,
          pcieSlots: component.pcieSlots,
          storageInterfaces: component.storageInterfaces,
          maxGpuLength: component.maxGpuLength,
          maxCoolerHeight: component.maxCoolerHeight,
          wattage: component.wattage
        });
      }
    }
  });
  console.log('=====================================');

  // Calculate total TDP
  Object.values(components).forEach((component) => {
    if (component && component.tdp) {
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

  // Handle both "GPU" and "Video Card" keys for GPU components
  const gpuComponent = components.GPU || components["Video Card"];
  if (gpuComponent && components.Motherboard) {
    compatibilityWarnings.push(...compatibilityCheckers.checkGpuMotherboard(
      gpuComponent,
      components.Motherboard
    ));
  }

  if (gpuComponent && components.Case) {
    compatibilityWarnings.push(...compatibilityCheckers.checkGpuCase(
      gpuComponent,
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

  // Always check CPU graphics, but only show integrated graphics warning if no GPU
  if (components.CPU) {
    const cpuGraphicsWarnings = compatibilityCheckers.checkCpuGraphics(components.CPU, components);
    compatibilityWarnings.push(...cpuGraphicsWarnings);
  }

  // Remove duplicate messages
  compatibilityWarnings = removeDuplicateMessages(compatibilityWarnings);

  // Check if there are any warning messages (excluding base messages)
  const hasCompatibilityIssues = compatibilityWarnings.some(
    message => message.type === 'warning'
  );

  return {
    messages: compatibilityWarnings,
    totalTDP: `${tdp}W`,
    hasCompatibilityIssues
  };
};