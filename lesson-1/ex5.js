/**
a.

Rewrite the code below to use array destructuring instead of assigning each value to a variable.
*/
{
  console.log("EXERCISE a");

  let item = ["Egg", 0.25, 12];

  let name = item[0];
  let price = item[1];
  let quantity = item[2];

  console.log(`Item: ${name}, Quantity: ${quantity}, Price: ${price}`); // expect: Item: egg, Quantity: 0.25, Price: 12
  console.log();
}

/**
b

Using Spread & Rest Operator to concat 2 array
*/
{
  console.log("EXERCISE b");

  let arr1 = [3, 5, 4, 2, 6, 1];
  let arr2 = [3, 5, 4, 2, 6, 1];

  // Write your code here
  let arr = [];
  console.log(arr); // expect: [3, 5, 4, 2, 6, 1, 3, 5, 4, 2, 6, 1]
  console.log();
}

/**
c.

We have an object called 'user'.

Write the destructuring assignment that reads:

- 'name' property into the variable 'name'.
- 'years' property into the variable 'age'.
- 'isAdmin' property into the variable 'isAdmin' (false, if no such property)
*/
{
  console.log("EXERCISE c");

  let user = { name: "John", years: 30 };

  // your code to the left side:
  let {} = user;

  console.log(name); // John
  console.log(age); // 30
  console.log(isAdmin); // false
  console.log();
}

/**
d.

Rewrite the code below to use array destructuring instead of assigning each value to a variable.
*/
{
  console.log("EXERCISE d");

  let person = [12, "Chris", "Owen"];

  let firstName = person[1];
  let lastName = person[2];
  let age = person[0];

  console.log(`Person - Age: ${age}, Name: ${firstName} ${lastName}`); // expect: Person - Age: 12, Name: Chris Owen
  console.log();
}

/** 
e.

Rewrite the code below to use array destructuring instead of assigning each value to a variable.
Make sure not to have unused variables.

*/
{
  console.log("EXERCISE e");

  let person = ["Chris", 12, "Owen"];

  let firstName = person[0];
  let lastName = person[2];

  console.log(`Name: ${firstName} ${lastName}`); // expect: Name: Chris Owen
  console.log();
}

/** 
f.

Using Array Destructuring get the last name from the array. 

*/
{
  console.log("EXERCISE f");

  const students = ["Christina", "Jon", "Alexandare"];

  // Write your code here
  const [] = students;

  console.log(lastName); // expect: Alexandare
  console.log();
}

/**
g.

Using Array Destructuring get all of the names from this Nested Array

Hint: https://untangled.io/in-depth-es6-destructuring-with-assembled-avengers
*/
{
  console.log("EXERCISE g");

  const moreStudents = ["Chris", ["Ahmad", "Antigoni"], ["Toby", "Sam"]];

  // Write your code here
  const [] = moreStudents;

  console.log(student1, student2, student3, student4, student5); // expect: "Chris", "Ahmad", "Antigoni", "Toby", "Sam"
  console.log();
}
