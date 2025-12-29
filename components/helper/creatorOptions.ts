
// Country options
export const countryOptions = [
  { label: "India", value: "India" },
  { label: "USA", value: "USA" },
  { label: "UK", value: "UK" },
  { label: "Canada", value: "Canada" },
  { label: "Australia", value: "Australia" },
  { label: "Germany", value: "Germany" },
  { label: "France", value: "France" },
  { label: "Japan", value: "Japan" },
  { label: "Brazil", value: "Brazil" },
  { label: "Mexico", value: "Mexico" },
  { label: "Spain", value: "Spain" },
  { label: "Italy", value: "Italy" },
  { label: "Russia", value: "Russia" },
  { label: "China", value: "China" },
  { label: "South Korea", value: "South Korea" },
];

// Body Type options
export const bodyTypeOptions = [
  { label: "Slim", value: "Slim" },
  { label: "Athletic", value: "Athletic" },
  { label: "Average", value: "Average" },
  { label: "Curvy", value: "Curvy" },
  { label: "Muscular", value: "Muscular" },
  { label: "Petite", value: "Petite" },
  { label: "Plus Size", value: "Plus Size" },
  { label: "Stocky", value: "Stocky" },
  { label: "Lean", value: "Lean" },
];

// Sexual Orientation options
export const sexualOrientationOptions = [
  { label: "Straight", value: "Straight" },
  { label: "Bisexual", value: "Bisexual" },
  { label: "Gay", value: "Gay" },
  { label: "Lesbian", value: "Lesbian" },
  { label: "Queer", value: "Queer" },
  { label: "Asexual", value: "Asexual" },
  { label: "Pansexual", value: "Pansexual" },
  { label: "Other", value: "Other" },
];

// Age Group options
export const ageGroupOptions = [
  { label: "18–25", value: "18–25" },
  { label: "26–35", value: "26–35" },
  { label: "36–45", value: "36–45" },
  { label: "46–55", value: "46–55" },
  { label: "56+", value: "56+" },
];

// Eye Color options
export const eyeColorOptions = [
  { label: "Black", value: "Black" },
  { label: "Brown", value: "Brown" },
  { label: "Blue", value: "Blue" },
  { label: "Green", value: "Green" },
  { label: "Hazel", value: "Hazel" },
  { label: "Gray", value: "Gray" },
  { label: "Amber", value: "Amber" },
  { label: "Other", value: "Other" },
];

// Hair Color options
export const hairColorOptions = [
  { label: "Black", value: "Black" },
  { label: "Brown", value: "Brown" },
  { label: "Blonde", value: "Blonde" },
  { label: "Red", value: "Red" },
  { label: "Auburn", value: "Auburn" },
  { label: "Gray", value: "Gray" },
  { label: "White", value: "White" },
  { label: "Other", value: "Other" },
];

// Ethnicity options
export const ethnicityOptions = [
  { label: "Asian", value: "Asian" },
  { label: "African", value: "African" },
  { label: "European", value: "European" },
  { label: "Latino", value: "Latino" },
  { label: "Middle Eastern", value: "Middle Eastern" },
  { label: "Native American", value: "Native American" },
  { label: "Pacific Islander", value: "Pacific Islander" },
  { label: "Multiracial", value: "Multiracial" },
  { label: "Other", value: "Other" },
];

// Height options
export const heightOptions = [
  { label: "150cm", value: "150cm" },
  { label: "155cm", value: "155cm" },
  { label: "160cm", value: "160cm" },
  { label: "165cm", value: "165cm" },
  { label: "170cm", value: "170cm" },
  { label: "175cm", value: "175cm" },
  { label: "180cm", value: "180cm" },
  { label: "185cm", value: "185cm" },
  { label: "190cm", value: "190cm" },
  { label: "195cm", value: "195cm" },
  { label: "200cm+", value: "200cm+" },
];

// Style options
export const styleOptions = [
  { label: "Casual", value: "Casual" },
  { label: "Glam", value: "Glam" },
  { label: "Sporty", value: "Sporty" },
  { label: "Luxury", value: "Luxury" },
  { label: "Alternative", value: "Alternative" },
  { label: "Professional", value: "Professional" },
  { label: "Bohemian", value: "Bohemian" },
  { label: "Streetwear", value: "Streetwear" },
  { label: "Vintage", value: "Vintage" },
  { label: "Minimalist", value: "Minimalist" },
];

// Size options
export const sizeOptions = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "XXXL", value: "XXXL" },
];

// Popularity options
export const popularityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Trending", value: "Trending" },
  { label: "Rising Star", value: "Rising Star" },
  { label: "Established", value: "Established" },
  { label: "Viral", value: "Viral" },
];

// Gender options
export const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-binary", value: "Non-binary" },
  { label: "Transgender", value: "Transgender" },
  { label: "Genderqueer", value: "Genderqueer" },
  { label: "Other", value: "Other" },
  { label: "Prefer not to say", value: "Prefer not to say" },
];

// All options combined for easy import
export const creatorFormOptions = {
  countryOptions,
  bodyTypeOptions,
  sexualOrientationOptions,
  ageGroupOptions,
  eyeColorOptions,
  hairColorOptions,
  ethnicityOptions,
  heightOptions,
  styleOptions,
  sizeOptions,
  popularityOptions,
  genderOptions,
};

// Helper functions
export const getLabelFromValue = (value: string, options: Array<{label: string, value: string}>): string => {
  const option = options.find(opt => opt.value === value);
  return option ? option.label : value;
};

export const getValueFromLabel = (label: string, options: Array<{label: string, value: string}>): string => {
  const option = options.find(opt => opt.label === label);
  return option ? option.value : label;
};