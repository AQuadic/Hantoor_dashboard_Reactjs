import { countries, ICountry, TCountryCode } from "countries-list";

export interface CountryWithCode extends ICountry {
  iso2: TCountryCode;
}

export const getCountryByIso2 = (iso2: TCountryCode): CountryWithCode => {
  const country = countries[iso2];

  return {
    ...country,
    iso2,
  };
};
