describe('Tarefas - CRUD', () => {

    it('Deve adicionar uma nova tarefa', () => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid="input-task"]').type('Nova Tarefa');
      cy.get('[data-testid="add-task"]').click();
      cy.contains('Nova Tarefa').should('be.visible');
    });

    it('Deve adicionar uma nova tarefa', () => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid="input-task"]').type('Nova Tarefa');
      cy.get('[data-testid="add-task"]').click();
      cy.contains('Nova Tarefa').should('be.visible');
    });

    it('Deve adicionar uma nova tarefa', () => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid="input-task"]').type('Nova Tarefa');
      cy.get('[data-testid="add-task"]').click();
      cy.contains('Nova Tarefa').should('be.visible');
    });

  });