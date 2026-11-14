// Detailed engineering specifications for Samsung Galaxy S26 Ultra components
export const SPECS_DATA = {
  display: {
    id: 'display',
    name: 'Dynamic AMOLED 2X Ultra',
    partNumber: 'SEC-DISP-M14-LTPO',
    category: 'OPTICAL DISPLAY & DIGITIZER',
    subtitle: '6.8" Flat QHD+ Quad HD Edge-to-Edge OLED Panel',
    accentColor: '#36dfff',
    metrics: [
      { label: 'Peak Brightness', value: '4,500 nits' },
      { label: 'Refresh Rate', value: '1 – 120Hz LTPO' },
      { label: 'Resolution', value: '3120 × 1440 (505 ppi)' },
      { label: 'Color Gamut', value: '100% DCI-P3' },
      { label: 'PWM Dimming', value: '3,840Hz Flicker-Free' },
      { label: 'Glass Shield', value: 'Gorilla® Armor Anti-Reflect' },
    ],
    overview:
      'Engineered with cutting-edge M14 organic light-emitting diode material, this emissive display delivers unmatched color fidelity, true infinite contrast, and sub-pixel matrix optimization. Integrated with Vision Booster 3.0 and intelligent ambient color temperature balancing.',
    features: [
      {
        title: 'Micro-Curved Uniform Bezel',
        desc: 'Reduced down to an ultra-thin 1.15mm perimeter border with advanced COP (Chip-on-Plastic) packaging.',
      },
      {
        title: '75% Reflection Reduction',
        desc: 'Advanced optical nano-coating dramatically lowers surface reflection, ensuring crystal-clear visibility even under intense midday sunlight.',
      },
      {
        title: 'Under-Display Ultrasonic Biometrics',
        desc: '3D ultrasonic acoustic fingerprint sensor mapping dermal ridges in less than 0.15 seconds with anti-spoofing liveness verification.',
      },
      {
        title: 'Embedded 12MP Dual-Pixel Selfie Aperture',
        desc: 'Micro-perforated Infinity-O punch-hole with zero light leakage into surrounding active display pixels.',
      },
    ],
    materials: 'Indium Tin Oxide (ITO), Polysilicon Substrate, Corning Gorilla Glass Armor, Anti-Fingerprint Oleophobic Fluoropolymer Coating.',
  },

  camera: {
    id: 'camera',
    name: '200MP Quad ProVisual Camera Matrix',
    partNumber: 'SEC-CAM-ISOCELL-HPX2',
    category: 'OPTOELECTRONIC IMAGING SYSTEM',
    subtitle: 'Quad Sensor Array with Periscope Folded Telephoto & AI ISP',
    accentColor: '#ff4b6e',
    metrics: [
      { label: 'Primary Sensor', value: '200 MP, f/1.7 OIS' },
      { label: 'Periscope Telephoto', value: '50 MP, 5x Optical, 100x Space Zoom' },
      { label: 'Secondary Telephoto', value: '10 MP, 3x Optical OIS' },
      { label: 'Ultra-Wide Macro', value: '12 MP, 120° FOV f/2.2' },
      { label: 'Video Capture', value: '8K @ 60fps / 4K @ 120fps' },
      { label: 'Stabilization', value: '±3.0° Multi-Axis Sensor Shift' },
    ],
    overview:
      'The multi-lens camera module houses four precision optoelectronic sensors engineered to cover focal ranges from 13mm ultrawide to 115mm optical periscope zoom. Coupled with the dedicated ProVisual AI Engine for real-time computational photography, nightography noise reduction, and semantic segmentation.',
    features: [
      {
        title: 'Folded Periscope Prism Module',
        desc: 'Horizontal light-path reflection through an optical prism allows a 5x physical telephoto lens inside a phone thickness of under 8.6mm.',
      },
      {
        title: 'Multi-Coated Sapphire Crystal Lenses',
        desc: 'Nanometer-grade anti-reflective fluorite coating on each outer element eliminates lens flare and internal ghost reflections.',
      },
      {
        title: 'Quad-Pixel Hexa-Binning',
        desc: 'Combines 16 adjacent pixels into a massive 2.4μm super-pixel in low light to capture rich ambient shadows without noise.',
      },
      {
        title: 'Laser Distance Sensor & Dual LED Flash',
        desc: 'Time-of-flight (ToF) laser rangefinder ensures instantaneous focus lock even in near-pitch darkness.',
      },
    ],
    materials: 'CNC-Milled Aerospace Aluminum Housing, Sapphire Crystal Outer Lenses, Brass AF Voice-Coil Motors, Neodymium Magnets.',
  },

  processor: {
    id: 'processor',
    name: 'Snapdragon® 8 Gen 5 for Galaxy',
    partNumber: 'QUALCOMM-SD8G5-4NM',
    category: 'CENTRAL PROCESSING & NEURAL ENGINE',
    subtitle: 'Next-Gen 3nm Architecture with Oryon™ CPU & Adreno Ray Tracing GPU',
    accentColor: '#ffd23f',
    metrics: [
      { label: 'Process Node', value: 'TSMC 3nm (N3P FinFET)' },
      { label: 'CPU Clock Speed', value: 'Up to 4.47 GHz' },
      { label: 'NPU AI Compute', value: '98 TOPS Int8' },
      { label: 'GPU Graphics', value: 'Adreno 840 (Hardware Ray Tracing)' },
      { label: 'Memory Bus', value: '16GB LPDDR5X (10.7 Gbps)' },
      { label: 'Connectivity', value: 'Snapdragon X85 5G & Wi-Fi 7' },
    ],
    overview:
      'The architectural nerve center of the device, integrating CPU, GPU, Neural Processing Unit, Image Signal Processor, and 5G modem on a single silicon die. Designed specifically for on-device generative AI, real-time multimodal voice translation, and console-grade gaming.',
    features: [
      {
        title: 'Hexagon Quantum Neural Engine',
        desc: 'Dedicated 98 TOPS NPU running localized on-device LLMs and real-time generative video synthesis without cloud latency.',
      },
      {
        title: 'Sub-Terahertz Multi-Layer PCB',
        desc: '12-layer high-density interconnect (HDI) printed circuit board with gold-plated micro-vias for minimal signal attenuation.',
      },
      {
        title: 'Low-Power Memory Stacking',
        desc: 'PoP (Package-on-Package) 16GB LPDDR5X RAM directly stacked atop the silicon core to minimize trace length and power dissipation.',
      },
      {
        title: 'Faraday Shielding & EMI Cans',
        desc: 'Precision copper-nickel alloy cans isolate high-frequency 5G RF transmitters from sensitive analog audio and sensor buses.',
      },
    ],
    materials: 'High-Purity Monocrystalline Silicon, Electroless Nickel Immersion Gold (ENIG), Copper-Clad Laminate, Thermal TIM Foil.',
  },

  battery: {
    id: 'battery',
    name: '5,500 mAh Dual-Cell Silicon-Carbon Battery',
    partNumber: 'SEC-BATT-5500-SC2',
    category: 'POWER STORAGE & DISTRIBUTION',
    subtitle: 'High-Density Graphene-Infused Lithium-Ion Pack with Dual Protection IC',
    accentColor: '#33c759',
    metrics: [
      { label: 'Nominal Capacity', value: '5,500 mAh (21.18 Wh)' },
      { label: 'Rated Voltage', value: '3.88 V (Max 4.45 V)' },
      { label: 'Wired Fast Charge', value: '45W Super Fast Charging 2.0' },
      { label: '0 to 65% Time', value: '25 Minutes' },
      { label: 'Wireless Charging', value: '15W Fast Qi2 Magnetic' },
      { label: 'Cycle Retention', value: '> 85% at 1,200 Cycles' },
    ],
    overview:
      'Features a high-density silicon-carbon anode formula delivering 18% greater energy density compared to traditional graphite cells. Regulated by dual battery protection integrated circuits with multi-point temperature sensors for prolonged cell health.',
    features: [
      {
        title: 'Silicon-Carbon Anode Chemistry',
        desc: 'Stores more lithium ions per unit volume, enabling higher capacity within a thinner, safer physical form factor.',
      },
      {
        title: 'Dual-Cell Split Voltage Rail',
        desc: 'Splits incoming 45W current across two parallel charging segments, dramatically curbing thermal throttling during fast recharge.',
      },
      {
        title: 'Multi-Stage Battery Health Algorithm',
        desc: 'Learns user sleep and daily usage routines to pause overnight charging at 80% until 30 minutes before wake-up.',
      },
      {
        title: 'Rigid Structural Pouch Wrap',
        desc: 'Flame-retardant aluminum laminate wrapper with integrated pressure relief valves and laser-welded nickel terminals.',
      },
    ],
    materials: 'Silicon-Carbon Composite Anode, Lithium Nickel Manganese Cobalt Oxide (NMC) Cathode, Aluminum Barrier Foil, Nickel-Plated Terminals.',
  },

  cooling: {
    id: 'cooling',
    name: '3D HyperVapor Chamber Cooling Matrix',
    partNumber: 'SEC-THERM-VC-XL',
    category: 'PASSIVE THERMAL MANAGEMENT',
    subtitle: 'Enlarged Stamped Copper Vapor Chamber with Micro-Capillary Wick',
    accentColor: '#25d0c8',
    metrics: [
      { label: 'Chamber Area', value: '3,850 mm² (1.9x enlargement)' },
      { label: 'Thickness', value: '0.38 mm ultra-thin profile' },
      { label: 'Working Fluid', value: 'Deionized Degassed Water' },
      { label: 'Thermal Conductivity', value: '> 10,000 W/m·K equivalent' },
      { label: 'Core Temp Reduction', value: 'Up to -8.5°C under heavy load' },
      { label: 'Wick Structure', value: 'Sintered Copper Powder Mesh' },
    ],
    overview:
      'A sealed, ultra-thin two-phase thermal heat spreader. Heat generated by the processor instantly vaporizes microscopic working fluid inside the vacuum chamber; the vapor rushes toward cooler zones, condenses, and capillary forces return the liquid to the heat source in a continuous silent loop.',
    features: [
      {
        title: 'Sintered Micro-Capillary Wick Structure',
        desc: 'Sub-micron porous copper powder sintered to internal walls ensures rapid capillary liquid pumping regardless of phone tilt or orientation.',
      },
      {
        title: 'Direct-Die Thermal Interface',
        desc: 'High-grade phase-change thermal interface material (TIM) bridges the gap between SoC shield and chamber with minimal thermal resistance.',
      },
      {
        title: 'Expanded Surface Dissipation Wings',
        desc: 'Extends directly under the battery and frame channels, spreading concentrated thermal loads evenly across the entire rear surface.',
      },
      {
        title: 'Zero Power Consumption',
        desc: '100% passive thermodynamic phase cycle with zero acoustic noise, no fans, and zero moving mechanical parts.',
      },
    ],
    materials: 'Oxygen-Free High Conductivity Copper (OFHC Cu), Sintered Copper Powder, Phase-Change Polymeric TIM, Deionized Working Fluid.',
  },

  frame: {
    id: 'frame',
    name: 'Grade 5 Aerospace Titanium Armor Chassis',
    partNumber: 'SEC-FRAME-TI-6AL4V',
    category: 'STRUCTURAL CHASSIS & SHIELDING',
    subtitle: 'Precision 5-Axis CNC Milled Titanium Rail with Structural Midframe',
    accentColor: '#9fb4c9',
    metrics: [
      { label: 'Alloy Composition', value: 'Titanium Ti-6Al-4V (Grade 5)' },
      { label: 'Tensile Strength', value: '950 MPa' },
      { label: 'Finish', value: 'Satin PVD Titanium Silverblue' },
      { label: 'Water & Dust Rating', value: 'IP68 (1.5m submerged 30min)' },
      { label: 'Antenna Integration', value: 'Sub-6 & mmWave Nano-Molded' },
      { label: 'Weight Reduction', value: '-12g vs Stainless Steel' },
    ],
    overview:
      'Forged from Grade 5 aerospace-grade titanium alloy, combining extraordinary yield strength, scratch resistance, and low mass. The frame features 5-axis CNC machined internal chambers, nano-injection molded antenna insulator breaks, and integrated S-Pen silo.',
    features: [
      {
        title: 'Physical Vapor Deposition (PVD)',
        desc: 'Vacuum-deposited titanium nitride outer coating provides superior surface hardness and resistance to micro-scratches and fingerprint oils.',
      },
      {
        title: 'Precision Antenna Isolator Bands',
        desc: 'Nano-molded polymer joints act as dielectric windows for 5G mmWave, Wi-Fi 7, and Ultra-Wideband (UWB) spatial locating beacons.',
      },
      {
        title: 'Integrated S-Pen Silo Channel',
        desc: 'Reinforced inner chamber with dual inductive charging coils to replenish the S-Pen stylus in under 40 seconds.',
      },
      {
        title: 'Hermetic Gasket Perimeter',
        desc: 'Liquid silicone gaskets around USB-C port, SIM tray, and microphone acoustic ports guarantee genuine IP68 submersible sealing.',
      },
    ],
    materials: 'Grade 5 Titanium (Ti-6Al-4V), 6000-Series Recycled Aluminum Midframe, Nano-Injection Thermoplastic Polymer, Liquid Silicone Gaskets.',
  },

  rearGlass: {
    id: 'rearGlass',
    name: 'Satin Frosted AG Ceramic Glass Panel',
    partNumber: 'SEC-BACK-AG-CERAMIC',
    category: 'EXTERIOR ENCLOSURE & OPTICS HOUSING',
    subtitle: 'Chemically Strengthened Gorilla Glass Victus 2 with Matte Texture',
    accentColor: '#7aa8ff',
    metrics: [
      { label: 'Glass Material', value: 'Gorilla® Glass Victus® 2' },
      { label: 'Surface Finish', value: 'Acid-Etched Matte Satin AG' },
      { label: 'Color Variant', value: 'Titanium Silverblue Satin' },
      { label: 'Drop Resistance', value: 'Up to 2.0m onto concrete' },
      { label: 'Camera Lens Cutouts', value: '4 Dedicated Sapphire Portals' },
      { label: 'Wireless Induction', value: 'Low Dielectric Loss Qi2 Support' },
    ],
    overview:
      'The rear panel is crafted from chemically strengthened glass featuring microscopic acid-etched texture that diffuses ambient reflections into a soft velvet luster while resisting skin oils and smudges. Individual camera portals feature precision diamond-cut chamfer rings.',
    features: [
      {
        title: 'Micro-Etched Anti-Glare Surface',
        desc: 'Millions of sub-micron frosted domes scatter incoming light, eliminating harsh glare while providing a luxurious, tactile grip.',
      },
      {
        title: 'Individual Floating Lens Ports',
        desc: 'Eliminates bulky camera islands in favor of iconic individual floating lens rings with color-matched titanium bezels.',
      },
      {
        title: 'Subtle Laser-Inlaid Branding',
        desc: 'High-precision laser vapor deposition creates a mirrored titanium SAMSUNG emblem flush with the glass surface.',
      },
      {
        title: 'Ceramic Nano-Reinforcement',
        desc: 'Embedded nanocrystals deflect micro-crack propagation, significantly increasing survival rates on rough outdoor drop impacts.',
      },
    ],
    materials: 'Aluminosilicate Glass with Lithium Aluminate Nanocrystals, Anti-Fingerprint PVD Coating, High-Purity Acrylic Adhesive Matrix.',
  },
}

export const NOTE = 'Interactive 3D Engineering Showcase — Samsung Galaxy S26 Ultra Prototype Exploration Model.'
