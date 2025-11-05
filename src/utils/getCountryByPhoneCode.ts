import { getCountryDataList } from "countries-list";

export interface CountryType {
  iso2: string;
  name: string;
  phone: string[];
}

/**
 * Find a country by its phone code
 * @param phoneCode - The phone code to search for (e.g., "20", "966", "971")
 * @returns CountryType object or null if not found
 */
export const getCountryByPhoneCode = (
  phoneCode: string
): CountryType | null => {
  const countries = getCountryDataList();

  const country = countries.find((c) =>
    c.phone.some((p) => String(p) === phoneCode)
  );

  if (!country) return null;

  return {
    iso2: country.iso2,
    name: country.name,
    phone: country.phone.map(String),
  };
};

/**
 * Parse a phone number with country code (e.g., "20 1025474376") and return country info
 * @param phoneNumber - Phone number string in format "countryCode number"
 * @param defaultCountry - Default country to use if parsing fails
 * @returns CountryType object
 */
export const parsePhoneNumberCountry = (
  phoneNumber: string | undefined,
  defaultCountry: CountryType
): CountryType => {
  if (!phoneNumber) return defaultCountry;

  // Try to match pattern like "20 1025474376"
  const match = /^(\d+)\s+(.+)$/.exec(String(phoneNumber));

  if (match) {
    const phoneCode = match[1];
    const country = getCountryByPhoneCode(phoneCode);

    if (country) {
      return country;
    }
  }

  return defaultCountry;
};

/**
 * Get country by ISO2 code
 * @param iso2 - The ISO2 country code (e.g., "EG", "SA", "AE")
 * @returns CountryType object or null if not found
 */
export const getCountryByISO2 = (iso2: string): CountryType | null => {
  const countries = getCountryDataList();

  const country = countries.find((c) => c.iso2 === iso2.toUpperCase());

  if (!country) return null;

  return {
    iso2: country.iso2,
    name: country.name,
    phone: country.phone.map(String),
  };
};
