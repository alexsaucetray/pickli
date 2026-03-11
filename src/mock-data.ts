import type { PickliAnalysis } from './types';

export const MOCK_ANALYSIS: PickliAnalysis = {
  productName: "PowerFuel Protein Bar",
  productCategory: "Protein / Energy Bar",
  healthScore: 33,
  healthLabel: "Below Average",
  aiSummary: "A solid protein source for post-workout recovery, but nutritional value is undercut by high added sugars and a controversial synthetic dye hidden in the coating.",
  servingSize: "1 Bar (60g)",
  calories: "240",
  protein: "20g",
  carbs: "24g",
  fat: "8g",
  macroDetails: [
    {
      name: "Protein",
      amount: "20g",
      level: "high",
      sentiment: "positive",
      context: "Provides sufficient essential amino acids to trigger muscle protein synthesis post-exercise. The whey isolate base offers rapid bioavailability with a complete amino acid profile.",
      contextNote: "For a protein bar, 20g per serving is well within the optimal 20-40g range for post-workout recovery."
    },
    {
      name: "Total Carbohydrates",
      amount: "24g",
      level: "moderate",
      sentiment: "neutral",
      context: "Sufficient to elicit a mild insulin response to shuttle amino acids into muscle tissue, but not high enough for primary endurance glycogen replenishment.",
      contextNote: "Acceptable for a recovery-focused bar. For a daily snack, this would be on the higher side."
    },
    {
      name: "Added Sugars",
      amount: "12g",
      level: "high",
      sentiment: "negative",
      context: "Represents ~24% of the recommended daily limit for added sugars (50g). Chronic excess is associated with hepatic insulin resistance, elevated triglycerides, and systemic inflammation.",
      contextNote: "For a protein bar consumed daily, 12g of added sugar is suboptimal. Competing products achieve similar taste profiles with 2-4g."
    },
    {
      name: "Total Fat",
      amount: "8g",
      level: "low",
      sentiment: "positive",
      context: "A low lipid profile is advantageous here, as excessive fat delays gastric emptying and slows the rapid absorption of the accompanying whey protein.",
      contextNote: "Well-calibrated for a post-workout product where fast nutrient delivery matters."
    },
    {
      name: "Sodium",
      amount: "140mg",
      level: "low",
      sentiment: "positive",
      context: "A benign amount that assists in cellular fluid balance and nutrient co-transport without contributing to systemic hypertension risk.",
      contextNote: "At 6% of the daily value, this is a non-concern for virtually all dietary patterns."
    }
  ],
  pros: [
    "High-quality complete protein (20g whey isolate) optimal for muscle synthesis",
    "Low sodium content supports cardiovascular health",
    "Low fat profile enables rapid protein absorption post-exercise",
  ],
  cons: [
    "12g added sugar per serving approaches daily intake thresholds",
    "Contains Red 40, a synthetic azo dye linked to neurobehavioral effects in children",
    "Yogurt coating relies on refined fractionated palm oil",
  ],
  scoreFactors: [
    { label: "High protein (20g)", points: 8, type: "pro" },
    { label: "Low sodium (140mg)", points: 5, type: "pro" },
    { label: "High added sugar (12g)", points: -10, type: "con" },
    { label: "Low fiber (<2g)", points: -4, type: "con" },
    { label: "High-risk: Red 40 (Synthetic Dye)", points: -10, type: "con" },
    { label: "Moderate-risk: Yogurt Coating", points: -2, type: "con" },
    { label: "Moderate-risk: Added Sugar (Sucrose)", points: -2, type: "con" },
    { label: "Moderate-risk: Palm Oil (Refined)", points: -2, type: "con" },
  ],
  ingredients: [
    {
      position: 1,
      rawName: "Protein Blend (Whey Protein Isolate, Milk Protein Isolate)",
      commonName: "Protein Blend",
      primaryFunction: "Primary macronutrient source providing essential amino acids for muscle repair and growth.",
      riskLevel: "low",
      concerns: [],
      regulatoryStatus: { fda: "GRAS", efsa: "Approved" },
      isAllergen: true,
      isSynthetic: false,
      isAdditive: false,
    },
    {
      position: 2,
      rawName: "Whey Protein Isolate",
      commonName: "Whey Protein",
      primaryFunction: "Fast-absorbing dairy protein with high leucine content for triggering muscle protein synthesis.",
      riskLevel: "low",
      concerns: [
        { text: "Contains milk proteins that are common allergens, potentially triggering IgE-mediated immune responses in sensitized individuals.", evidenceLevel: "strong" }
      ],
      regulatoryStatus: { fda: "GRAS", efsa: "Approved" },
      doseContext: "20g total protein per serving is within the safe and effective range for general populations.",
      isAllergen: true,
      isSynthetic: false,
      isAdditive: false,
      parentIngredient: "Protein Blend",
    },
    {
      position: 3,
      rawName: "Milk Protein Isolate",
      commonName: "Milk Protein",
      primaryFunction: "Slower-digesting casein-dominant protein providing sustained amino acid release.",
      riskLevel: "low",
      concerns: [
        { text: "Dairy allergen. Contains both casein and whey fractions that may trigger responses in milk-allergic individuals.", evidenceLevel: "strong" }
      ],
      regulatoryStatus: { fda: "GRAS", efsa: "Approved" },
      isAllergen: true,
      isSynthetic: false,
      isAdditive: false,
      parentIngredient: "Protein Blend",
    },
    {
      position: 4,
      rawName: "Yogurt Flavored Coating (Sugar, Fractionated Palm Kernel Oil, Whey Powder, Nonfat Dry Milk, Citric Acid, Soy Lecithin)",
      commonName: "Yogurt Coating",
      primaryFunction: "Provides texture, flavor, and structural integrity to the bar exterior.",
      riskLevel: "moderate",
      concerns: [
        { text: "Composite ingredient relying on refined fractionated oils and added sugars to maintain room-temperature stability, reducing overall nutritional density.", evidenceLevel: "moderate" }
      ],
      regulatoryStatus: { fda: "Approved", efsa: "Approved" },
      isAllergen: false,
      isSynthetic: false,
      isAdditive: false,
    },
    {
      position: 5,
      rawName: "Sugar",
      commonName: "Added Sugar (Sucrose)",
      primaryFunction: "Sweetener and texture modifier in the yogurt coating.",
      riskLevel: "moderate",
      concerns: [
        { text: "Chronic excess consumption of added sucrose is associated with hepatic insulin resistance, elevated triglycerides, and increased risk of metabolic syndrome in large prospective cohort studies.", evidenceLevel: "strong" },
        { text: "The WHO recommends limiting added sugars to <10% of total energy intake, with conditional recommendation for <5%.", evidenceLevel: "strong" }
      ],
      regulatoryStatus: { fda: "GRAS", efsa: "Approved - daily intake guidelines apply" },
      doseContext: "12g per serving is 24% of the FDA's recommended daily limit of 50g for a 2,000 calorie diet.",
      isAllergen: false,
      isSynthetic: false,
      isAdditive: true,
      parentIngredient: "Yogurt Coating",
    },
    {
      position: 6,
      rawName: "Fractionated Palm Kernel Oil",
      commonName: "Palm Oil (Refined)",
      primaryFunction: "Provides solid fat structure for the coating at room temperature.",
      riskLevel: "moderate",
      concerns: [
        { text: "High in saturated fatty acids (lauric and myristic acid), which in excess are associated with elevated LDL cholesterol in randomized controlled trials.", evidenceLevel: "moderate" },
        { text: "Fractionation concentrates the saturated fat fraction, though the small quantity used in coatings limits absolute dietary impact.", evidenceLevel: "limited" }
      ],
      regulatoryStatus: { fda: "GRAS", efsa: "Approved" },
      doseContext: "Contributes a minor fraction of the bar's 8g total fat. Dietary impact depends on overall daily saturated fat intake.",
      isAllergen: false,
      isSynthetic: false,
      isAdditive: false,
      parentIngredient: "Yogurt Coating",
    },
    {
      position: 7,
      rawName: "Citric Acid",
      commonName: "Citric Acid",
      primaryFunction: "Acidity regulator, flavor enhancer, and mild preservative.",
      riskLevel: "low",
      concerns: [
        { text: "Industrially produced via Aspergillus niger fermentation, but biologically identical to the citric acid found naturally in citrus fruits. No evidence of adverse effects at typical dietary levels.", evidenceLevel: "theoretical" }
      ],
      regulatoryStatus: { fda: "GRAS", efsa: "Approved - no ADI needed" },
      isAllergen: false,
      isSynthetic: true,
      isAdditive: true,
      parentIngredient: "Yogurt Coating",
    },
    {
      position: 8,
      rawName: "Soy Lecithin",
      commonName: "Soy Lecithin",
      primaryFunction: "Emulsifier that prevents fat and water separation in the coating.",
      riskLevel: "low",
      concerns: [
        { text: "Soy-derived ingredient that may contain trace soy proteins. Most soy-allergic individuals tolerate refined soy lecithin, but those with severe soy allergy should exercise caution.", evidenceLevel: "moderate" }
      ],
      regulatoryStatus: { fda: "GRAS", efsa: "Approved" },
      isAllergen: true,
      isSynthetic: false,
      isAdditive: true,
      parentIngredient: "Yogurt Coating",
    },
    {
      position: 9,
      rawName: "Natural Flavors",
      commonName: "Natural Flavors",
      primaryFunction: "Flavor compounds derived from plant or animal sources to enhance taste.",
      riskLevel: "low",
      concerns: [
        { text: "Umbrella term that can include hundreds of compounds. While derived from natural sources, the final formulation may be highly processed. Transparency is limited by trade secret protections.", evidenceLevel: "limited" }
      ],
      regulatoryStatus: { fda: "GRAS", efsa: "Approved under flavoring regulations" },
      isAllergen: false,
      isSynthetic: false,
      isAdditive: true,
    },
    {
      position: 10,
      rawName: "Red 40 (Allura Red AC)",
      commonName: "Red 40 (Synthetic Dye)",
      primaryFunction: "Synthetic azo dye used purely for visual color appeal.",
      riskLevel: "high",
      concerns: [
        { text: "The European Food Safety Authority requires products containing Red 40 to carry a warning label stating it 'may have an adverse effect on activity and attention in children,' based on the 2007 Southampton double-blind RCT (McCann et al.).", evidenceLevel: "strong" },
        { text: "May contain low levels of carcinogenic contaminants (benzidine, 4-aminobiphenyl) as manufacturing byproducts, though typically below FDA-established limits of 1 ppb.", evidenceLevel: "moderate" },
        { text: "Several countries have banned or restricted Red 40. The EU requires warning labels while the FDA maintains its approval based on its own risk assessment framework.", evidenceLevel: "strong" }
      ],
      regulatoryStatus: { fda: "Approved (certified, batch-tested)", efsa: "Approved with mandatory warning label" },
      doseContext: "Exact amount not disclosed on label. Typical usage in food coatings is 5-40mg per serving; the ADI is 7mg/kg body weight/day.",
      isAllergen: false,
      isSynthetic: true,
      isAdditive: true,
    },
  ],
  isOrganic: false,
  ingredientSimplicity: 'complex',
  lowNutrientExpectations: [],
};
