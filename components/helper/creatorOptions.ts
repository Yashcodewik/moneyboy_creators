import countriesData from "../data/countries.json";

export const countryOptions = countriesData.map((country) => ({
  label: country.label,
  value: country.value,
}));
// Body Type options
export const bodyTypeOptions = [
  { label: "All Body Types", value: "all" },
  { label: "Slim", value: "slim" },
  { label: "Athletic", value: "athletic" },
  { label: "Muscular", value: "muscular" },
  { label: "Average", value: "average" },
  { label: "Stocky", value: "stocky" },
  { label: "Bear", value: "bear" },
  { label: "Twink", value: "twink" },
  { label: "Otter", value: "otter" },
];


// Sexual Orientation options
export const sexualOrientationOptions = [
  { label: "All Sexual Orientations", value: "all" },
  { label: "Gay", value: "gay" },
  { label: "Bisexual", value: "bisexual" },
  { label: "Straight", value: "straight" },
  { label: "Queer", value: "queer" },
];


// Age Group options
export const ageGroupOptions = [
  { label: "All Ages", value: "all" },
  { label: "18–24", value: "18_24" },
  { label: "25–29", value: "25_29" },
  { label: "30–34", value: "30_34" },
  { label: "35–39", value: "35_39" },
  { label: "40–44", value: "40_44" },
  { label: "45+", value: "45_plus" },
];


// Eye Color options
export const eyeColorOptions = [
  { label: "All Eye Colors", value: "all" },
  { label: "Brown", value: "brown" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Hazel", value: "hazel" },
  { label: "Grey", value: "grey" },
  { label: "Other", value: "other" },
];

// Hair Color options
export const hairColorOptions = [
  { label: "All Hair Colors", value: "all" },
  { label: "Black", value: "black" },
  { label: "Brown", value: "brown" },
  { label: "Blonde", value: "blonde" },
  { label: "Red", value: "red" },
  { label: "Grey", value: "grey" },
  { label: "Shaved / Bald", value: "shaved_bald" },
];


// Ethnicity options
export const ethnicityOptions = [
  { label: "All Ethnicities", value: "all" },
  { label: "Caucasian", value: "caucasian" },
  { label: "Latino", value: "latino" },
  { label: "Black", value: "black" },
  { label: "Asian", value: "asian" },
  { label: "Middle Eastern", value: "middle_eastern" },
  { label: "Mixed", value: "mixed" },
  { label: "Other", value: "other" },
];


// Height options
export const heightOptions = [
  { label: "All Heights", value: "all" },
  { label: "Under 170 cm", value: "under_170" },
  { label: "170–175 cm", value: "170_175" },
  { label: "176–180 cm", value: "176_180" },
  { label: "181–185 cm", value: "181_185" },
  { label: "186–190 cm", value: "186_190" },
  { label: "Over 190 cm", value: "over_190" },
];


// Style options
export const styleOptions = [
  { label: "All Styles", value: "all" },
  { label: "Casual", value: "casual" },
  { label: "Sporty", value: "sporty" },
  { label: "Elegant", value: "elegant" },
  { label: "Alternative", value: "alternative" },
  { label: "Street", value: "street" },
  { label: "Minimal", value: "minimal" },
  { label: "Artistic", value: "artistic" },
];


// Size options
export const sizeOptions = [
  { label: "All Sizes", value: "all" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "X-Large", value: "x_large" },
];


// Popularity options
export const popularityOptions = [
  { label: "All Popularity", value: "all" },
  { label: "Most Popular", value: "most_popular" },
  { label: "Trending Now", value: "trending_now" },
  { label: "New Profiles", value: "new_profiles" },
];


// Gender options
export const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-binary", value: "Non-binary" },
  { label: "Transgender", value: "Transgender" },
  { label: "Genderqueer", value: "Genderqueer" },
  { label: "Other", value: "Other" },
];

export const categoryOptions = [
  { label: "All Categories", value: "all" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Fitness", value: "fitness" },
  { label: "Fashion", value: "fashion" },
  { label: "Underwear", value: "underwear" },
  { label: "Swimwear", value: "swimwear" },
  { label: "Artistic", value: "artistic" },
  { label: "Casual", value: "casual" },
  { label: "Fetish", value: "fetish" },
  { label: "Adult", value: "adult" },
  { label: "Exclusive", value: "exclusive" },
  { label: "Behind the Scenes", value: "behind_the_scenes" },
];


// Feature/Status options
export const featureOptions = [
  { label: "Featured", value: "featured" },
  { label: "Trending", value: "trending" },
  { label: "New Creators", value: "new_creators" },
  { label: "Most Followed", value: "most_followed" },
  { label: "Most Liked", value: "most_liked" },
];


// City options (you might want to load these from a separate JSON file)
// For now, here are some common global cities
export const cityOptions = [
  { label: "All Cities", value: "all" },
  { label: "New York", value: "new_york" },
  { label: "Los Angeles", value: "los_angeles" },
  { label: "Chicago", value: "chicago" },
  { label: "London", value: "london" },
  { label: "Paris", value: "paris" },
  { label: "Tokyo", value: "tokyo" },
  { label: "Singapore", value: "singapore" },
  { label: "Sydney", value: "sydney" },
  { label: "Dubai", value: "dubai" },
  { label: "Toronto", value: "toronto" },
  { label: "Miami", value: "miami" },
  { label: "Las Vegas", value: "las_vegas" },
  { label: "Berlin", value: "berlin" },
  { label: "Amsterdam", value: "amsterdam" },
  { label: "Hong Kong", value: "hong_kong" },
  { label: "Bangkok", value: "bangkok" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Shanghai", value: "shanghai" },
  { label: "São Paulo", value: "sao_paulo" },
  { label: "Other", value: "other" },
];

// All options combined for easy import
export const creatorFormOptions = {
  countryOptions,
  categoryOptions,
  featureOptions,
  cityOptions,
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

 export const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Available", value: "available" },
  { label: "Downloaded", value: "downloaded" },
];

export const typeOptions = [
  { label: "All Types", value: "all" },
  { label: "Photos", value: "photo" },
  { label: "Videos", value: "video" },
  { label: "Bundles", value: "bundle" },
  { label: "PPV", value: "ppv" },
];

export const timeOptions = [
  { label: "Most Recent", value: "most_recent" },
  { label: "Today", value: "today" },
  { label: "Last Week", value: "last_7_days" },
  { label: "Last Month", value: "last_30_days" },
  { label: "All Time", value: "all_time" },
];

export const creatorsOptions = [
  { label: "option 1", value: "option 1" },
  { label: "option 2", value: "option 2" },
  { label: "option 3", value: "option 3" },
  { label: "option 4", value: "option 4" },
  { label: "option 5", value: "option 5" },
];
// Helper functions
export const getLabelFromValue = (
  value: string,
  options: Array<{ label: string; value: string }>
): string => {
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};

export const getValueFromLabel = (
  label: string,
  options: Array<{ label: string; value: string }>
): string => {
  const option = options.find((opt) => opt.label === label);
  return option ? option.value : label;
};
