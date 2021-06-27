# cypress-tests
Getting started with writing front-end automation tests using Cypress.
Blog related to same is written here - https://www.opencodez.com/software-testing/front-end-automation-testing-cypress.htm

Start test:
1. Edit info in cypress.json
 - username
 - password
 - workspaceId
2. Run test:
run  `npx cypress run --browser chrome --env username=<username>,password=<password>`

run with viewport: `npx cypress run --browser chrome --env username=<username>,password=<password> --config viewportWidth=1200,viewportHeight=1200`

To turn on one time login, enable code below in `support/index.js`
```
Cypress.Cookies.defaults({
    whitelist: ['SPRING_SEC_OAUTH2_AUTHZ_CLIENT', 'SPRING_SEC_SECURITY_CONTEXT']
})
```

And disable `before()` and `beforeEach` on your tests (E.g: homepageTest.spec.js)

