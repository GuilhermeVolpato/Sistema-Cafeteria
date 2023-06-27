import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Relatorio({ data }) {
  const [relatorio, setRelatorio] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  useEffect(() => {
    fetchData();
  }, [dataInicio, dataFim]);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/relatorio', {
        dataInicio,
        dataFim,
      });
      console.log(response.data.relatorio);
      setRelatorio(response.data.relatorio);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dataInicio">Data de Início:</label>
          <input
            type="text"
            id="dataInicio"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dataFim">Data de Fim:</label>
          <input
            type="text"
            id="dataFim"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
        <button type="submit">Gerar Relatório</button>
      </form>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Total de Pedidos</th>
              <th className="px-4 py-2">Valor Total</th>
              <th className="px-4 py-2">Ingredientes Utilizados</th>
              <th className="px-4 py-2">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {relatorio.map((item) => (
              <tr key={item.nome_item}>
                <td className="border px-4 py-2">{item.nome_item}</td>
                <td className="border px-4 py-2">{item.total_pedidos}</td>
                <td className="border px-4 py-2">R${item.valor_total.toFixed(2)}</td>
                <td className="border px-4 py-2">{item.itens_estoque_utilizados}</td>
                <td className="border px-4 py-2">{item.descricao_item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Relatorio;