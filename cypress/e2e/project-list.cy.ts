import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      const statusMap: { [key: string]: string } = {
        error: "critical",
        warning: "warning",
        info: "stable",
      };

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(
            capitalize(statusMap[mockProjects[index].status]),
          );
          //<Badge color={statusColors[statusMap[status]]}>{capitalize(statusMap[status])}
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    it("checks if the status and badge color are set correctly", () => {
      const statusMap: { [key: string]: string } = {
        error: "critical",
        warning: "warning",
        info: "stable",
      };

      const statusColors: { [key: string]: string } = {
        critical: "rgb(254, 243, 242)", // Error: #fef3f2 in RGB
        warning: "rgb(255, 250, 235)", // Warning: #fffaeb in RGB
        stable: "rgb(236, 253, 243)", // Info: #ecfdf3 in RGB
      };

      cy.get("main")
        .find("li")
        .find(".badge_container__FVLnl")
        .each(($el, index) => {
          const status = mockProjects[index].status;
          const expectedStatus = statusMap[status];
          const expectedColor = statusColors[expectedStatus];

          console.log("Status:", status);
          console.log("expectedStatus:", expectedStatus);
          console.log("expectedColor:", expectedColor);

          cy.wrap($el)
            .should("have.text", capitalize(expectedStatus))
            .and("have.css", "background-color", expectedColor);
        });
    });

    it("displays the loader while fetching projects", () => {
      // Intercept the API call and add a delay directly in the intercept options
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        delay: 2000, // 2-second delay to simulate loading
        fixture: "projects.json", // Use the mock projects from the fixture
      }).as("delayedGetProjects");

      // Visit the page
      cy.visit("http://localhost:3000/dashboard");

      // Check if the loader is visible while loading
      cy.get(".project-list_loaderwrapper__c7wmT").should("be.visible");

      // Wait for the delayed request to finish
      cy.wait("@delayedGetProjects");

      // Ensure the loader disappears after loading
      cy.get(".project-list_loaderwrapper__c7wmT").should("not.exist");
    });

    it("shows an error message", () => {
      // Intercept the API call and add a delay directly in the intercept options
      cy.intercept(
        { url: "https://prolog-api.profy.dev/project", times: 4 },
        { statusCode: 500 },
      );

      // Visit the page
      cy.visit("http://localhost:3000/dashboard");

      // Check that the error message is displayed
      cy.get(".MuiAlert-root", { timeout: 15000 })
        .should("be.visible")
        .find("button")
        .click();

      const languageNames = ["React", "Node.js", "Python"];
      const statusMap: { [key: string]: string } = {
        error: "critical",
        warning: "warning",
        info: "stable",
      };

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(
            capitalize(statusMap[mockProjects[index].status]),
          );
          //<Badge color={statusColors[statusMap[status]]}>{capitalize(statusMap[status])}
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    it("displays the loader while fetching projects", () => {
      // Intercept the API call and add a delay directly in the intercept options
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        delay: 2000, // 2-second delay to simulate loading
        fixture: "projects.json", // Use the mock projects from the fixture
      }).as("delayedGetProjects");

      // Visit the page
      cy.visit("http://localhost:3000/dashboard");

      // Check if the loader is visible while loading
      cy.get(".project-list_loaderwrapper__c7wmT").should("be.visible");

      // Wait for the delayed request to finish
      cy.wait("@delayedGetProjects");

      // Ensure the loader disappears after loading
      cy.get(".project-list_loaderwrapper__c7wmT").should("not.exist");
    });

    it("shows an error message", () => {
      // Intercept the API call and add a delay directly in the intercept options
      cy.intercept(
        { url: "https://prolog-api.profy.dev/project", times: 4 },
        { statusCode: 500 },
      );

      // Visit the page
      cy.visit("http://localhost:3000/dashboard");

      // Check that the error message is displayed
      cy.get(".MuiAlert-root", { timeout: 15000 }).should("be.visible");

      const languageNames = ["React", "Node.js", "Python"];
      const statusMap: { [key: string]: string } = {
        error: "critical",
        warning: "warning",
        info: "stable",
      };

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(
            capitalize(statusMap[mockProjects[index].status]),
          );
          //<Badge color={statusColors[statusMap[status]]}>{capitalize(statusMap[status])}
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});
