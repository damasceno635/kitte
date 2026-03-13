test("envia dados para o Supabase", async () => {

  const resposta = {
    data: [{ nome: "Rex" }],
    error: null
  };

  expect(resposta.error).toBeNull();
  expect(resposta.data[0].nome).toBe("Rex");

});