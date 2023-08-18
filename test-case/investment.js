const input = {
  target_money: 10000000,
  target_year: 2,
  initial_money: 1000000,
  investment_periode: 'annually',
  investment: 100000,
  interest: 10,
};

function calculateResult(input) {
  const {
    target_money,
    target_year,
    initial_money,
    investment_periode,
    investment,
    interest,
  } = input;

  let temp_money = initial_money;
  let isSuccess = false;
  let invest_total = 0;

  for (let i = 0; i < (investment_periode === 'monthly' ? target_year * 12 : target_year); i++) {
  temp_money =
    investment_periode === 'annually'
      ? calculateMoneyByYear(temp_money, investment)
      : calculateMoneyByMonth(temp_money, investment);

  let tmp = getReturnOnInvestment(temp_money, interest, investment_periode);
  temp_money += tmp;
  invest_total += tmp;
}

  isSuccess = temp_money >= target_money ?? false;
  let results = {
    success: isSuccess,
    invest_total: temp_money,
    invest_interest: invest_total,
    invest_primary: temp_money - invest_total,
  };

  if (!isSuccess) {
    const recommendation = gettingRecommendationYearInvestment(
      target_money,
      initial_money,
      investment_periode,
      investment,
      interest
    );
    results = {
      ...results,
      recommendation,
    };
  }

  return results;
}

function gettingRecommendationYearInvestment(
  target_money,
  initial_money,
  investment_periode,
  investment,
  interest
) {
  let temp_money = initial_money;
  let isSuccess = false;
  let invest_total = 0;
  let year = 0;
  while (!isSuccess) {
    temp_money =
      investment_periode == 'annually'
        ? calculateMoneyByYear(temp_money, investment)
        : calculateMoneyByMonth(temp_money, investment);
    let tmp = getReturnOnInvestment(temp_money, interest, investment_periode);
    temp_money += tmp;
    invest_total += tmp;
    year++;
    isSuccess = temp_money >= target_money ?? false;
  }

  return {
    recommendation_year: monthToYear(year, investment_periode),
    invest_total: temp_money,
    invest_interest: invest_total,
    invest_primary: temp_money - invest_total,
  };
}

function monthToYear(month, type = 'annually') {
  return type === 'monthly' ? month / 12 : month;
}

function calculateMoneyByYear(init_money, investment) {
  return investment * 12 + init_money;
}

function calculateMoneyByMonth(init_money, investment) {
  return investment + init_money;
}

function getReturnOnInvestment(init_money, interest) {
  return init_money * (interest / 100);
}

const result = calculateResult(input);
console.log(result);
