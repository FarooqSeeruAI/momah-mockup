const kpiCategories = {
    demand: {
        title: "Demand",
        description: "Strong economic and demographic momentum is driving housing demand\nEconomic growth, RHQs, tourism and FDI are pulling people and jobs into hubs like Riyadh.",
        metrics: [
            { id: "pop_growth", label: "Population growth from '21 - '24", value: "~15%", trend: "up", intent: "positive" },
            { id: "employment_growth", label: "Employment growth from '21 - '24", value: "~18%", trend: "up", intent: "positive" },
            { id: "expat_growth", label: "Growth in Riyadh expat population YoY", value: "~6%", trend: "up", intent: "positive" }
        ]
    },
    supply: {
        title: "Supply",
        description: "Housing delivery has slowed materially since 2021\nHousing completions in Riyadh peaked at ~83k units in 2021 and have been broadly flat since.",
        metrics: [
            { id: "completion_drop", label: "Decrease in units completed in '19 vs. '24", value: "~3%", trend: "down", intent: "negative" },
            { id: "permits_decline", label: "Decrease in residential starts permits since '22", value: "~2%", trend: "down", intent: "negative" },
            { id: "starts_issue", label: "Permits / starts issued YoY (early warning on next year delivery)", value: "~5%", trend: "up", intent: "negative" }
        ]
    },
    prices: {
        title: "Prices / Affordability",
        description: "Affordability pressures are most visible in rental accommodation\nRent-to-income ratios exceed 50% for many households, especially for mid-market apartments.",
        metrics: [
            { id: "rent_surge", label: "Apartment rent increase in Riyadh from '22 - '25", value: "~46%", trend: "up", intent: "negative" },
            { id: "rir_increase", label: "Rent-to-income in mid-market segments from '22 - '25", value: "~50%+", trend: "up", intent: "negative", subtext: "Rent-to-income in mid-market segments from '22 - '25" },
            { id: "rir_trend", label: "RIR trending upwards over the last 12 months", value: "High", trend: "up", intent: "negative" }
        ]
    },
    other: {
        title: "Other",
        description: "Real estate is a core enabler of Riyadh’s growth agenda\ncontributing ~12% of non-oil output (real estate + construction); sustained housing cost pressures raise labour costs and strain talent attraction/retention.",
        metrics: [
            { id: "non_oil_gdp", label: "Share of non-oil output linked to real estate + construction", value: "~12%", trend: "neutral", intent: "neutral" },
            { id: "investment_increase", label: "Increase in construction/housing investment since '21", value: "~20%", trend: "up", intent: "positive" },
            { id: "mortgage_lending", label: "Increase in residential mortgage lending YoY", value: "~5%", trend: "up", intent: "positive" }
        ]
    }
};

export { kpiCategories };

export const policyLevers = [
    {
        id: "white_land_fee",
        name: "White Land Fee",
        description: "Expansion of fees on undeveloped urban land to spur development.",
        status: "active",
        impacts: { demand: "neutral", supply: "high", price: "high_positive" }
    },
    {
        id: "vacant_tax",
        name: "Vacant Real Estate Tax",
        description: "progressive tax on vacant residential units to reduce hoarding.",
        status: "draft",
        impacts: { demand: "neutral", supply: "medium", price: "medium_positive" }
    },
    {
        id: "transaction_restrictions",
        name: "Lifting Transaction Restrictions",
        description: "Easing limits on property flipping to increase liquidity.",
        status: "active",
        impacts: { demand: "high", supply: "low", price: "neutral" }
    },
    {
        id: "foreign_ownership",
        name: "Foreign Ownership Reform",
        description: "Allowing non-residents to own property in specific zones.",
        status: "proposed",
        impacts: { demand: "high_negative", supply: "medium", price: "medium_negative" }
    },
    {
        id: "rent_caps",
        name: "Rent Caps & Tenant Framework",
        description: "Capping annual rent increases at 5% and strengthening tenant rights.",
        status: "draft",
        impacts: { demand: "medium", supply: "low_negative", price: "high_positive" }
    }
];

export const ribbonCategories = [
    "Policy Design",
    "Demand & Expectations",
    "Land & Asset Prices",
    "Development Pipeline",
    "Housing Outcomes",
    "Fiscal Effects"
];

export const impactCategories = {
    shortTerm: [
        { title: "Standard of Living", value: "+2.4%", intent: "positive", category: "Housing Outcomes" },
        { title: "Disposable Income", value: "+1.8%", intent: "positive", category: "Fiscal Effects" },
        { title: "Rental Inflation", value: "-3.2%", intent: "positive", category: "Housing Outcomes" },
        { title: "Land Speculation", value: "-12%", intent: "negative", category: "Land & Asset Prices" }, // Negative outcome is good here? Wait. "Negative Impact" usually means Bad. If speculation goes down, that's good. But "Negative Impact" color usually means bad. Let's assume intent='positive' means Good Result regardless of sign.
        // Revised logic: Intent maps to COLOR. If result is GOOD, intent='positive'.
        { title: "Market Liquidity", value: "+15%", intent: "positive", category: "Land & Asset Prices" }
    ],
    mediumTerm: [
        { title: "Home Ownership Rate", value: "68%", intent: "positive", category: "Housing Outcomes" },
        { title: "Housing Stock", value: "+120k", intent: "positive", category: "Development Pipeline" },
        { title: "Market Volatility", value: "Low", intent: "positive", category: "Demand & Expectations" },
        { title: "Project Starts", value: "+8%", intent: "positive", category: "Development Pipeline" },
        { title: "Fiscal Revenue", value: "+4.2B", intent: "positive", category: "Fiscal Effects" }
    ]
};

