describe('Dynamic Table Test', () => {

    before(() => {
        cy.fixture('testData').as('testData');
    });

    it('Should insert data and validate table', function() {

        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');

        cy.get('#jsondata').click({ force: true });

        cy.get('#jsondata').clear({ force: true }).then($textarea => {
            const testDataString = JSON.stringify(this.testData);
            cy.wrap($textarea).type(testDataString, { parseSpecialCharSequences: false, force: true });
        });

        cy.get('#refreshtable').click({ force: true });

        cy.get('table#dynamictable').should('be.visible');

        cy.get('table#dynamictable tbody tr', { timeout: 30000 })
            .should('exist')
            .should('have.length', this.testData.length);

        cy.get('table#dynamictable tbody tr').each((row, index) => {
            cy.wrap(row).within(() => {
                cy.get('td').eq(0).should('have.text', this.testData[index].name);
                cy.get('td').eq(1).should('have.text', this.testData[index].age.toString());
                cy.get('td').eq(2).should('have.text', this.testData[index].gender);
            });
        });
    });
});
