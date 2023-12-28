const link = "http://localhost:5173/";
describe('End to end tests', () => {
  it('Search for the word hi', () => {
    const word = "Hi";
    cy.visit(link);
    cy.get('[data-testid="header-component"]').should('exist');
    cy.get('[data-testid="footer-component"]').should('exist');

    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type(word);
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="loading"]').should('not.exist');
    cy.get('[data-testid="response"]').should('exist');

    cy.contains('Meanings').should('exist');
    cy.contains('#').should('exist');
    cy.contains('Type').should('exist');
    cy.contains('Definition').should('exist');

    cy.contains('1').should('exist');
    cy.contains('noun').should('exist');
    cy.contains('The word "hi" used as a greeting.').should('exist');

    cy.contains('2').should('exist');
    cy.contains('interjection').should('exist');
    cy.contains('A friendly, informal, casual greeting said when meeting someone.').should('exist');
  });
  
  it('Does not found any data', () => {
    const word = "hhhh";
    cy.visit(link);
    cy.get('[data-testid="header-component"]').should('exist');
    cy.get('[data-testid="footer-component"]').should('exist');

    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type(word);
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="loading"]').should('not.exist');
    cy.get('[data-testid="error"]').should('exist');
    cy.get('[data-testid="response"]').should('not.exist');
  });
  it('Do last search', () => {
    cy.visit(link);
    cy.get('[data-testid="last-search-button"]').click();

    cy.get('[data-testid="loading"]').should('not.exist');
    cy.get('[data-testid="response"]').should('exist');

    cy.contains('Meanings').should('exist');
    cy.contains('#').should('exist');
    cy.contains('Type').should('exist');
    cy.contains('Definition').should('exist');

    cy.contains('1').should('exist');
    cy.contains('noun').should('exist');
    cy.contains('The part of the day from dawn to noon.').should('exist');

    cy.contains('2').should('exist');
    cy.contains('interjection').should('exist');
    cy.contains('A greeting said in the morning; shortening of good morning').should('exist');
  });
  it('Click the delete button', () => {
    const word = "Night";
    cy.visit(link);
    cy.get('[data-testid="header-component"]').should('exist');
    cy.get('[data-testid="footer-component"]').should('exist');

    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type(word);
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="loading"]').should('not.exist');
    cy.get('[data-testid="btn3"]').click();
    cy.contains('interjection').should('not.exist');
  });
  it('Test sort by type', () => {
    const word = "Night";
    cy.visit(link);
    cy.get('[data-testid="header-component"]').should('exist');
    cy.get('[data-testid="footer-component"]').should('exist');

    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type(word);
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="loading"]').should('not.exist');
    cy.get('[data-testid="sort-button"]').click();
    cy.get('[data-testid="type1"]').invoke('text').then((text) => {
      cy.wrap(text).should('eq', 'interjection');
    });
  });
})