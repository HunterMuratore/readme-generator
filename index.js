const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
let userAnswers = {};
const resourceLinks = [];
const contributors = [];
const photos = [];
const installationSteps = [];
let deployedProject = '';

const questions = [
    {
        name: 'fileName',
        message: 'Enter the name of the file you want to create (required):',
        validate: validateMD
    },
    {
        name: 'title',
        message: 'Enter your project title (required):',
        validate: validateInput
    },
    {
        name: 'description',
        message: 'Enter your project description (required):',
        validate: validateInput
    },
    {
        name: 'usage',
        message: 'Enter the instructions for use of your project (required):',
        validate: validateInput
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose the license:',
        choices: ['MIT', 'ISC', 'EPL_1.0', 'Apache_2.0', 'Boost_1.0', 'BSD_3--Clause', 'GPLv3', 'IPL_1.0', 'MPL_2.0', 'ODbL', 'No License']
    },
    {
        name: 'tests',
        message: 'Give exmaples of how to run the tests for your project (Leave EMPTY if none):'
    },
    {
        name: 'questionsGit',
        message: 'Enter your GitHub username for the questions section:'
    },
    {
        name: 'questionsEmail',
        message: 'Enter your email for the questions section:'
    }
];

function init() {
    inquirer
        .prompt(questions).then((answers) => {
            userAnswers = answers;
            showChoiceMenu();
        });
}

function writeToFile(fileName, data) {
    fs.writeFile(`./${fileName}`, data, (err) => {
        if (err) throw err;
    
        console.log('File created successfully!');
    });
}

function validateMD(input) {
    if (input.split('.')[1] === 'md') {
        return true;
    }
    
    return 'File name must end in .md - try again';
}

function validateInput(input) {
    if (input.trim() === '') {
        return 'Entry cannot be empty - try again';
    }

    return true;
}

function addPhotos() {
    inquirer.prompt([
        {
            name: 'photoLink',
            message: 'Enter the full link for your photo (This will be displayed in the usage section):'
        },
        {
            name: 'photoAlt',
            message: 'Enter the alt text for your photo:'
        }
    ]).then(answer => {
        photos.push({link: answer.photoLink, alt: answer.photoAlt});
        showChoiceMenu();
    });
}

function addResourceLink() {
    inquirer.prompt({
        name: 'link',
        message: 'Enter your resource link:'
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

function addDeployedProject() {
    inquirer.prompt({
        name: 'deployed',
        message: 'Enter the link to the deployed project:'
    }).then(answer => {
        deployedProject = answer.deployed;
        showChoiceMenu();
    });
}

function addInstallationSteps() {
    inquirer.prompt({
        name: 'step',
        message: 'Enter an installation step (or type "stop" to finish adding steps):',
    }).then(answer => {
        const step = answer.step;
        if (step.toLowerCase() === 'stop') {
            showChoiceMenu();
        } else {
            installationSteps.push(step);
            addInstallationSteps();
        }
    });
}

function showChoiceMenu() {
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        choices: ['Add an image or video', 'Add a contributor', 'Add a resource', 'Add installation steps', 'Add a deployed project link', 'Finish'],
        message: 'Please select an option'
    }).then(answer => {
        if (answer.choice === 'Add a resource') {
            return addResourceLink();
        } else if (answer.choice === 'Add a contributor') {
            return addContributor();
        } else if (answer.choice === 'Add an image or video') {
            return addPhotos();
        } else if (answer.choice === 'Add a deployed project link') {
            return addDeployedProject();
        } else if (answer.choice === 'Add installation steps') {
            return addInstallationSteps();
        }

        writeToFile(userAnswers.fileName, generateMarkdown(userAnswers, resourceLinks, contributors, photos, installationSteps, deployedProject));
    });
}

init();
