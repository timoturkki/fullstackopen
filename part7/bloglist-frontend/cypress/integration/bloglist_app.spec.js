

describe('Bloglist', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.createUser({ name: 'Gulliver Foyle', username: 'fourmyle', password: 'mystery' });
  });

  it('should allow front page to be opened', async function() {
    cy.contains('Welcome to browse some blogs!');
  });

  it('should show login form', async function() {
    cy.get('#login-form').should('be.visible');
  });

  describe('Login',function() {
    it('should succeed with correct credentials', function() {
      cy.get('#username').type('fourmyle');
      cy.get('#password').type('mystery');
      cy.get('#login-button').click();

      cy.contains('You are logged in as Gulliver Foyle');
    });

    it('should fail with wrong credentials', function() {
      cy.get('#username').type('fourmyle');
      cy.get('#password').type('invalid');
      cy.get('#login-button').click();
      cy.get('.notification.error')
        .should('contain', 'Wrong credentials, please try again')
        .and('have.css', 'background-color', 'rgb(247, 231, 231)');

      cy.get('html').should('not.contain', 'You are logged in as Gulliver Foyle');
    });
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'fourmyle', password: 'mystery' });
    });

    it('should allow user to create a blog', function() {
      cy.contains('Create blog').click();
      cy.get('#title').type('Millions for nonsense, but not one cent for entropy');
      cy.get('#author').type('Alfred');
      cy.get('#url').type('https://www.pyre.com');

      cy.get('#create-blog-btn').click();
      cy.get('.notification')
        .should('contain', 'A new blog "Millions for nonsense, but not one cent for entropy" by Alfred added');
    });

    describe('blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Fred', url: 'https://ok.com', likes: 5 });
        cy.createBlog({ title: 'second blog', author: 'Fred', url: 'https://ok.com', likes: 15 });
        cy.createBlog({ title: 'third blog', author: 'Fred', url: 'https://ok.com', likes: 2  });
      });

      it('should allow user to like a blog', function () {
        cy.contains('first blog').find('button').click();
        cy.contains('first blog').parent().should('contain', 'likes: 5');
        cy.get('[data-test-like-btn]').click();
        cy.contains('first blog').parent().should('contain', 'likes: 6');
      });

      it('should allow user to remove a blog', function () {
        cy.contains('first blog').find('button').click();
        cy.get('[data-test-remove-btn]').click();
        cy.get('html').should('not.contain', 'first blog');
      });

      it('should show correct amount of blogs sorted by like amount', function () {
        cy.get('.blog-item').then(($blogs) => {
          expect($blogs).to.have.lengthOf(3);

          [15, 5, 2].forEach((likeCount, i) => {
            cy.wrap($blogs[i]).find('button').click();
            cy.wrap($blogs[i]).should('contain', `likes: ${likeCount}`);
          });
        });
      });
    });
  });
});