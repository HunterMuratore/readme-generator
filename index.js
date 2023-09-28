const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
let userAnswers = {};
const resourceLinks = [];
const contributors = [];

const questions = [
    'Enter the name of the file you want to create (required):', 
    'Enter your project title (required):', 
    'Enter your project description (required):', 
    'Enter the installation steps for your project (required):',
    'Enter the instructions and examples for use of your project (required):',
    'Please choose the license:',
    'Enter your resource link:',
    'Give exmaples of how to run the tests for your project (Leave EMPTY if none):',
    'Enter your GitHub username for the questions section:',
    'Enter your email for the questions section:'
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
                name: 'tests',
                message: questions[7]
            },
            {
                name: 'questionsGit',
                message: questions[8]
            },
            {
                name: 'questionsEmail',
                message: questions[9]
            }
        ]).then((answers) => {
            userAnswers = answers;
            showChoiceMenu();
        });
}

function addResourceLink() {
    inquirer.prompt({
        name: 'link',
        message: questions[6]
    }).then(answer => {
        resourceLinks.push(answer.link);
        showChoiceMenu();
    });
}

function addContributor() {
    inquirer.prompt({
        name: 'contributor',
        message: 'Enter the name of the contributor:'
    }).then(answer => {
        contributors.push(answer.contributor);
        showChoiceMenu();
    });
}

function showChoiceMenu() {
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        choices: ['Add a contributor', 'Add a resource', 'Finish'],
        message: 'Please select an option'
    }).then(answer => {
        if (answer.choice === 'Add a resource') {
            return addResourceLink();
        } else if (answer.choice === 'Add a contributor') {
            return addContributor();
        }

        writeToFile(userAnswers.fileName, generateMarkdown(userAnswers, resourceLinks, contributors));
    });
}

init();
