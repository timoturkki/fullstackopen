import { USER_LOCAL_STORAGE_KEY } from '../../src/utils/user';

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body));

      cy.visit('http://localhost:3000');
    });
});

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)).token}`,
    },
  });

  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', 'http://localhost:3001/api/users/', user).then(() => {
    cy.visit('http://localhost:3000');
  });
});