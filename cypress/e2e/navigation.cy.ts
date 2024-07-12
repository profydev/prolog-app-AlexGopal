describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("links are working", () => {
      // check that each link leads to the correct page
      cy.get("nav")
        .contains("Projects")
        .should("have.attr", "href", "/dashboard");

      cy.get("nav")
        .contains("Issues")
        .should("have.attr", "href", "/dashboard/issues");

      cy.get("nav")
        .contains("Alerts")
        .should("have.attr", "href", "/dashboard/alerts");

      cy.get("nav")
        .contains("Users")
        .should("have.attr", "href", "/dashboard/users");

      cy.get("nav")
        .contains("Settings")
        .should("have.attr", "href", "/dashboard/settings");
    });

    it("is collapsible", () => {
      // collapse navigation
      cy.get("nav").contains("Collapse").click();

      // check that links still exist and are functionable
      cy.get("nav").find("a").should("have.length", 6).eq(1).click();
      cy.url().should("eq", "http://localhost:3000/dashboard/issues");

      // check that text is not rendered
      cy.get("nav").contains("Issues").should("not.exist");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    function isInViewport(el: string) {
      cy.get(el).then(($el) => {
        // navigation should cover the whole screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.right).to.be.equal(rect.width);
        expect(rect.left).to.be.equal(0);
      });
    }

    function isNotInViewport(el: string) {
      cy.get(el).then(($el) => {
        // naviation should be outside of the screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.left).to.be.equal(-rect.width);
        expect(rect.right).to.be.equal(0);
      });
    }

    it("toggles sidebar navigation by clicking the menu icon", () => {
      // wait for animation to finish
      cy.wait(500);
      isNotInViewport("nav");

      // open mobile navigation
      cy.get("img[alt='open menu']").click();

      // wait for animation to finish
      cy.wait(500);
      isInViewport("nav");

      // check that all links are rendered
      cy.get("nav").find("a").should("have.length", 6);

      // Support button should be rendered but Collapse button not
      cy.get("nav").contains("Support").should("exist");
      cy.get("nav").contains("Collapse").should("not.be.visible");

      // close mobile navigation and check that it disappears
      cy.get("img[alt='close menu']").click();
      cy.wait(500);
      isNotInViewport("nav");
    });

    // it("support button works and opens email", () => {
    //   // Stub window.location.href
    //   cy.window().then((win) => {
    //     cy.stub(win, "location").as("windowLocation");
    //   });

    //   // Click the Support button
    //   cy.get("nav").contains("Support").click();

    //   // Verify the mailto link
    //   const email = "support@prolog-app.com";
    //   const subject = "Support Request";
    //   const body = "Please Describe your issue";
    //   const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    //   cy.get("@windowLocation").should("have.property", "href", mailtoLink);
    // });

    // this test uses the error_screenshot2 and it fails because the test timesout since it cant tell that the new window is opened
    // google says its a limitation of cypress so need to find another way to do the test

    //     it('has correct mail to link on the support button', () => {
    //       const email = "support@prolog-app.com";
    //       const subject = "Support Request";
    //       const body = "Please Describe your issue";
    //       const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    //       cy.get('button').contains('Support')
    //           .should("have.property", "href", mailtoLink)
    //           // yields the value of the "href" attribute
    //           .should('match', /^mailto:/)
    //           // parse the URL into recipient, subject, body fields
    //           .should('deep.equal', {
    //               recipient: "support@prolog-app.com",
    //               subject: "Support Request",
    //               body: "Please Describe your issue",
    //           })
    //      });

    // //   // this test uses the error_screenshot and it fails because the button has no property href
  });
});

// can just scroll up

// // eslint-disable-next-line @typescript-eslint/no-empty-function
// describe("Sidebar Navigation", () => {
//   beforeEach(() => {
//     cy.viewport(1025, 900);
//     cy.visit("http://localhost:3000/dashboard");
//   });
//   it("links are working", () => {
//     cy.get("nav").contains("Issues").click();
//     cy.url().should("eq", "http://localhost:3000/dashboard/issues");
//     cy.get("nav").contains("Projects").click();
//     cy.url().should("eq", "http://localhost:3000/dashboard");
//   });

//   it("is collapsible", () => {
//     // collapse navigation
//     cy.get("nav").contains("Collapse").click();
//     // check that links still exist
//     cy.get("nav").find("a").should("have.length", 5).eq(1).click();
//     cy.url().should("eq", "http://localhost:3000/dashboard/issues");
//     cy.get("nav").contains("Issues").should("not.exist");
//   });

//   it("support button works and opens email", () => {
//     // Stub window.location.href
//     cy.window().then((win) => {
//       cy.stub(win, "location").as("windowLocation");
//     });

//     // Click the Support button
//     cy.get("nav").contains("Support").click();

//     // Verify the mailto link
//     const email = "support@prolog-app.com";
//     const subject = "Support Request";
//     const body = "Please Describe your issue";
//     const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

//     cy.get("@windowLocation").should("have.property", "href", mailtoLink);
//   });

//   // this test uses the error_screenshot2 and it fails because the test timesout since it cant tell that the new window is opened
//   // google says its a limitation of cypress so need to find another way to do the test

//   // it('has correct mailto link on the support button', () => {
//   //     // Spy on window.location.href
//   //     cy.window().then((win) => {
//   //       cy.spy(win, 'assign').as('windowAssign');
//   //     });

//   //     // Click on the support button
//   //     cy.get('button').contains('Support').click();

//   //     // Check if the correct mailto: URL was called
//   //     cy.get('@windowAssign').should('be.calledWith', 'mailto:support@prolog-app.com?subject=Support%20Request&body=Please%20Describe%20your%20issue');
//   //   });

//   // ignore this one

//   //   it('has correct mailto link on the support button', () => {
//   //     const email = "support@prolog-app.com";
//   //     const subject = "Support Request";
//   //     const body = "Please Describe your issue";
//   //     const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   //     cy.get('button').contains('Support')
//   //         .should("have.property", "href", mailtoLink)
//   //         // yields the value of the "href" attribute
//   //         .should('match', /^mailto:/)
//   //         // parse the URL into recipient, subject, body fields
//   //         .should('deep.equal', {
//   //             recipient: "support@prolog-app.com",
//   //             subject: "Support Request",
//   //             body: "Please Describe your issue",
//   //         })
//   //   });

//   // this test uses the error_screenshot and it fails because the button has no property href
// });
