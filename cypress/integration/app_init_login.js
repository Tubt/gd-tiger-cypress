// (C) 2020 GoodData Corporation

const username= Cypress.env('username');
const password= Cypress.env('password');

describe("Login", () => {
    
    it("login with incorrect username, password", () => {
        cy.visit('/');
        cy.location("pathname").should("contain", "/dex/auth/local");
        cy.get(".login-page-block").should("exist");
        cy.get("#login").type("demo1@example.com");
        cy.get("#password").type(password);
        cy.get(".submit-button").click();
        cy.get(".login-error").should("exist").should("contain", "Invalid Email Address and password.");
        cy.screenshot()
    });

    it("login with correct username, password and check Home page", () => {
        cy.visit('/');
        cy.location("pathname").should("contain", "/dex/auth/local");
        cy.get(".login-page-block").should("exist");
        cy.get("#login").type(username);
        cy.get("#password").type(password);
        cy.get(".submit-button").click();
        cy.get(".gd-header-project").should("be.visible").should("contain","Default Organization");
        cy.get(".s-workspaces-section").should("exist").should("contain","Your workspaces");
        cy.get(".s-learn-panel-getting-started-link")
            .invoke('attr', 'href')
            .should("contain","/getting-started");
        cy.get(".s-learn-panel-apidocs-link")
            .invoke('attr', 'href')
            .should("contain","/api");
        cy.get(".s-learn-panel-documentation-link")
            .invoke('attr', 'href')
            .should("contain","https://gooddata.com/developers/cloud-native/doc/");
        cy.get(".s-learn-panel-slack-link")
            .invoke('attr', 'href')
            .should("eq","https://www.gooddata.com/slack/");
    }); 
});
