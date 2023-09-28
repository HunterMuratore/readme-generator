function renderLicenseBadge(license) {
  switch(license) {
    case 'MIT':
      return 'yellow';
    case 'ISC':
      return 'blue';
    case 'EPL_1.0':
      return 'red';
    case 'Apache_2.0':
      return 'blue';
    case 'Boost_1.0':
      return 'lightblue';
    case 'BSD_3--Clause':
      return 'blue';
    case 'GPLv3':
      return 'blue';
    case 'IPL_1.0':
      return 'blue';
    case 'MPL_2.0':
      return 'brightgreen';
    case 'ODbL':
      return 'brightgreen';
  }

  return '';
}

function renderLicenseLink(license) {
  switch(license) {
    case 'MIT':
      return license;
    case 'ISC':
      return license;
    case 'EPL_1.0':
      return license;
    case 'Apache_2.0':
      return license;
    case 'Boost_1.0':
      return license;
    case 'BSD_3--Clause':
      return license;
    case 'GPLv3':
      return license;
    case 'IPL_1.0':
      return license;
    case 'MPL_2.0':
      return license;
    case 'ODbL':
      return license;
  }

  return '';
}

function renderLicenseSection(license) {
  const licenseLink = renderLicenseLink(license);
  const licenseBadge = renderLicenseBadge(license);

 if (licenseLink && licenseBadge) {
    return `![License: ${licenseLink}](https://img.shields.io/badge/License-${licenseLink}-${licenseBadge}.svg)`;
  }

  return '';
}

function generateResourceLinks(resourceArr) {
  let html = ``;

  if(resourceArr.length > 0) {
    html = `
Resources:
`;
  }

  resourceArr.forEach(resource => {
    html += `
- [${resource}](${resource})
`;
  });

  return html;
}

function generateContributorList(contributorArr) {
  let html = ``;

  if(contributorArr.length > 0) {
    html = `
Contributors:
`;
  }
  
    contributorArr.forEach(contributor => {
      html += `
- ${contributor}
`;
    });
  
    return html;
}

function generatePhotos(photoArr) {
  let html = ``;
  
    photoArr.forEach(photo => {
      html += `
![${photo.alt}](${photo.link})
`;
    });
  
    return html;
}

function generateInstallationSteps(installationStepsArr) {
  let html = ``;
  let count = 0;
  
    installationStepsArr.forEach(step => {
      count++;
      html += `
${count}. ${step}
`;
    });
  
    return html;
}

function generateMarkdown(data, resources, contributors, photos, installationSteps, deployedProject) {
  return `# ${data.title}

## Description

${data.description}

${renderLicenseSection(data.license)}

## Table of Contents

- [Description](#description)${installationSteps.length ? `
- [Installation](#installation)` : ''}
- [Usage](#usage)
- [License](#license)
${resources.length || contributors.length ? `- [Contributing](#contributing)
` : ''}${data.tests ? `- [Tests](#tests)
` : ''}${data.questionsGit || data.questionsEmail ? `- [Questions](#questions)
` : ''}${installationSteps.length ? `
## Installation` : ''}
${generateInstallationSteps(installationSteps)}
## Usage

${data.usage}
${deployedProject ? `
Click [here](${deployedProject}) to get to the deployed project` : ''}
${generatePhotos(photos)}
## License

This project is under the license of ${data.license}.${resources.length || contributors.length ? `

## Contributing` + `
${generateContributorList(contributors)}` + `${generateResourceLinks(resources)}` : ''}${data.tests ? `
## Tests

` + data.tests 
: ''}${data.questionsGit || data.questionsEmail ? `

## Questions

` + `${data.questionsGit ? `GitHub account: [https://github.com/${data.questionsGit}](https://github.com/${data.questionsGit})
` : ''}${data.questionsEmail ? `
Reach me through email here to ask any questions about the app!

>Email: [${data.questionsEmail}](mailto:${data.questionsEmail})` : ''}` : ''}` + '\n';
}

module.exports = generateMarkdown;
