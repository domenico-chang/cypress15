describe('Prueba 3: Registrar un producto', () => {
  const llenarFormularioProducto = () => {
    cy.get('input', { timeout: 10000 }).should('have.length.at.least', 4);

    cy.get('input').eq(0).clear().type('Laptop Dell XPS 13', { delay: 50 });
    cy.get('input').eq(1).clear().type('Laptop de alto rendimiento', { delay: 50 });
    cy.get('input').eq(2).clear().type('1299.99', { delay: 50 });
    cy.get('input').eq(3).clear().type('15', { delay: 50 });

    cy.get('select').then(($selects) => {
      if ($selects.length > 0) {
        cy.wrap($selects.first()).select(1);
      }
    });
  };

  const clickBotonSubmit = () => {
    cy.get('button[type="submit"]', { timeout: 10000 })
      .filter(':visible')
      .first()
      .click({ force: true });
  };

  it('Debe capturar pantalla del formulario de producto', () => {
    cy.visit('/');

    cy.get('body', { timeout: 10000 }).should('be.visible');
    cy.screenshot('05-producto-inicio');

    llenarFormularioProducto();

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