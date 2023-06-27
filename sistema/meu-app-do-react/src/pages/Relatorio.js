import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Relatorio({ data }) {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/relatorio', {
          dataInicio: '2022-06-01', // Replace with your desired start date
          dataFim: '2023-06-30', // Replace with your desired end date
        });
        console.log(response.data.relatorio);
        setRelatorio(response.data.relatorio);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
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
