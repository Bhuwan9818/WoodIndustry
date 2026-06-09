// WoodCraft Pallets – Product Data
// 15 Products with full details for SEO and display

const PRODUCTS = [
  {
    id: 1,
    slug: "euro-pallets",
    name: "Euro Pallets (EUR 1200×800mm)",
    category: "pallet",
    tags: ["pallet", "export"],
    emoji: "🪵",
    shortDesc: "Standard European-size pallets. Universally compatible with racking systems and pallet trucks across all major industries.",
    description: "Euro Pallets (EUR/EPAL) are the most widely used pallet size in Europe and globally. Measuring 1200×800mm, they are compatible with all major warehouse racking systems, pallet trucks, and forklifts. Our Euro Pallets are manufactured from quality hardwood and softwood, kiln-dried to optimal moisture content for maximum strength and dimensional stability. Suitable for food, pharmaceuticals, FMCG, and general cargo.",
    specs: {
      "Dimensions": "1200 × 800 × 144 mm",
      "Load Capacity": "1,500 kg (static)",
      "Wood Type": "Hardwood / Softwood",
      "Moisture Content": "≤20%",
      "Surface Finish": "Planed / Rough",
      "Certification": "EUR/EPAL Standard"
    },
    features: [
      "Compatible with all standard racking systems",
      "Available heat treated (ISPM-15) for export",
      "Kiln-dried for dimensional stability",
      "4-way fork entry for forklift operation",
      "Reversible top deck option available",
      "Custom notching on request"
    ]
  },
  {
    id: 2,
    slug: "block-pallets",
    name: "Standard Block Pallets",
    category: "pallet",
    tags: ["pallet", "custom"],
    emoji: "📦",
    shortDesc: "Heavy-duty 9-block pallets with 4-way entry. Ideal for high-stack warehousing and automated pallet handling.",
    description: "Block Pallets (also called Perimeter Base Pallets) feature 9 wooden blocks between the top and bottom boards, providing a robust structure that allows 4-way entry for forklifts and pallet jacks from any side. This design distributes load evenly and is preferred for heavy goods, automated warehouses, and racking systems. Our block pallets are available in all standard sizes and can be custom manufactured.",
    specs: {
      "Standard Size": "1200 × 1000 mm",
      "Load Capacity": "2,000 kg (static)",
      "Block Configuration": "9-block (3×3 grid)",
      "Entry Type": "4-way (all sides)",
      "Top Boards": "5–7 boards (customizable)",
      "Wood Species": "Pinewood / Hardwood"
    },
    features: [
      "4-way forklift entry from all directions",
      "9-block design for maximum load distribution",
      "Higher load capacity than stringer pallets",
      "Suitable for automated handling systems",
      "Available in custom dimensions",
      "Heat treatment available for export"
    ]
  },
  {
    id: 3,
    slug: "heat-treated-export-pallets",
    name: "Heat Treated Export Pallets (ISPM-15)",
    category: "pallet",
    tags: ["pallet", "export"],
    emoji: "🔥",
    shortDesc: "ISPM-15 certified heat treated pallets. Mandatory for international export. Officially stamped and certified.",
    description: "Heat Treated Pallets are essential for all international shipments and are required by ISPM-15 (International Standards for Phytosanitary Measures No. 15) regulations. Our certified kiln treatment raises the core temperature of wood to 56°C for a minimum of 30 minutes, eliminating pests and pathogens. Every pallet is officially stamped with the IPPC mark, country code, producer number, and HT designation — accepted by customs authorities worldwide.",
    specs: {
      "Treatment Standard": "ISPM-15 / IPPC",
      "Core Temperature": "56°C for ≥30 minutes",
      "Marking": "IPPC Official Stamp",
      "Dimensions": "Custom / Any Standard Size",
      "Moisture Post-Treatment": "≤18%",
      "Compliance": "Global Export Ready"
    },
    features: [
      "ISPM-15 compliant with official IPPC stamp",
      "Accepted at all international ports and customs",
      "Eliminates wood-boring pests and fungi",
      "Available in all pallet sizes",
      "Certificate of treatment provided with each shipment",
      "Mandatory for USA, EU, China, Australia exports"
    ]
  },
  {
    id: 4,
    slug: "heavy-duty-pallets",
    name: "Heavy Duty Industrial Pallets",
    category: "pallet",
    tags: ["pallet", "custom"],
    emoji: "⚙️",
    shortDesc: "High load-bearing pallets for machinery, engineering parts, and heavy industrial goods. Up to 5,000 kg capacity.",
    description: "Heavy Duty Industrial Pallets are engineered for applications requiring exceptional load-bearing capacity. Used extensively in automotive, steel, mining, and heavy engineering sectors, these pallets are built with extra-thick planks, reinforced stringers, and additional block support. Available in static load ratings from 2,000 to 5,000 kg. Custom designs with steel reinforcement also available.",
    specs: {
      "Static Load Capacity": "Up to 5,000 kg",
      "Dynamic Load Capacity": "Up to 2,500 kg",
      "Plank Thickness": "25–38 mm",
      "Stringer Size": "38 × 75 mm minimum",
      "Wood Species": "Hardwood (Teak/Sal/Eucalyptus)",
      "Surface": "Rough sawn / Anti-slip available"
    },
    features: [
      "Extra-thick hardwood planks for maximum strength",
      "Reinforced double stringer construction",
      "Suitable for machinery and industrial parts",
      "Anti-slip surface treatment available",
      "Custom sizes and load ratings on request",
      "Compatible with crane slings and spreader bars"
    ]
  },
  {
    id: 5,
    slug: "two-way-entry-pallets",
    name: "Two-Way Entry Pallets",
    category: "pallet",
    tags: ["pallet"],
    emoji: "↔️",
    shortDesc: "Cost-effective stringer pallets with two-way forklift entry. Standard choice for manual and semi-automated warehouses.",
    description: "Two-Way Entry Pallets feature solid stringers that allow fork entry from two sides only (front and back). This classic design is the most economical pallet solution and remains widely used in storage, distribution, and light manufacturing environments. Our two-way pallets are available in multiple sizes and can be upgraded with notched stringers for limited 4-way access.",
    specs: {
      "Entry": "2-way (front and back)",
      "Stringer Type": "Solid or Notched",
      "Standard Dimensions": "1200 × 800 / 1200 × 1000 mm",
      "Load Capacity": "1,000–1,500 kg",
      "Top Boards": "3–5 boards",
      "Application": "General Warehousing"
    },
    features: [
      "Most economical pallet design",
      "Available with notched stringers for partial 4-way entry",
      "Strong and durable for general warehousing",
      "Easy to repair and maintain",
      "Available in multiple standard sizes",
      "Ideal for pallet racking systems"
    ]
  },
  {
    id: 6,
    slug: "four-way-entry-pallets",
    name: "Four-Way Entry Pallets",
    category: "pallet",
    tags: ["pallet", "export"],
    emoji: "🔄",
    shortDesc: "Versatile pallets with full 4-way forklift access. Preferred for automated warehouses, distribution centers, and export.",
    description: "Four-Way Entry Pallets allow forklift access from all four sides, making them ideal for busy distribution centers, automated storage systems, and environments where space is limited. They are commonly preferred for export cargo and pharmaceutical logistics where quick and flexible handling is required. Our 4-way entry pallets are built for durability and long-term reuse.",
    specs: {
      "Entry": "4-way (all sides)",
      "Deck Type": "Solid / Slatted",
      "Standard Size": "1200 × 1000 mm",
      "Load Capacity": "1,500–2,000 kg",
      "Stringer Notch": "75 × 75 mm minimum",
      "Reusability": "High (multi-trip)"
    },
    features: [
      "Full 4-way fork entry for operational flexibility",
      "Preferred for pharmaceutical and food-grade logistics",
      "Compatible with automated guided vehicles (AGVs)",
      "Durable construction for multi-trip use",
      "Available with closed or open bottom deck",
      "Heat treatment for export available"
    ]
  },
  {
    id: 7,
    slug: "wooden-crates-open-top",
    name: "Wooden Crates (Open Top)",
    category: "crate",
    tags: ["crate"],
    emoji: "📫",
    shortDesc: "Open-top wooden crates for easy loading of heavy parts, castings, and machinery components. Stackable design.",
    description: "Open Top Wooden Crates are designed for items that need to be loaded from above — ideal for heavy castings, engine parts, moulds, and oversized industrial components. Built with thick boards and corner block reinforcement, these crates are stackable and reusable. Side panels can be slatted or solid depending on the protection level required. Custom interiors with foam, dunnage, or wooden brackets available.",
    specs: {
      "Type": "Open Top / No Lid",
      "Wall Construction": "Solid or Slatted Boards",
      "Standard Sizes": "Custom / As per requirement",
      "Base": "Skid or Pallet base available",
      "Stackability": "2–4 layers (design-dependent)",
      "Corner Reinforcement": "Hardwood corner blocks"
    },
    features: [
      "Easy top-loading for cranes and hoists",
      "Solid or slatted side walls for protection vs ventilation",
      "Stackable design with corner lock blocks",
      "Pallet or skid base for forklift handling",
      "Custom interior padding and fixings on request",
      "Suitable for heavy castings and engine parts"
    ]
  },
  {
    id: 8,
    slug: "wooden-crates-closed-fumigated",
    name: "Closed Wooden Crates (Fumigated)",
    category: "crate",
    tags: ["crate", "export"],
    emoji: "📦",
    shortDesc: "Fully enclosed fumigated wooden crates for export and international shipment. ISPM-15 certified.",
    description: "Closed Fumigated Wooden Crates provide complete enclosure and protection for valuable export cargo. These crates are made from ISPM-15-compliant wood, treated with heat treatment or fumigation (Methyl Bromide – MB) as per destination country requirements. Suitable for machinery, electronics, high-value goods, and museum-grade cargo. Available with waterproof lining, VCI film, and desiccant options.",
    specs: {
      "Type": "Fully Closed (6-sided)",
      "Treatment": "ISPM-15 HT or MB Fumigation",
      "Lining Options": "Polyfilm / VCI Film / Kraft Paper",
      "Dimensions": "Custom-built to cargo dimensions",
      "Closure": "Screw/nail-on lid with banding",
      "Export Marking": "Official IPPC stamp included"
    },
    features: [
      "Full 6-sided enclosure for maximum cargo protection",
      "ISPM-15 certified (HT or MB) with official IPPC stamp",
      "Waterproof lining and moisture protection available",
      "VCI film for corrosion-sensitive metal parts",
      "Custom-built to exact cargo dimensions",
      "Certificate of fumigation provided with each unit"
    ]
  },
  {
    id: 9,
    slug: "pallet-boxes-collars",
    name: "Pallet Boxes & Pallet Collars",
    category: "crate",
    tags: ["crate", "custom"],
    emoji: "🗃️",
    shortDesc: "Stackable pallet boxes and collars for bulk storage of loose parts, produce, and agricultural goods.",
    description: "Pallet Boxes and Collars combine a standard pallet base with removable or foldable wooden side walls, creating a versatile container for bulk storage and transport. Widely used in agriculture (fruits, vegetables), automotive (small parts bins), and retail backroom storage. The collars can be added or removed to adjust container height, and multiple units stack securely for space-efficient storage.",
    specs: {
      "Base Size": "1200 × 800 or 1200 × 1000 mm",
      "Box Height": "200–800 mm (stackable collars)",
      "Side Material": "OSB / Solid Board / Slatted",
      "Stack Height": "3–5 boxes (empty)",
      "Load Capacity": "500–1,000 kg",
      "Collar Layers": "1–4 per box"
    },
    features: [
      "Adjustable height with stackable collar design",
      "Fold-flat when empty for efficient return logistics",
      "Ideal for fruits, vegetables, and bulk produce",
      "Small-parts storage for automotive and engineering",
      "Durable OSB or solid board side panels",
      "Compatible with standard pallet bases"
    ]
  },
  {
    id: 10,
    slug: "pallet-skids",
    name: "Pallet Skids (Runner Pallets)",
    category: "pallet",
    tags: ["pallet", "custom"],
    emoji: "🛷",
    shortDesc: "Simple skid pallets with 2 or 3 runners. Lightweight and cost-effective for single-trip export use.",
    description: "Pallet Skids (or Runner Pallets) consist of deck boards nailed onto longitudinal runners — they have no bottom boards, making them lighter and cheaper than full pallets. Widely used as a single-use export packaging base for heavy machinery, equipment, and large-format cargo. Also used as a base for wooden crates. Available in all sizes with optional anti-slip and banding notches.",
    specs: {
      "Runner Count": "2 or 3 runners",
      "Runner Dimensions": "75×75 or 100×100 mm",
      "Entry": "2-way only",
      "Standard Sizes": "Custom / As required",
      "Top Deck": "3–5 boards",
      "Use Case": "Single-trip / Export base"
    },
    features: [
      "Lighter and lower-cost than full block pallets",
      "Ideal for heavy machinery as an export base",
      "Strong runners for forklift handling",
      "Banding notches for securing straps",
      "Anti-slip surface treatment available",
      "Available in any custom size"
    ]
  },
  {
    id: 11,
    slug: "notched-pallets",
    name: "Notched Stringer Pallets",
    category: "pallet",
    tags: ["pallet"],
    emoji: "🔧",
    shortDesc: "Modified stringer pallets with notches for partial 4-way pallet jack entry. Best of both 2-way and 4-way designs.",
    description: "Notched Stringer Pallets are a cost-effective upgrade over standard 2-way pallets. Rectangular notches are cut into the solid stringers, allowing pallet jack wheeled legs to enter from all four sides — giving limited 4-way entry without the full cost of a block pallet. This makes them ideal for retail distribution and grocery supply chains where pallet jacks are used in aisles.",
    specs: {
      "Entry": "4-way (notched for pallet jack)",
      "Notch Size": "75 × 75 mm standard",
      "Stringer Count": "3 stringers",
      "Dimensions": "1200 × 800 / 1200 × 1000 mm",
      "Load Capacity": "1,200–1,500 kg",
      "Ideal For": "Retail / FMCG distribution"
    },
    features: [
      "4-way pallet jack entry from all sides",
      "More economical than full block pallet",
      "Preferred by FMCG and retail distribution",
      "Pallet trucks can enter from all four sides",
      "Can be upgraded to heat treated",
      "Compliant with GMA pallet standards"
    ]
  },
  {
    id: 12,
    slug: "reversible-pallets",
    name: "Reversible Double-Deck Pallets",
    category: "pallet",
    tags: ["pallet", "custom"],
    emoji: "🔃",
    shortDesc: "Pallets with usable top and bottom decks. Double the service life — flip and reuse when one side wears.",
    description: "Reversible Double-Deck Pallets have a full closed deck on both top and bottom, allowing the pallet to be flipped and reused when the upper surface shows wear. This doubles the effective service life and is especially useful for long-term pool pallets. The uniform top and bottom also make them ideal for automated pallet handling systems. Both surfaces can carry the rated load.",
    specs: {
      "Deck": "Full closed top AND bottom",
      "Load Capacity": "1,500 kg per side",
      "Entry": "4-way",
      "Thickness": "Approx. 180–200 mm",
      "Wood Type": "Hardwood (for durability)",
      "Application": "Pool pallets / Long-term reuse"
    },
    features: [
      "Both top and bottom are functional decks",
      "Double service life — flip when worn on one side",
      "Ideal for pallet pool and rental programs",
      "Uniform load distribution on both surfaces",
      "4-way fork entry",
      "Reduced total cost of ownership over time"
    ]
  },
  {
    id: 13,
    slug: "pharmaceutical-grade-pallets",
    name: "Pharmaceutical Grade Pallets",
    category: "pallet",
    tags: ["pallet", "export", "custom"],
    emoji: "💊",
    shortDesc: "Hygienic, smooth-finish pallets for pharma and food-grade applications. Free of knots, protrusions, and splinters.",
    description: "Pharmaceutical Grade Pallets are manufactured to meet the hygiene and quality requirements of pharmaceutical, food, and healthcare supply chains. They feature smooth-planed surfaces, no protruding nails or splinters, tight-knot-free boards, and optional white or natural finish. These pallets comply with WHO Good Distribution Practice (GDP) guidelines and are compatible with cleanroom environments and cold-chain logistics.",
    specs: {
      "Surface": "Smooth planed, splinter-free",
      "Nail Type": "Annular ring / Recessed only",
      "Moisture Content": "≤12% (kiln dried)",
      "Dimensions": "1200 × 800 mm standard",
      "Compliance": "WHO GDP / GMP compatible",
      "Inspection": "100% board-level QC"
    },
    features: [
      "Smooth planed surfaces — no splinters or protrusions",
      "Recessed nail heads prevent product damage",
      "Kiln-dried to low moisture for stability",
      "No bark or loose knots",
      "Compatible with cleanroom requirements",
      "Heat treated (ISPM-15) available for export pharma"
    ]
  },
  {
    id: 14,
    slug: "automotive-oem-pallets",
    name: "Automotive / OEM Wooden Pallets",
    category: "pallet",
    tags: ["pallet", "custom"],
    emoji: "🚗",
    shortDesc: "Custom wooden pallets and racks for auto parts, bumpers, and OEM components. Built to plant-specific specs.",
    description: "Automotive OEM Pallets are custom-designed wooden pallet and rack solutions for car parts, engine components, bumpers, body panels, and sub-assemblies. These are built to plant-specific engineering drawings and are used across the Tier 1 and Tier 2 auto supply chain. Dunnage, foam inserts, pipe supports, and fabric protection can be incorporated. Available as single-trip or returnable pallet designs.",
    specs: {
      "Design": "Custom per engineering drawing",
      "Application": "Auto parts, OEM supply chain",
      "Material": "Hardwood + optional steel brackets",
      "Inserts": "Foam / Fabric / Pipe dunnage",
      "Returnable": "Single-trip or multi-trip",
      "Min. Order": "50 units (custom designs)"
    },
    features: [
      "Custom-built to OEM engineering specifications",
      "Foam and fabric inserts to protect finished surfaces",
      "Pipe and rod dunnage for cylinders and shafts",
      "Compatible with Tier 1 supplier requirements",
      "Both single-trip and returnable designs available",
      "Quick-turn manufacturing for line-stop situations"
    ]
  },
  {
    id: 15,
    slug: "custom-sized-pallets",
    name: "Custom Sized Wooden Pallets",
    category: "custom",
    tags: ["pallet", "crate", "custom", "export"],
    emoji: "📐",
    shortDesc: "Any size, any load capacity, any wood species. Fully custom manufacturing to your exact specification.",
    description: "WoodCraft Pallets specializes in manufacturing fully custom wooden pallets to any dimension, load capacity, board configuration, and wood species. Whether you need an unusual footprint for specialized machinery, pallets for a non-standard racking system, or a one-of-a-kind solution for an oddly shaped product — our in-house design team can engineer and manufacture it. Share your requirements and receive a drawing + quote within 48 hours.",
    specs: {
      "Size Range": "Any dimension (min 400mm)",
      "Load Capacity": "Custom engineered",
      "Wood Species": "Pine, Teak, Sal, Eucalyptus, Plywood",
      "Design Turnaround": "48 hours (drawing + quote)",
      "Min. Order": "25 units (custom)",
      "Lead Time": "5–15 business days"
    },
    features: [
      "Any footprint, height, and load specification",
      "Engineering drawing provided before production",
      "All wood species available — soft and hardwood",
      "Plywood deck options for smooth surfaces",
      "Mixed material pallets (wood + metal) on request",
      "Prototype approval before full production run"
    ]
  }
];
