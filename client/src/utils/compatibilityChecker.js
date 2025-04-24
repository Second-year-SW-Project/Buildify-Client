/**
 * Utility for checking PC part compatibility and generating warning messages
 */

/**
 * Performs compatibility checks between different PC components
 * @param {Object} components - Object containing selected components
 * @returns {Object} - Contains compatibility warnings, total TDP, and issues flag
 */
export const checkCompatibility = (components) => {
  let tdp = 0;
  let compatibilityWarnings = [];

  // Base messages that always appear
  const baseMessages = [
    { type: "note", text: "Choose components that are compatible with each other." },
    { type: "disclaimer", text: "Prices are subject to change based on availability." },
  ];

  // Calculate total TDP
  Object.values(components).forEach((component) => {
    if (component.tdp) {
      tdp += parseInt(component.tdp);
    }
  });

  // Check for CPU and motherboard socket compatibility
  if (components.CPU && components.Motherboard) {
    const cpu = components.CPU.originalData;
    const motherboard = components.Motherboard.originalData;

    if (cpu.socketType !== motherboard.socketType) {
      compatibilityWarnings.push({
        type: "warning",
        text: `CPU socket (${cpu.socketType}) is not compatible with motherboard socket (${motherboard.socketType}).`,
      });
    }
  }

  // Check for CPU cooler compatibility
  if (components.CPU && components["CPU Cooler"]) {
    const cpu = components.CPU.originalData;
    const cooler = components["CPU Cooler"].originalData;

    // Check socket compatibility
    if (cooler.supportedSocket) {
      const supportedSockets = Array.isArray(cooler.supportedSocket)
        ? cooler.supportedSocket
        : cooler.supportedSocket.split(',').map(s => s.trim());
      if (!supportedSockets.includes(cpu.socketType)) {
        compatibilityWarnings.push({
          type: "warning",
          text: `CPU Cooler does not support CPU socket (${cpu.socketType}). Supported sockets: ${supportedSockets.join(', ')}.`,
        });
      }
    } else {
      compatibilityWarnings.push({
        type: "warning",
        text: `CPU Cooler is missing supported socket information. Cannot verify compatibility with CPU socket (${cpu.socketType}).`,
      });
    }

    // Check TDP compatibility
    if (parseInt(cooler.maxTdp) < parseInt(cpu.tdp)) {
      compatibilityWarnings.push({
        type: "warning",
        text: `CPU Cooler max TDP (${cooler.maxTdp}W) is lower than CPU TDP (${cpu.tdp}W).`,
      });
    }
  }

  // Check cooler height with case
  if (components["CPU Cooler"] && components.Case) {
    const cooler = components["CPU Cooler"].originalData;
    const pcCase = components.Case.originalData;

    if (parseInt(cooler.height) > parseInt(pcCase.maxCoolerHeight)) {
      compatibilityWarnings.push({
        type: "warning",
        text: `CPU Cooler height (${cooler.height}mm) exceeds case's max cooler height (${pcCase.maxCoolerHeight}mm).`,
      });
    }
  }

  // Check for RAM compatibility with motherboard
  if (components.RAM && components.Motherboard) {
    const ram = components.RAM.originalData;
    const motherboard = components.Motherboard.originalData;

    // Check RAM type compatibility
    if (!motherboard.supportedMemoryTypes.includes(ram.type)) {
      compatibilityWarnings.push({
        type: "warning",
        text: `RAM type (${ram.type}) is not compatible with motherboard supported memory types (${motherboard.supportedMemoryTypes}).`,
      });
    }

    // Check RAM speed compatibility
    if (parseInt(ram.speed) > parseInt(motherboard.maxRamSpeed)) {
      compatibilityWarnings.push({
        type: "warning",
        text: `RAM speed (${ram.speed}MHz) exceeds motherboard's max supported speed (${motherboard.maxRamSpeed}MHz). RAM will run at the lower speed.`,
      });
    }

    // Check RAM capacity and slots
    const ramModules = ram.memoryCapacity.split('+').length; // E.g., "8GB+8GB" -> 2 modules
    const totalRamCapacity = ram.memoryCapacity
      .split('+')
      .reduce((sum, cap) => sum + parseInt(cap), 0);

    if (ramModules > parseInt(motherboard.ramSlots)) {
      compatibilityWarnings.push({
        type: "warning",
        text: `Number of RAM modules (${ramModules}) exceeds motherboard's available RAM slots (${motherboard.ramSlots}).`,
      });
    }

    if (totalRamCapacity > parseInt(motherboard.maxRam)) {
      compatibilityWarnings.push({
        type: "warning",
        text: `Total RAM capacity (${totalRamCapacity}GB) exceeds motherboard's max supported capacity (${motherboard.maxRam}GB).`,
      });
    }
  }

  // Check for GPU compatibility
  if (components.GPU && components.Motherboard) {
    const gpu = components.GPU.originalData;
    const motherboard = components.Motherboard.originalData;

    // Check PCIe slot compatibility
    const requiredPcieType = gpu.interfaceType; // E.g., "PCIe x16"
    const requiredPcieVersion = "4.0"; // Assume minimum version; adjust based on data if available
    const hasCompatiblePcieSlot = motherboard.pcieSlots.some(
      (slot) =>
        slot.type === requiredPcieType &&
        parseFloat(slot.version) >= parseFloat(requiredPcieVersion)
    );

    if (!hasCompatiblePcieSlot) {
      compatibilityWarnings.push({
        type: "warning",
        text: `GPU interface (${gpu.interfaceType}) is not compatible with motherboard PCIe slots.`,
      });
    }
  }

  // Check GPU length with case
  if (components.GPU && components.Case) {
    const gpu = components.GPU.originalData;
    const pcCase = components.Case.originalData;

    if (parseInt(gpu.length) > parseInt(pcCase.maxGpuLength)) {
      compatibilityWarnings.push({
        type: "warning",
        text: `GPU length (${gpu.length}mm) exceeds case's max GPU length (${pcCase.maxGpuLength}mm).`,
      });
    }
  }

  // Check GPU power connectors with power supply
  if (components.GPU && components["Power Supply"]) {
    const gpu = components.GPU.originalData;
    const psu = components["Power Supply"].originalData;

    // Assuming powerConnectors is a string like "8-pin+6-pin"
    const requiredConnectors = gpu.powerConnectors.split('+');
    const hasSufficientConnectors = requiredConnectors.every((connector) =>
      psu.modularType === "Fully Modular" || psu.modularType.includes(connector)
    );

    if (!hasSufficientConnectors) {
      compatibilityWarnings.push({
        type: "warning",
        text: `Power supply does not provide required power connectors for GPU (${gpu.powerConnectors}).`,
      });
    }
  }

  // Check storage compatibility with motherboard
  if (components.Storage && components.Motherboard) {
    const storage = components.Storage.originalData;
    const motherboard = components.Motherboard.originalData;

    const requiredStorageType = storage.storageType; // E.g., "NVMe", "SATA"
    const hasCompatibleStorageInterface = motherboard.storageInterfaces.some(
      (intf) => intf.type === requiredStorageType && intf.count > 0
    );

    if (!hasCompatibleStorageInterface) {
      compatibilityWarnings.push({
        type: "warning",
        text: `Storage type (${storage.storageType}) is not supported by motherboard storage interfaces.`,
      });
    }
  }

  // Check expansion network compatibility
  if (components["Expansion Network"] && components.Motherboard) {
    const expansion = components["Expansion Network"].originalData;
    const motherboard = components.Motherboard.originalData;

    const requiredInterface = expansion.interfaceType; // E.g., "PCIe x1"
    const hasCompatiblePcieSlot = motherboard.pcieSlots.some(
      (slot) => slot.type === requiredInterface
    );

    if (!hasCompatiblePcieSlot) {
      compatibilityWarnings.push({
        type: "warning",
        text: `Expansion card interface (${expansion.interfaceType}) is not compatible with motherboard PCIe slots.`,
      });
    }
  }

  // Check power supply wattage sufficiency
  if (components["Power Supply"] && tdp > 0) {
    const psu = components["Power Supply"].originalData;
    const recommendedWattage = tdp * 1.3; // 30% overhead for system stability

    if (parseInt(psu.wattage) < recommendedWattage) {
      compatibilityWarnings.push({
        type: "warning",
        text: `Power supply (${psu.wattage}W) may be insufficient for system TDP (${tdp}W). Recommended: ${Math.ceil(recommendedWattage)}W.`,
      });
    }
  }

  // Check case and motherboard form factor compatibility
  if (components.Case && components.Motherboard) {
    const pcCase = components.Case.originalData;
    const motherboard = components.Motherboard.originalData;
    const supportedFormFactors = pcCase.supportedMotherboardSizes.split(','); // E.g., "ATX,Micro-ATX"

    if (!supportedFormFactors.includes(motherboard.formFactor)) {
      compatibilityWarnings.push({
        type: "warning",
        text: `Case does not support motherboard form factor (${motherboard.formFactor}). Supported: ${supportedFormFactors.join(', ')}.`,
      });
    }
  }

  // Check if GPU is required when CPU has no integrated graphics
  if (components.CPU && !components.GPU) {
    const cpu = components.CPU.originalData;

    if (!cpu.integratedGraphics) {
      compatibilityWarnings.push({
        type: "warning",
        text: `CPU does not have integrated graphics. A dedicated GPU is required.`,
      });
    }
  }

  // Return all relevant data
  return {
    messages: [...baseMessages, ...compatibilityWarnings],
    totalTDP: `${tdp}W`,
    hasCompatibilityIssues: compatibilityWarnings.length > 0,
  };
};