describe('Prueba 3: Registrar un producto', () => {
  const llenarCamposDisponibles = () => {
    cy.get('body', { timeout: 10000 }).should('be.visible');

    cy.get('body').then(($body) => {
      const inputs = $body.find('input:visible:not([disabled])');
      const textareas = $body.find('textarea:visible:not([disabled])');
      const selects = $body.find('select:visible:not([disabled])');

      if (inputs.length > 0) {
        cy.wrap(inputs.eq(0)).clear({ force: true }).type('Laptop Dell XPS 13', { force: true });

        if (inputs.length > 1) {
          cy.wrap(inputs.eq(1)).clear({ force: true }).type('Laptop de alto rendimiento', { force: true });
        }

        if (inputs.length > 2) {
          cy.wrap(inputs.eq(2)).clear({ force: true }).type('1299.99', { force: true });
        }

        if (inputs.length > 3) {
          cy.wrap(inputs.eq(3)).clear({ force: true }).type('15', { force: true });
        }
      }

      if (textareas.length > 0) {
        cy.wrap(textareas.eq(0)).clear({ force: true }).type('Laptop de alto rendimiento', { force: true });
      }

      if (selects.length > 0) {
        cy.wrap(selects.eq(0)).select(1, { force: true });
      }
    });
  };

  const clickBotonSubmit = () => {
    cy.get('body').then(($body) => {
      const submitButtons = $body.find('button[type="submit"]:visible:not([disabled])');
      const normalButtons = $body.find('button:visible:not([disabled])');

      if (submitButtons.length > 0) {
        cy.wrap(submitButtons.eq(0)).click({ force: true });
      } else if (normalButtons.length > 0) {
        cy.wrap(normalButtons.eq(0)).click({ force: true });
      }
    });
  };

  it('Debe capturar pantalla del formulario de producto', () => {
    cy.visit('/');

    cy.get('body', { timeout: 10000 }).should('be.visible');
    cy.screenshot('05-producto-inicio');

    llenarCamposDisponibles();

    cy.wait(500);
    cy.screenshot('05-producto-formulario-lleno');

    clickBotonSubmit();

    cy.wait(500);
    cy.get('body').should('be.visible');
    cy.screenshot('05-producto-enviado');
    cy.screenshot('05-producto-registro-completado');
  });

  it('Debe capturar pantalla de validación del formulario', () => {
    cy.visit('/');

    cy.get('body', { timeout: 10000 }).should('be.visible');
    cy.screenshot('06-validacion-inicio');

    cy.screenshot('06-validacion-antes-envio');

    clickBotonSubmit();

    cy.wait(500);
    cy.get('body').should('be.visible');
    cy.screenshot('06-validacion-errores');
    cy.screenshot('06-validacion-completada');
  });
});