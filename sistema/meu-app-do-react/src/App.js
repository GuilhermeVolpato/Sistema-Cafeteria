import React, { useState, useEffect } from "react";
import rectangle from "./assets/rectangle.png";
import group2 from "./assets/group2.png";
import group1 from "./assets/group1.png";
import logoName from "./assets/logoName.png";
import axios from "axios";

import "./App.css";

const App = () => {
  const [cardapio, setCardapio] = useState([]);
  const [id_item_cardapio, setId_item_cardapio] = useState("");
  const [nome_item, setNome_item] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [id_estoque, setId_estoque] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");

  // const [menuItems, setMenuItems] = useState([]);
  // const [newItem, setNewItem] = useState({
  //   name: '',
  //   price: '',
  //   ingredients: ''
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setNewItem({ ...newItem, [name]: value });
  // };

  // const addItem = () => {
  //   if (newItem.name.trim() !== '' && newItem.price.trim() !== '' && newItem.ingredients.trim() !== '') {
  //     setMenuItems([...menuItems, newItem]);
  //     setNewItem({
  //       name: '',
  //       price: '',
  //       ingredients: ''
  //     });
  //   }
  // };

  // const removeItem = (index) => {
  //   const updatedMenuItems = [...menuItems];
  //   updatedMenuItems.splice(index, 1);
  //   setMenuItems(updatedMenuItems);
  // };

  async function getCardapio() {
    await axios.get("http://127.0.0.1:5000/cardapio/read").then((response) => {
      setCardapio(response.data.cardapio);
      console.log(response.data.cardapio);
    })
  }

  async function insertCardapio() {
    await axios
      .post("http://127.0.0.1:5000/cardapio/insert", {
        id_item_cardapio: id_item_cardapio,
        nome_item: nome_item,
        valor: valor,
        descricao: descricao,
        categoria: categoria,
        disponibilidade: disponibilidade,
        id_estoque: id_estoque,
        quantidade: quantidade,
        unidade: unidade,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // setCategoria("");
  // setDisponibilidade("");
  async function updateCardapio(e) {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:5000/cardapio/update", {
        id_item_cardapio: id_item_cardapio? id_item_cardapio : null,
        nome_item: nome_item? nome_item : null,
        valor: valor? valor : null,
        descricao: descricao? descricao : null,
        categoria: categoria? categoria : null,
        disponibilidade: disponibilidade? disponibilidade : null,
      })
      .then(function (response) {
        alert("Item atualizado com sucesso!");
        console.log(response);
      })
      .catch(function (error) {
        alert("Erro ao atualizar item!", error);
        console.log(error);
      });
  }

  async function deleteCardapio() {
    await axios
      .post("http://127.0.0.1:5000/cardapio/update", {
        id_item_cardapio: id_item_cardapio,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    setId_item_cardapio(2);
    setValor(200);
    setDescricao("Cafe Macchiato frances");
    getCardapio();
  }, []);

  return (
    cardapio && (
      <div className="h-screen w-screen bg-gradient-to-tr from-amber-700 opacity-95 from-5% via-orange-200 to-amber-700 to-99% flex justify-center items-center">
        <img
          src={group2}
          alt="Rectangle"
          className="absolute left-4 top-32 scale-75 opacity-90"
        />
        <img
          src={group1}
          alt="Rectangle"
          className="absolute right-28 bottom-16 scale-75 opacity-90"
        />
        <div className="bg-white h-5/6 w-[900px] rounded-3xl relative overflow-visible">
          <div className="justify-center items-center">
            <img
              src={logoName}
              alt="Rectangle"
              className="absolute left-1/2 top-20 transform -translate-x-1/2 -translate-y-1/2 scale-50"
            />
            <div className="h-1 w-44 bg-amber-800 absolute left-1/2 top-36 transform -translate-x-1/2 -translate-y-1/2 "></div>
            <div className="mb-44"></div>

            {cardapio.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 mb-4 rounded-md"
              >
                <div className="justify-center items-center mb-4">
                  <div className="flex flex-row">
                    <div className="ml-40">
                      <h1>{item.nome_item}</h1>
                    </div>
                    <div className="flex absolute right-40">
                      <h2>R$: {item.valor}</h2>
                    </div>
                  </div>
                  <div className="ml-52 mt-2">
                    <h6>{item.descricao}</h6>
                  </div>
                </div>
              </li>
            ))}
            <button onClick={updateCardapio}> CLICA AQUIIIII</button>
          </div>
          <img
            src={rectangle}
            alt="Rectangle"
            className="absolute -right-14 -top-12 scale-80"
          />
          <img
            src={rectangle}
            alt="Rectangle"
            className="absolute -left-14 -bottom-12 scale-80"
          />
          
        </div>
      </div>
    )
  );
};

export default App;
