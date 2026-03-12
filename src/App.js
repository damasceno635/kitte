import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './index.css';

function App() {
  const [animal, setAnimal] = useState({
    nome: '',
    idade: '',
    raca: '',
    peso: '',
    sexo: '',
    dono: ''
  });
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    fetchAnimais();
  }, []);

  const fetchAnimais = async () => {
    try {
      const { data, error } = await supabase.from('animais').select('*');
      if (error) {
        console.error('Erro ao buscar animais:', error);
        return;
      }
      setAnimais(data || []);
    } catch (err) {
      console.error('Falha de rede ao buscar animais:', err);
    }
  };

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('animais').insert([animal]);
      if (error) {
        alert('Erro: ' + error.message);
        return;
      }

      alert('Animal registrado com sucesso!');
      setAnimal({ nome:'', idade:'', raca:'', peso:'', sexo:'', dono:'' });
      fetchAnimais();
    } catch (err) {
      console.error('Falha de rede ao registrar animal:', err);
      alert(
        'Erro de rede ao acessar Supabase. Confirme a internet, o REACT_APP_SUPABASE_URL/KEY no .env e reinicie o npm start.'
      );
    }
  };

return (

  <div className="app-container">
    {/* COLUNA ESQUERDA - FORMULÁRIO */}
    <div className="logo-container">
      <img src="/logo.png" alt="Logo Kitte" className="logo" />
    </div>

    <div className="form-coluna">
      <h1>Registrar Animal</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input 
          name="nome" 
          placeholder="Digite o nome do animal" 
          value={animal.nome} 
          onChange={handleChange} 
          required 
        />

        <label>Idade:</label>
        <input 
          name="idade" 
          placeholder="Idade em anos" 
          type="number" 
          min="0"
          value={animal.idade} 
          onChange={handleChange} 
          required 
        />

        <label>Raça:</label>
        <input 
          name="raca" 
          placeholder="Digite a raça" 
          value={animal.raca} 
          onChange={handleChange} 
          required 
        />

        <label>Peso (kg):</label>
        <input 
          name="peso" 
          placeholder="Ex: 5.5" 
          type="number" 
          step="0.1" 
          min="0"
          value={animal.peso} 
          onChange={handleChange} 
          required 
        />

        <label>Sexo:</label>
        <select 
          name="sexo" 
          value={animal.sexo} 
          onChange={handleChange} 
          required
        >
          <option value="">Selecione</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>

        <label>Dono:</label>
        <input 
          name="dono" 
          placeholder="Nome do dono" 
          value={animal.dono} 
          onChange={handleChange} 
          required 
        />

        <button type="submit"> Registrar Animal</button>
      </form>
    </div>

    {/* COLUNA DIREITA - LISTA */}
    <div className="lista-coluna">
      <h2>Animais Cadastrados</h2>
      <ul>
        {animais.map(a => (
          <li key={a.id}>
            <strong>{a.nome}</strong> 
            <span className="animal-info">
              <span>🐕 {a.raca}</span>
              <span>🎂 {a.idade} anos</span>
              <span>⚖️ {a.peso}kg</span>
              <span>{a.sexo === 'M' ? '♂️ Macho' : '♀️ Fêmea'}</span>
              <span>👤 {a.dono}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default App;