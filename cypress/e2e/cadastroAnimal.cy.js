describe("Cadastro de Animal", () => {

  it("cadastra um animal", () => {

    cy.visit("http://localhost:3000")

    cy.get('input[name="nome"]').type("Rex")
    cy.get('input[name="idade"]').type("5")
    cy.get('input[name="raca"]').type("Vira-lata")
    cy.get('input[name="peso"]').type("10")

    cy.get('select[name="sexo"]').select("M")

    cy.get('input[name="dono"]').type("João")

    cy.contains("Registrar Animal").click()

    cy.contains("Rex")
  })

})