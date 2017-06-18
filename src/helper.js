export const calculateNewCostumers = (
  AdInvestment,
  basePartners,
  pcsc,
  baseCustomers,
  cssc
) => {
  // each user need 25T of ads to view it once, and 1/3 of them will sign-up
  // 1/3 of signups convert to purchase => roughly 250,000 T
  return (AdInvestment / 200000) + basePartners * pcsc + baseCustomers * cssc;
};

export const calculateNewPartners = (
  inFieldMarketer,
  basePartners,
  pssc,
  baseCustomers,
  ccsc
) => {
  return 10 * inFieldMarketer + basePartners * pssc + baseCustomers * ccsc;
};
