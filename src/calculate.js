import { calculateNewCostumers, calculateNewPartners } from "./helper";
export default function calc(inputObject) {
  let {
    AdInvestment,
    baseCustomers,
    basePartners,
    population,
    bills,
    months,
    ccsc,
    cssc,
    pcsc,
    pssc,
    deliveryManSalary,
    inFieldMarketer,
    inFieldMarketerSalary,
    initialInvestment,
    officeEmpCount,
    officeEmpSalary,
    rent,
    rentDeposit,
    howMuchInvInAds,
    customerToOrder
  } = inputObject;
  // data collectors
  let profit = [];
  let balance = [];
  let dm = [];
  let bc = [];
  let ex = [];
  let adInv = [];
  //constants
  const numberOfFamilies = population / 3.7; //each family has 3.7 person in average (Tehran)
  const marketersSalaryThisMonth = inFieldMarketer * inFieldMarketerSalary;
  const TotalOfficeEmpSalary = officeEmpCount * officeEmpSalary;

  //initial values
  let initialCapital = initialInvestment - rentDeposit;
  let newPartnersInCurrentMonth = 0;

  // main loop
  for (var month = 0; month < months; month++) {
    var totalMarketingInvestmentThisMonth =
      AdInvestment + marketersSalaryThisMonth;
    adInv.push(totalMarketingInvestmentThisMonth);
    // calculate new customers this month
    var newCostumersInCurrentMonth = calculateNewCostumers(
      AdInvestment,
      basePartners,
      pcsc,
      baseCustomers,
      cssc
    );
    //each month we lose 10% of our costumers
    baseCustomers = baseCustomers + newCostumersInCurrentMonth - (baseCustomers * 0.2);
    bc.push(baseCustomers);

    // calculate new partners this month. max is 1600 in tehran
    if (basePartners < 1600) {
      newPartnersInCurrentMonth = calculateNewPartners(
        inFieldMarketer,
        basePartners,
        pssc,
        baseCustomers,
        ccsc
      );
      basePartners += newPartnersInCurrentMonth;
    } else {
      basePartners = 1600;
    }

    var marketShareThisMonth = baseCustomers / population;

    // Calculate orders
    var monthlyOrders;
    if (customerToOrder === "method1") {
      // each family order 1 time per month averages to 12.5 yearly
      monthlyOrders = numberOfFamilies * 0.5 * marketShareThisMonth;
    } else {
      monthlyOrders = baseCustomers / 4; // each family is 3.7 person, each family orders once monthly
    }
    var dailyOrders = monthlyOrders / 30;

    // calculate delivery men
    var deliveryMenNeeded = dailyOrders / 25; // each delivery man should deliver 25 orders
    dm.push(deliveryMenNeeded);
    var TotalDeliveryMenSalary = deliveryMenNeeded * deliveryManSalary;

    // calculate expenditure
    var expenditureInThisMonth =
      TotalOfficeEmpSalary + TotalDeliveryMenSalary + rent + bills;
    ex.push(expenditureInThisMonth);

    // calculate profit and income
    var incomeInThisMonth = monthlyOrders * 3000; // each order on average gives use 3000T
    var realMarketShare = monthlyOrders * 3000 / (3000000 * 30000);
    var interestOfMoneyInBank = initialCapital * 0.1 / 12;
    var ProfitInThisMonth =
      incomeInThisMonth + interestOfMoneyInBank - expenditureInThisMonth;
    if (ProfitInThisMonth > 0) {
      AdInvestment += ProfitInThisMonth * howMuchInvInAds;
      ProfitInThisMonth -= ProfitInThisMonth * howMuchInvInAds;
    }
    var netProfitAfterTax = ProfitInThisMonth * 0.97;
    profit.push(netProfitAfterTax);

    initialCapital = initialCapital + ProfitInThisMonth;
    balance.push(initialCapital);
  }

  return {
    ProfitInThisMonth,
    deliveryMenNeeded,
    baseCustomers,
    basePartners,
    interestOfMoneyInBank,
    initialCapital,
    realMarketShare,
    monthlyOrders,
    peyk: dm.map((item, i) => {
      return { count: item, name: i };
    }),
    moshtari: bc.map((item, i) => {
      return { count: item, name: i };
    }),
    balance: balance.map((item, i) => {
      return { balance: item / 1000000, name: i };
    }),
    profit: profit.map((item, i) => {
      return { profit: item / 1000000, name: i };
    }),
    expenditure: ex.map((item, i) => {
      return { ex: item / 1000000, name: i };
    }),
    adInv: adInv.map((item, i) => {
      return { adInv: item / 1000000, name: i };
    })
  };
}
