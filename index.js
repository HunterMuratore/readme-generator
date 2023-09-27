const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = [
    'Enter the name of the file you want to create:', 
    'Enter your project title:', 
    'Enter your project description:', 
    'Please choose the license:'
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
                type: 'list',
                name: 'license',
                message: questions[3],
                choices: ['MIT', 'ISC', 'EPL_1.0', 'Apache_2.0', 'Boost_1.0', 'BSD_3--Clause', 'GPLv3', 'IPL_1.0', 'MPL_2.0', 'ODbL', 'No License']
            }
        ])
        .then((answers) => {
            writeToFile(answers.fileName, generateMarkdown(answers));
        });
}

init();
