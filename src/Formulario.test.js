import { render, screen } from "@testing-library/react";
import App from "./App";

test("verifica se botão registrar animal aparece", () => {
  render(<App />);
  const botao = screen.getByRole("button", { name: /registrar animal/i });
  expect(botao).not.toBeNull();
});

test("verifica se campo nome aparece", () => {
  render(<App />);
  const campoNome = screen.getByPlaceholderText(/digite o nome do animal/i);
  expect(campoNome).not.toBeNull();
});

test("verifica se campo idade aparece", () => {
  render(<App />);
  const campoIdade = screen.getByPlaceholderText(/idade em anos/i);
  expect(campoIdade).not.toBeNull();
});
import userEvent from "@testing-library/user-event";

test("usuário consegue selecionar feminino", async () => {
  render(<App />);

  const select = screen.getByRole("combobox");
  await userEvent.selectOptions(select, "F");

  expect(select.value).toBe("F");
});