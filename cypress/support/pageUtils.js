// (C) 2020 GoodData Corporation

import { simplifyText } from '@gooddata/util/dist/stringUtils';

export const expandWorkspaceActions = (workspaceTitle) => {
    cy.get(`.s-workspace-${simplifyText(workspaceTitle)} .s-workspace-actions-button`).click();
}

export const clickOnManageUsersAction = () => {
    cy.get(".s-manage-workspace-users-button").click();
}

export const expectManageUsersActionToBeDisabled = () => {
    cy.get(".s-manage-workspace-users-button.is-disabled").should("exist");
}

export const clickOnDeleteAction = () => {
    cy.get(".s-workspace-actions-dropdown").get(".s-delete-workspace-button.is-disabled").should("not.exist").then(() => {
        cy.get(".s-delete-workspace-button").click()
    })
}

export const expectDeleteActionToBeDisabled = () => {
    cy.get(".s-delete-workspace-button.is-disabled").should("exist");
}

export const clickOnLeaveAction = () => {
    cy.get(".s-leave-workspace-button").click();
}

export const clickOnWorkspaceTitle = (workspace_id) => {
    cy.get(`.s-workspace-${workspace_id} .s-workspace-title`).first().click();
}

export const clickOnWorkspaceOpenButton = (workspace_id) => {
    cy.get(`.s-workspace-${workspace_id} .s-workspace-open-button`).first().click();
}

export const confirmAction = () => {
    cy.get(".s-confirm-dialog-button").click();
}

export const expectConfirmDialogNotToBeShown = () => {
    cy.get(".s-confirm-dialog").should("not.exist");
}

export const closeAction = () => {
    cy.get(".s-dialog-close-button").click();
}

export const cancelAction = () => {
    cy.get(".s-cancel-dialog-button").click();
}

export const expectActionConfirmDialogClosed = () => {
    cy.get(".s-loading").should("not.exist");
    expectConfirmDialogNotToBeShown();
    cy.get(".s-workspace-actions-dropdown").should("not.exist");
}

export const expectSuccessMessage = () => {
    cy.get(".s-message.success").should("exist");
}

export const expectErrorMessage = () => {
    cy.get(".s-message.error").should("exist");
}

export const clickOnCreateWorkspaceButton = () => {
    cy.get(".s-create-workspace-button").click();
}

export const expectCreateWorkspaceButton = (expectedEnabledButton) => {
    const condition = expectedEnabledButton ? "not.have.class" : "have.class";
    cy.get(".s-create-workspace-button").should(condition, 'disabled');
}

export const clickOnCreateButton = () => {
    cy.get(".s-create-button").click();
}

export const clickOnMessageLink = () => {
    cy.get(".s-message-text-header-value a").click();
}

export const setWorkspaceNameInput = (text) => {
    cy.get(".s-workspace-creation-dialog-input").type(text);
}

//expect workspace dialog has state: exist or not.exist
export const expectWorkspaceCreationDialogState = (state) => { 
    cy.get(".s-workspace-creation-dialog").should(state);
}

// expect create button should have element
export const expectCreateButton = (chainer, value) => {
    cy.get(".s-create-button").should(chainer, value);
}

export const expectDialogSpinnerExists = () => {
    cy.get(".s-workspace-creation-dialog-spinner").should("exist");
}

export const expectWorkspaceExistOnHomePage = (workspaceName) => {
    cy.get(".s-workspace .s-workspace-title").should("contain", workspaceName);
}

export const expectWorkspaceNotExistOnHomePage = (workspaceName) => {
    cy.get(".s-workspace .s-workspace-title").contains(workspaceName).should("not.exist");
}

export const waitForIndigoAnalyzeLoad = () => {
    cy.get('.main-loading').should("exist").then(() => {
        cy.get('.main-loading').should("not.exist");
    })
}

export const waitForCatalogItemsLoad = () => {
    cy.get('.adi-catalog-loading-group').should("exist").then(() => {
        cy.get('.adi-catalog-loading-group', {timeout: 5000}).should("not.exist");
    })
}

export const openInsight = (insightName) => {
    cy.get('.s-report_select .s-open').click()
      .get('.s-open-visualizations .s-isLoading').should("exist").then(() => {
        cy.get('.s-open-visualizations .s-isLoading').should("not.exist");
    })
    .get(`.gd-visualizations-list-item.s-${simplifyText(insightName)}`).click();
}

export const waitForInsightLoaded = () => {
    cy.get('.adi-editor .editor-loading').should("exist").then(() => {
        cy.get('.editor-loading').should("not.exist")
          .get('.adi-computing').should('not.exist')
          .wait(1000)
    })
}
