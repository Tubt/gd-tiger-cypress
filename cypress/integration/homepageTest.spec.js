// (C) 2020 GoodData Corporation

import { 
    expandWorkspaceActions,
    clickOnDeleteAction,
    confirmAction,
    expectActionConfirmDialogClosed,
    clickOnCreateWorkspaceButton,
    setWorkspaceNameInput,
    clickOnCreateButton,
    expectWorkspaceCreationDialogState,
    expectWorkspaceExistOnHomePage,
    expectWorkspaceNotExistOnHomePage,
    waitForIndigoAnalyzeLoad,
    openInsight,
    waitForInsightLoaded
} from "./../support/pageUtils.js";

const username= Cypress.env('username');
const password= Cypress.env('password');
const workspaceId = Cypress.env('workspaceId');

describe("Basic", () => {
    // ---------------------Disable it when you want to one time login
    before(() => {
        cy.login(username, password);
    });

    beforeEach (() => {
        Cypress.Cookies.preserveOnce('SPRING_SEC_OAUTH2_AUTHZ_CLIENT', 'SPRING_SEC_SECURITY_CONTEXT')
    }); //-------------------
    
    it("Create workspace from Homepage", () => {
        const now = new Date().getTime()
        const workspaceName = "WS "+ now;
        cy.visit("/");
        clickOnCreateWorkspaceButton();
        setWorkspaceNameInput(workspaceName);
        clickOnCreateButton();
        expectWorkspaceCreationDialogState("not.exist");
        expectWorkspaceExistOnHomePage(workspaceName);
        cy.screenshot(`Workspace-${workspaceName}-created`);

        expandWorkspaceActions(workspaceName);
        clickOnDeleteAction();
        confirmAction();
        expectActionConfirmDialogClosed();
        expectWorkspaceNotExistOnHomePage(workspaceName)
        cy.screenshot(`Workspace-${workspaceName}-deleted`);
    });

    it("Check workspace loaded", () => {
        cy.visit(`/analyze/#/${workspaceId}/reportId/edit`);
        waitForIndigoAnalyzeLoad();
        openInsight("Insight1");
        waitForInsightLoaded();
        cy.screenshot('open-insight1')

        openInsight("Insight2");
        waitForInsightLoaded();
        cy.screenshot('open-insight2')
    });
});
