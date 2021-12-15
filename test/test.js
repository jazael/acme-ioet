const readFile = require('../src/readfile');
const salarypayments = require('../src/salarypayments');

describe('ReadFile utilities module', () => {
  test('readFile is a function', () => {
    expect(typeof readFile).toEqual('function');
  })
});

describe('Salarypayments utilities module', () => {

  test('calculatorSchedulsWorking is a function', () => {
    expect(typeof salarypayments.calculatorSchedulsWorking).toEqual('function');
  })

  test('calculationOfHoursWorked is a function', () => {
    expect(typeof salarypayments.calculationOfHoursWorked).toEqual('function');
  })

  test('returns salary of the calculationOfHoursWorked', () => {
    const scheduleMocks = [
      'MO10:00-12:00',
      'TU10:00-12:00',
      'TH01:00-03:00',
      'SA14:00-18:00',
      'SU20:00-21:00'
    ];

    expect(215).toBe(+salarypayments.calculationOfHoursWorked(scheduleMocks));
  })

  test('returns salary of the calculationOfHoursWorked', () => {
    const scheduleMocks = [
      'MO10:00-12:00',
      'TU10:00-11:00',
      'TH01:00-02:00',
      'SA14:00-17:00',
      'SU20:00-22:00'
    ];

    const calculationOfHoursWorked = 255.00;
    expect(calculationOfHoursWorked).not.toBe(salarypayments.calculationOfHoursWorked(scheduleMocks));
  })

  test('rulesToCalculateTheSalary is a function', () => {
    expect(typeof salarypayments.rulesToCalculateTheSalary).toEqual('function');
  })

  test('Returns the total amount of hours and minutes worked => rulesToCalculateTheSalary', () => {
    const scheduleMocks = ['10:00', '12:00'];
    const schedule_abbreviation = 'MO';

    const valuePerHours = 30;
    expect(valuePerHours).toBe(salarypayments.rulesToCalculateTheSalary(scheduleMocks, schedule_abbreviation));
  })

  test('Returns the total amount of hours and minutes worked => rulesToCalculateTheSalary', () => {
    const scheduleMocks = ['19:00', '20:00'];
    const schedule_abbreviation = 'SU';

    const valuePerHours = 25;
    expect(valuePerHours).toBe(salarypayments.rulesToCalculateTheSalary(scheduleMocks, schedule_abbreviation));
  })

  test('Returns the total amount of hours and minutes worked => rulesToCalculateTheSalary', () => {
    const scheduleMocks = ['01:00', '22:45'];
    const schedule_abbreviation = 'SU';

    const valuePerHours = 522.8000000000001;
    expect(valuePerHours).toBe(salarypayments.rulesToCalculateTheSalary(scheduleMocks, schedule_abbreviation));
  })

  test('Returns the total amount of hours and minutes worked => rulesToCalculateTheSalary', () => {
    const scheduleMocks = ['00:10', '21:00'];
    const schedule_abbreviation = 'SU';

    const valuePerHours = 491.55;
    expect(valuePerHours).toBe(salarypayments.rulesToCalculateTheSalary(scheduleMocks, schedule_abbreviation));
  })

});
