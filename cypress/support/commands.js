// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const indicators = {
    critical: '🟥',
    serious:  '🟧',
    moderate: '🟨',
    minor:    '🟩'

}


function generateTable(){
  // TODO: create a function that returns an HTML table generated from the specific columns from
  // each violation found
}

function generateReport(violations){
 // TODO: implement a function that generates the HMLT report with the test results

}


// Manages the overall use of the log data to get the Accessibility violations
function logViolations(violations) {
    terminalLog(violations)
    violations.forEach(violation => {
        const nodes = Cypress.$(violation.nodes.map(node => node.target).join(','))
        let log = {
            name: `[${indicators[violation.impact]} ${violation.impact.toUpperCase()}]`,
            consoleProps: () => violation,
            $el: nodes,
            message: `[${violation.help}](${violation.helpUrl})`
        }
        Cypress.log(log)

        violation.nodes.forEach(({ target }) => {
            Cypress.log({
                name: '-🩸FIXME',
                consoleProps: () => violation,
                $el: Cypress.$(target.join(',')),
                message: target
            })
        })
    });
}

const terminalLog = (violations) => {
    cy.task('log', `\n${'TEST RESULTS'}
      \n${violations.length
        } accessibility violation${violations.length === 1 ? '' : 's'
        } ${violations.length === 1 ? 'was' : 'were'
        } detected\n`)

    cy.log('log', violations)
    generateReport(violations) // FIXME: need to review where it's best to call this function.
    const violationData = violations.map(({
        id,
        impact,
        description,
        nodes,
        help,
        helpUrl
    }) => ({
        QUANTITY: nodes.length,
        IMPACT: `${indicators[impact]} ${impact.toUpperCase()}`,
        RULE_ID: id,
        DESCRIPTION: help,
        // RESOURCES: `[LINK](${helpUrl})`
        // html: nodes[0].html,
        // summary: nodes[0].failureSummary
        // TODO: these columns are the ones we need for the dynamic table
    }))

    cy.task('table', violationData)
}


Cypress.Commands.add('testAccessibility', (path) => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y(null, {
        runOnly: {
            type: 'tag',
            values: [
                'wcag2a',
                'wcag2aa',
                'wcag21a',
                'wcag21aa',
                'best-practice',
                'ACT',
                'section508'
            ]
        }
    }, logViolations);
})
