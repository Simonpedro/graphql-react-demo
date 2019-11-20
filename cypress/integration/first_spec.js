describe('App test', () => {
  it('should be initially empty', () => {
    cy.visit('/');

    cy.get('input').should('be.empty');
    cy.get('[data-testid="movies-list"]').find('ul').should('be.empty');
  });

  it('should search and display information about a movie', () => {
    const movieTitle = 'Harry Potter and the Chamber of Secrets';

    cy.visit('/');

    cy.get('input').type('Harry');
    cy.contains(movieTitle).click();
    cy.get('[data-testid="movie-title"]').contains(movieTitle);
  });

  it('should add a movie to favourites', () => {
    const movieTitle = 'Harry Potter and the Chamber of Secrets';

    cy.visit('/');

    cy.get('input').type('Harry');
    cy.get('[data-testid="toggle-starred-button-672"]').click();
    cy.get('[data-testid="chip-672"]').contains(movieTitle);
    cy.get('[data-testid="toggle-starred-button-672"]').click();
  });
});