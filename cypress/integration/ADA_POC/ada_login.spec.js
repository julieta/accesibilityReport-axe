describe('User Logged in - Customer Dashboard ADA Testing.', () => {
    it('The user dashboard should not have accesibility issues.', () => {
        // Since the code lines for login will be used multiple times it makes sene to have it
        // as a Cypress custom command.
        cy.HCTestLogin('customer1')
        cy.testAccessibility('/HBEWeb/DisplayAccountHomeTab')
        
    });

    it('The Account Worker Dashboard should not have any accesibility issues.', () => {
        cy.HCTestLogin('A-00CSRworker_e1')
        // finally we run the ADA test command and we send it the URL of the dashboard for example for it to test
        cy.testAccessibility('/HBEWeb/DisplayAdminDashboard')
        
    });
});