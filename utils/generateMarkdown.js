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
  let html = `
Resources:
`;

  resourceArr.forEach(resource => {
    html += `
  * [${resource}](${resource})
`;
  });

  return html;
}

function generateContributorList(contributorArr) {
  let html = `
  Contributors:
  `;
  
    contributorArr.forEach(contributor => {
      html += `
  * ${contributor}
`;
    });
  
    return html;
}

function generateMarkdown(data, resources, contributors) {
  return `# ${data.title}

## Description

${data.description}

${renderLicenseSection(data.license)}

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
${resources ? `- [Contributing](#contributing)
` : ''}${data.tests ? `- [Tests](#tests)
` : ''}${data.questionsGit || data.questionsEmail ? `- [Questions](#questions)
` : ''}
## Installation

${data.installation}

## Usage

${data.usage}

## License

This project is under the license of ${data.license}.${resources || contributors ? `

## Contributing

` + generateContributorList(contributors) + generateResourceLinks(resources): ''}${data.tests ? `

## Tests

` + data.tests : ''}${data.questionsGit || data.questionsEmail ? `

## Questions

` + `${data.questionsGit ? `GitHub account: [https://github.com/${data.questionsGit}](https://github.com/${data.questionsGit})
` : ''}${data.questionsEmail ? `
Email: [${data.questionsEmail}](mailto:${data.questionsEmail})` : ''}` : ''}
`.trim() + '\n';
}

module.exports = generateMarkdown;
