// Population filter constants
export const MILLION = 1_000_000;
export const STEP = 10;
export const MIN_VALUE = 0;
export const MAX_VALUE = 10000;

// Animation variants
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
export const variants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    },
    item: {
      hidden: { x: -20, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    }
  };

// Region constants
export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

//API
export const BASE_URL = 'https://restcountries.com/v3.1';
export const FIELDS = 'fields=name,population,region,subregion,flags';