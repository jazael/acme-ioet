const readFile = require('./readfile');
const constants = require('./constants');
const utils = require('./utilities')

const calculatorSchedulsWorking = (file) => {
  const informationFile = readFile(file);
  return informationFile.map(value => `The amount to pay  ${value.employee} is: ${calculationOfHoursWorked(value.schedules)} USD`);
}

const calculationOfHoursWorked = (arrSchedules) => {
  const amountToPay = arrSchedules
    .map(value => {
      const schedule_abbreviation = value.slice(0, 2);
      const schedule = value.slice(2);
      const arrSchedule = schedule.split('-');

      return rulesToCalculateTheSalary(arrSchedule, schedule_abbreviation);
    })
    .reduce((previous, current) => {
      return previous + current;
    });

  return parseFloat(amountToPay).toFixed(2);
}

const rulesToCalculateTheSalary = (...args) => {
  const [timechain, schedule_abbreviation] = args;
  const abbreviation = ['MO', 'TU', 'WE', 'TH', 'FR'];
  let employeesalary = 0;

  const IT_IS_WEEKEND = (abbreviation.indexOf(schedule_abbreviation) !== -1) ? false : true;

  const BONUS_NIGHT_AND_MORNING = IT_IS_WEEKEND ? (constants.HOUR_PAYMENT.NIGHT_AND_MORNING + constants.EXTRA_BONUS_WEEKEND) : constants.HOUR_PAYMENT.NIGHT_AND_MORNING;
  const BONUS_MORNING_AND_EVENING = IT_IS_WEEKEND ? (constants.HOUR_PAYMENT.MORNING_AND_EVENING + constants.EXTRA_BONUS_WEEKEND) : constants.HOUR_PAYMENT.MORNING_AND_EVENING;
  const BONUS_EVENING_AND_NIGHT = IT_IS_WEEKEND ? (constants.HOUR_PAYMENT.EVENING_AND_NIGHT + constants.EXTRA_BONUS_WEEKEND) : constants.HOUR_PAYMENT.EVENING_AND_NIGHT;

  const ruleOneOfWorkSchedule = constants.WORK_SCHEDULE.NIGHT_AND_MORNING.split('-');
  const ruleTwoOfWorkSchedule = constants.WORK_SCHEDULE.MORNING_AND_EVENING.split('-');
  const ruleThreeOfWorkSchedule = constants.WORK_SCHEDULE.EVENING_AND_NIGHT.split('-');

  const ruleOneTime = utils.coversionTimeChainToTimeNumberRefactoring(ruleOneOfWorkSchedule[0], ruleOneOfWorkSchedule[1]);
  const ruleTwoTime = utils.coversionTimeChainToTimeNumberRefactoring(ruleTwoOfWorkSchedule[0], ruleTwoOfWorkSchedule[1]);
  const ruleThreeTime = utils.coversionTimeChainToTimeNumberRefactoring(ruleThreeOfWorkSchedule[0], ruleThreeOfWorkSchedule[1]);

  const times = utils.coversionTimeChainToTimeNumberRefactoring(timechain[0], timechain[1]);

  const isRuleOneStartTime = times.startofworktime >= ruleOneTime.startofworktime;
  const isRuleOneEndTime = times.endofworktime <= ruleOneTime.endofworktime;

  const isRuleTwoStartTime = times.startofworktime >= ruleTwoTime.startofworktime;
  const isRuleTwoEndTime = times.endofworktime <= ruleTwoTime.endofworktime;

  const isRuleThreeStartTime = times.startofworktime >= ruleThreeTime.startofworktime;
  const isRuleThreeEndTime = times.endofworktime <= ruleThreeTime.endofworktime;

  if (isRuleOneStartTime && isRuleOneEndTime) {
    const diffWorkScheduleNightAndMorning = utils.differenceBetweenHours(timechain[0], timechain[1], '.');

    employeesalary = (diffWorkScheduleNightAndMorning * BONUS_NIGHT_AND_MORNING);
  }
  else if (isRuleTwoStartTime && isRuleTwoEndTime) {
    const diffWorkScheduleMorningAndEvening = utils.differenceBetweenHours(timechain[0], timechain[1], '.');

    employeesalary = (diffWorkScheduleMorningAndEvening * BONUS_MORNING_AND_EVENING);
  }
  else if (isRuleThreeStartTime && isRuleThreeEndTime) {
    const diffWorkScheduleEveningAndNight = utils.differenceBetweenHours(timechain[0], timechain[1], '.');

    employeesalary = (diffWorkScheduleEveningAndNight * BONUS_EVENING_AND_NIGHT);
  }
  else {
    if (isRuleOneStartTime && isRuleTwoEndTime) {
      const diffWorkScheduleNightAndMorning = utils.differenceBetweenHours(timechain[0], ruleOneOfWorkSchedule[1], '.');
      const diffWorkScheduleMorningAndEvening = utils.differenceBetweenHours(ruleOneOfWorkSchedule[1], timechain[1], '.');

      employeesalary = (diffWorkScheduleNightAndMorning * BONUS_NIGHT_AND_MORNING) + (diffWorkScheduleMorningAndEvening * BONUS_MORNING_AND_EVENING);
    } else {
      const diffWorkScheduleNightAndMorning = utils.differenceBetweenHours(timechain[0], ruleOneOfWorkSchedule[1], '.');
      const diffWorkScheduleMorningAndEvening = utils.differenceBetweenHours(ruleTwoOfWorkSchedule[0], ruleTwoOfWorkSchedule[1], '.');
      const diffWorkScheduleEveningAndNight = utils.differenceBetweenHours(ruleThreeOfWorkSchedule[0], timechain[1], '.');

      employeesalary =
        (diffWorkScheduleNightAndMorning * BONUS_NIGHT_AND_MORNING) +
        (diffWorkScheduleMorningAndEvening * BONUS_MORNING_AND_EVENING) +
        (diffWorkScheduleEveningAndNight * BONUS_EVENING_AND_NIGHT);
    }
  }

  return employeesalary;
}

module.exports = {
  calculatorSchedulsWorking,
  calculationOfHoursWorked,
  rulesToCalculateTheSalary
};
