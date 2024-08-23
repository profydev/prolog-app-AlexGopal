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
  });
});
