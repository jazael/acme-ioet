## Exercise description
The company ACME offers their employees the flexibility to work the hours they want. They will pay for the hours worked based on the day of the week and time of day, according to the following table:

## Monday - Friday

  * 00:01 - 09:00 25 USD

  * 09:01 - 18:00 15 USD

  * 18:01 - 00:00 20 USD

## Saturday and Sunday

  * 00:01 - 09:00 30 USD

  * 09:01 - 18:00 20 USD

  * 18:01 - 00:00 25 USD

The goal of this exercise is to calculate the total that the company has to pay an employee, based on the hours they worked and the times during which they worked. The following abbreviations will be used for entering data:

* MO: Monday

* TU: Tuesday

* WE: Wednesday

* TH: Thursday

* FR: Friday

* SA: Saturday

* SU: Sunday

## Solution 

For the elaboration of the solution we used Node.js, which is a server-side JavaScript environment.

The following files were created.
readfile.js which performs the reading of the file returning an array of key and value object, the key represents the name of the employee and the value represents his day or work schedule.

In the file salarypayments.js there are 3 functions one of them is rulesToCalculateTheSalary, which receives as a parameter a string in the format '10: 00-12: 00 'which returns the value of the hourly wage that the employee will receive.
The second calculationOfHoursWorked function iterates the list of the employee's workday and returns as a result a list of the values ​​to be paid, which through reduction reduces the total salary to be received by the employee.
And finally we have a calculatorSchedulsWorking that returns a list of the calculated values ​​for each employee.

## Step prior to the execution of the project and the tests
Clone the repository and run `yarn install` for the download of the dependency used for the execution of the tests.

## Steps to execute the tests
For the elaboration of the tests, Jest is used. To run the tests use the following command: 
`yarn test`

![image](https://user-images.githubusercontent.com/11983683/146130690-feeac453-6402-4b0d-8017-a1f1ad17762d.png)

## Steps to execute the code
To execute the project use the following command:
`yarn start`

![image](https://user-images.githubusercontent.com/11983683/146130831-f6a1964b-1c78-47c7-8a1b-e2f23696adff.png)

