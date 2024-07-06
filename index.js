const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

const questions = [
  {
    type: 'input',
    name: 'tex',
    message: 'Enter the text for your logo (up to 3 characters):',
    validate: input => input.length <= 3 || 'Text must be 3 characters or less.',
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the color for your shape:',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for your logo:',
    choices: ['Triangle', 'Circle', 'Square'],
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the color for your text:',
  },
];

inquirer.prompt(questions).then(answers => {
  let shape;
  switch (answers.shape) {
    case 'Triangle':
      shape = new Triangle(answers.shapeColor);
      break;
    case 'Circle':
      shape = new Circle(answers.shapeColor);
      break;
    case 'Square':
      shape = new Square(answers.shapeColor);
      break;
  }

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
    </svg>
  `;

  fs.writeFileSync('examples/logo.svg', svgContent.trim());
  console.log('Generated logo.svg');
});

