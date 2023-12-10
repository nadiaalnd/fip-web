const exCase1 = {
  targetMoney: 10000000,
  time: 5,
  initialMoney: 2000000,
  moneyInvestPerPeriod: 1500000,
  typeInvestment: 'annually',
  returnInvestment: 2,
}

const returningResult = (result) => {
  const commonData = {
    targetMoney: result.targetMoney,
    time: result.time,
    initialMoney: result.initialMoney,
    moneyInvestPerPeriod: result.moneyInvestPerPeriod,
    typeInvestment: result.typeInvestment,
    returnInvestment: result.returnInvestment,
    investmentProfit: result.result.investInterest,
  };

  if (result.isSuccess) {
    return {
      ...commonData,
      investmentResult: {
        isSuccess: result.isSuccess,
        totalMoney: result.result.totalMoney,
        majorInvestment: result.result.majorInvestment,
        investInterest: result.result.investInterest,
      },
    };
  }

  return {
    ...commonData,
    investmentResult: {
      isSuccess: result.isSuccess,
      totalMoney: result.result.totalMoney,
      majorInvestment: result.result.majorInvestment,
      investInterest: result.result.investInterest,
    },
    recommendation: {
      time: result.recommendation.time,
      totalMoney: result.recommendation.totalMoney,
      majorInvestment: result.recommendation.majorInvestment,
      investInterest: result.recommendation.investInterest,
    },
  };
};


findTimeInvestment = (type, time) => (type === 'monthly' ? time * 12 : time)
findReturnInvestmentPerPeriod = (type, returnInvestment) => (type === 'monthly' ? returnInvestment / 12 : returnInvestment)
findReturnPerPeriod = (returnPeriod, moneyInvestment) => (moneyInvestment * (returnPeriod / 100))
calculateInvestment = (iteration, returnInvestmentPerPeriod, moneyInvestPerPeriod, initialMoney) => {
  if (iteration === 0) return initialMoney
  let temp = 0;
  for (let i = 0; i < iteration; i++) {
    if (i === 0) {
      temp = initialMoney + moneyInvestPerPeriod + findReturnPerPeriod(returnInvestmentPerPeriod, initialMoney + moneyInvestPerPeriod)
    } else {
      temp = temp + moneyInvestPerPeriod + findReturnPerPeriod(returnInvestmentPerPeriod, temp + moneyInvestPerPeriod)
    }
  }
  return temp
}

findRecommendation = (testCase) => {
  const {
    targetMoney,
    initialMoney,
    moneyInvestPerPeriod,
    typeInvestment,
    returnInvestment
  } = testCase;

  let year = 0;
  let temp = 0;
  let totalMoney = 0;
  let majorInvestment = 0;
  let investInterest = 0;
  let isSuccess = false;

  while (!isSuccess) {
    year++;
    temp = calculateInvestment(findTimeInvestment(typeInvestment, year), findReturnInvestmentPerPeriod(typeInvestment, returnInvestment), moneyInvestPerPeriod, initialMoney);
    isSuccess = temp >= targetMoney;
    totalMoney = temp;
    majorInvestment = initialMoney + (moneyInvestPerPeriod * findTimeInvestment(typeInvestment, year));
    investInterest = totalMoney - majorInvestment;
  }

  return {
    time: year,
    totalMoney: Math.floor(totalMoney),
    majorInvestment: Math.floor(majorInvestment),
    investInterest: Math.floor(investInterest),
  };
};

const runTest = (testCase) => {
  const {
    targetMoney,
    time,
    initialMoney,
    moneyInvestPerPeriod,
    typeInvestment,
    returnInvestment
  } = testCase;

  const iteration = findTimeInvestment(typeInvestment, time);
  const returnInvestmentPerPeriod = findReturnInvestmentPerPeriod(typeInvestment, returnInvestment);
  const result = Math.floor(calculateInvestment(iteration, returnInvestmentPerPeriod, moneyInvestPerPeriod, initialMoney));

  const isSuccess = result >= targetMoney;
  const recommendation = isSuccess ? {} : findRecommendation(testCase);

  const majorInvestment = initialMoney + (moneyInvestPerPeriod * iteration);
  const investInterest = result - majorInvestment;
  const investmentProfit = result - initialMoney;

  return returningResult({
    targetMoney,
    time,
    initialMoney,
    moneyInvestPerPeriod,
    typeInvestment,
    returnInvestment,
    isSuccess,
    result: {
      totalMoney: result,
      majorInvestment,
      investInterest,
      investmentProfit,
    },
    recommendation,
  });
};

console.log("Test exCase1: ", runTest(exCase1));
