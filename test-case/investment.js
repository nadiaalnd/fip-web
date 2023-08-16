function calculateResult(input) {
  const {
    target_money,
    target_year,
    initial_money,
    investment_periode,
    investment,
    interest,
  } = input;

  let invest_total_tmp = initial_money;
  let target_month = target_year * 12;
  let interest_total = 0;
  let year = 1;

  if (investment_periode === "annually") {
    while (year <= target_year) {
      invest_total_tmp += investment * 12;
      let interest_tmp = invest_total_tmp * (interest / 100);
      invest_total_tmp += interest_tmp;
      interest_total += interest_tmp;
      year++;
    }
  } else if (investment_periode === "monthly") {
    while (year <= target_month) {
      invest_total_tmp += investment;
      let interest_tmp = invest_total_tmp * (interest / 100);
      invest_total_tmp += interest_tmp;
      interest_total += interest_tmp;
      year++;
    }
  }

  const output = {
    invest_total: Math.round(invest_total_tmp),
    invest_primary:
      initial_money +
      Math.round(
        investment * target_year * (investment_periode === "annually" ? 12 : 1)
      ),
    invest_interest: Math.round(interest_total),
    success: invest_total_tmp >= target_money ? 1 : 0,
  };

  if (output.success === 0) {
    let years_needed = year - 1;

    let recommendation_primary = 0;
    let recommendation_interest = 0;
    let recommendation_total = 0;
    let recommendation_year = 0;

    while (recommendation_total <= target_money) {
      years_needed++;
      invest_total_tmp = initial_money;
      interest_total = 0;

      for (let i = 1; i <= years_needed; i++) {
        invest_total_tmp +=
          investment_periode === "annually" ? investment * 12 : investment;
        let interest_tmp = invest_total_tmp * (interest / 100);
        invest_total_tmp += interest_tmp;
        interest_total += interest_tmp;
      }

      recommendation_primary = Math.round(
        investment * years_needed * (investment_periode === "annually" ? 12 : 1)
      );
      recommendation_interest = Math.round(
        recommendation_primary * (interest / 100)
      );
      recommendation_total = recommendation_primary + recommendation_interest;

      recommendation_year =
        investment_periode === "monthly" ? years_needed * 12 : years_needed;

      if (recommendation_total > target_money) {
        break;
      }
    }

    output.recommendation_year = recommendation_year;
    output.recommendation_total = recommendation_total;
    output.recommendation_primary = recommendation_primary;
    output.recommendation_interest = recommendation_interest;
  }

  return output;
}

// Example input
const input = {
  target_money: 10000000,
  target_year: 5,
  initial_money: 1000000,
  investment_periode: "annually",
  investment: 83333.3333333,
  interest: 10,
};

const result = calculateResult(input);
console.log(result);
