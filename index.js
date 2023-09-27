const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = [
    'Enter the name of the file you want to create (required):', 
    'Enter your project title (required):', 
    'Enter your project description (required):', 
    'Enter the installation steps for your project (required):',
    'Enter the instructions and examples for use of your project (required):',
    'Please choose the license:',
    'List your collaborators and any links to resources (Leave EMPTY if none):', // Make this a dropdown where they can choose if they have links so that they can be formatted
    'Give exmaples of how to run the tests for your project (Leave EMPTY if none):',
    'Enter frequently asked questions and answers about your project (Leave EMPTY if none):'
];

function writeToFile(fileName, data) {
    fs.writeFile(`./${fileName}`, data, (err) => {
        if (err) throw err;
    
        console.log('File created successfully!');
    });
}

function init() {
    inquirer
        .prompt([
            {
                name: 'fileName',
                message: questions[0]
            },
            {
                name: 'title',
                message: questions[1]
            },
            {
                name: 'description',
                message: questions[2]
            },
            {
                name: 'installation',
                message: questions[3]
            },
            {
                name: 'usage',
                message: questions[4]
            },
            {
                type: 'list',
                name: 'license',
                message: questions[5],
                choices: ['MIT', 'ISC', 'EPL_1.0', 'Apache_2.0', 'Boost_1.0', 'BSD_3--Clause', 'GPLv3', 'IPL_1.0', 'MPL_2.0', 'ODbL', 'No License']
            },
            {
                name: 'contributing',
                message: questions[6]
            },
            {
                name: 'tests',
                message: questions[7]
            },
            {
                name: 'questions',
                message: questions[8]
            },
        ])
        .then((answers) => {
            writeToFile(answers.fileName, generateMarkdown(answers));
        });
}

init();