export const priceScenarioData = [
    { year: 2021, val: 3800 },
    { year: 2022, val: 4100 },
    { year: 2023, val: 4500 },
    { year: 2024, val: 5200 },
    { year: 2025, val: 5800 },
    { year: 2026, val: 6200 }, // Forecast start
    { year: 2027, val: 6500 },
    { year: 2028, val: 6700 },
    { year: 2029, val: 6900 },
    { year: 2030, val: 7100 },
];

export const affordabilityData = {
    pir: [
        { year: 2021, val: 5.1 },
        { year: 2022, val: 5.4 },
        { year: 2023, val: 6.2 },
        { year: 2024, val: 6.9 }, // Current
        { year: 2025, val: 7.3 },
        { year: 2026, val: 7.6 },
        { year: 2027, val: 7.8 },
        { year: 2028, val: 8.1 }
    ],
    rir: [
        { year: 2021, val: 23 },
        { year: 2022, val: 27 },
        { year: 2023, val: 34 },
        { year: 2024, val: 39 }, // Current
        { year: 2025, val: 43 },
        { year: 2026, val: 46 },
        { year: 2027, val: 48 },
        { year: 2028, val: 50 }
    ]
};

export const scenariosData = priceScenarioData.map((d) => {
    // Generate 3 scenarios based on baseline
    // S1: Balanced (Baseline adjusted slightly)
    // S2: Aggressive (Prices drop/stabilize)
    // S3: Conservative (Prices rise)

    // Only diverge after 2025
    if (d.year <= 2025) {
        return {
            year: d.year,
            Actual: d.val,
            S1: d.val,
            S2: d.val,
            S3: d.val
        };
    } else {
        const growthFactor = (d.year - 2025);
        const base = d.val;
        return {
            year: d.year,
            // Actual is effectively baseline forecast here for chart continuity
            S1: base * (1 + (0.02 * growthFactor)), // +2% per year from baseline? No, baseline IS the reference. Let's vary FROM baseline.
            // Let's assume 'base' is the "Do Nothing" forecast.
            S2: base * (1 - (0.03 * growthFactor)), // Aggressive reform -> prices drop 3% relative to baseline per year
            S3: base * (1 + (0.01 * growthFactor)), // Conservative
            // Re-map keys for chart
            s1: base * 0.98,
            s2: base * 0.95,
            s3: base * 1.02
        };
    }
});

export const comparisonData = {
    baseline: priceScenarioData,
    policy: priceScenarioData.map(d => d.year > 2025 ? { ...d, val: d.val * 0.92 } : d) // Simple logic for demo
};

// Cleaned up scenariosData for chart consumption
export const multiScenarioData = [
    { year: 2021, Actual: 3800 },
    { year: 2022, Actual: 4100 },
    { year: 2023, Actual: 4500 },
    { year: 2024, Actual: 5200 },
    { year: 2025, Actual: 5800, S1: 5800, S2: 5800, S3: 5800 },
    { year: 2026, S1: 6100, S2: 5900, S3: 6300 },
    { year: 2027, S1: 6300, S2: 6000, S3: 6600 },
    { year: 2028, S1: 6500, S2: 6100, S3: 6900 },
    { year: 2029, S1: 6700, S2: 6150, S3: 7200 },
    { year: 2030, S1: 6850, S2: 6200, S3: 7500 },
];

export const housingGapData = {
    baseline: [
        { year: 2025, demand: 2442, supply: 2291, gap: 151 },
        { year: 2026, demand: 2530, supply: 2341, gap: 189 },
        { year: 2027, demand: 2622, supply: 2391, gap: 231 },
        { year: 2028, demand: 2717, supply: 2442, gap: 275 },
        { year: 2029, demand: 2815, supply: 2494, gap: 321 },
        { year: 2030, demand: 2914, supply: 2548, gap: 365 }
    ],
    // Policy Scenario: Supply increases to meet demand, reducing the gap
    policy: [
        { year: 2025, demand: 2442, supply: 2291, gap: 151 }, // Starts same
        { year: 2026, demand: 2580, supply: 2450, gap: 130 },  // Demand increased (was 2530)
        { year: 2027, demand: 2690, supply: 2580, gap: 110 },  // Demand increased (was 2622)
        { year: 2028, demand: 2800, supply: 2700, gap: 100 },  // Demand increased (was 2717)
        { year: 2029, demand: 2920, supply: 2800, gap: 120 },  // Demand increased (was 2815)
        { year: 2030, demand: 3050, supply: 2900, gap: 150 }   // Demand increased (was 2914)
    ]
};
