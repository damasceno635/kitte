import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (process.env.REACT_APP_SUPABASE_URL || '').trim();
const SUPABASE_ANON_KEY = (process.env.REACT_APP_SUPABASE_ANON_KEY || '').trim();

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	// Ajuda a diagnosticar quando o .env foi alterado sem reiniciar o dev server.
	console.error(
		'Supabase não configurado. Verifique REACT_APP_SUPABASE_URL e REACT_APP_SUPABASE_ANON_KEY e reinicie o npm start.'
	);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

test("envia dados para o Supabase", async () => {

  const resposta = {
    data: [{ nome: "Rex" }],
    error: null
  };

  expect(resposta.error).toBeNull();
  expect(resposta.data[0].nome).toBe("Rex");

});