import React, { useState, useEffect } from "react";
import rectangle from "../assets/rectangle.png";
import group2 from "../assets/group2.png";
import group1 from "../assets/group1.png";
import logoName from "../assets/logoName.png";
import peninha from "../assets/peninha.png";
import { Modal } from "../componets/Modal";
import { Link } from "react-router-dom";

import axios from "axios";

const Home = () => {
  const [cardapio, setCardapio] = useState([]);
  const [id_item_cardapio, setId_item_cardapio] = useState("");
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [longPressTimeout, setLongPressTimeout] = useState(null);
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    id_item_cardapio: "",
    nome_item: "",
    valor: "",
    descricao: "",
    categoria: "",
    disponibilidade: "",
    id_estoque: "",
    quantidade: "",
    unidade: "",
  });
  const [newItem, setNewItem] = useState({
    id_item_cardapio: "",
    nome_item: "",
    valor: "",
    descricao: "",
    categoria: "",
    disponibilidade: "",
  });
  const [modalType, setModalType] = useState("");

  async function getCardapio() {
    await axios
      .get("http://127.0.0.1:5000/cardapio/read")
      .then((response) => {
        setCardapio(response.data.cardapio);
        console.log(response.data.cardapio);
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Erro ao carregar cardápio, verifique se há item no cardapio ou se a api esta ligada"
        );
      });
  }

  useEffect(() => {
    getCardapio();
  }, []);

  async function insertCardapio() {
    await axios
      .post("http://127.0.0.1:5000/cardapio/insert", {
        id_item_cardapio: inputs.id_item_cardapio,
        nome_item: inputs.nome_item,
        valor: inputs.valor,
        descricao: inputs.descricao,
        categoria: inputs.categoria,
        disponibilidade: inputs.disponibilidade,
        id_estoque: inputs.id_estoque,
        quantidade: inputs.quantidade,
        unidade: inputs.unidade,
      })
      .then(function (response) {
        alert("Item inserido com sucesso!");
        getCardapio();
        console.log(response);
      })
      .catch(function (error) {
        alert("Erro ao inserir item!", error);
        console.log(error);
      });
  }

  async function updateCardapio() {
    await axios
      .post("http://127.0.0.1:5000/cardapio/update", {
        id_item_cardapio: newItem.id_item_cardapio
          ? newItem.id_item_cardapio
          : null,
        nome_item: newItem.nome_item ? newItem.nome_item : null,
        valor: newItem.valor ? newItem.valor : null,
        descricao: newItem.descricao ? newItem.descricao : null,
        categoria: newItem.categoria ? newItem.categoria : null,
        disponibilidade: newItem.disponibilidade
          ? newItem.disponibilidade
          : null,
      })
      .then(function (response) {
        alert("Item atualizado com sucesso!");
        console.log(response);
        getCardapio();
      })
      .catch(function (error) {
        alert("Erro ao atualizar item!", error);
        console.log(error);
      });
  }

  const deleteCardapio = async (id_item_cardapio) => {
    try {
      await axios.post("http://127.0.0.1:5000/cardapio/delete", {
        id_item_cardapio: id_item_cardapio,
      });
      alert("Item deletado com sucesso!");
      setCardapio((prevCardapio) =>
        prevCardapio.filter(
          (item) => item.id_item_cardapio !== id_item_cardapio
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (type, itemId) => {
    setModalType(type);
    setModal(true);
    if (type === "inputs") {
      setInputs({ ...inputs });
    } else if (type === "newItem") {
      setNewItem({ ...newItem, id_item_cardapio: itemId });
    }
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleFormSubmit = (formData, event) => {
    event.preventDefault();
    if (modalType === "inputs") {
      insertCardapio(inputs);
    } else if (modalType === "newItem") {
      updateCardapio(newItem, event);
    }
    handleModalClose();
  };

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
        <div className="bg-white h-5/6 w-[900px] rounded-3xl relative overflow-visible flex flex-col justify-between shadow-2xl ">
          <div className="justify-center items-center overflow-y-auto rounded-full ">
            <img
              src={logoName}
              alt="Rectangle"
              className="absolute left-1/2 top-20 transform -translate-x-1/2 -translate-y-1/2 scale-50"
            />
            <div className="h-1 w-44 bg-amber-800 absolute left-1/2 top-36 transform -translate-x-1/2 -translate-y-1/2 "></div>
            <div className="mb-44"></div>

            {cardapio.map((item) => {
              if (item.disponibilidade) {
                return (
                  <li
                    key={item.id_item_cardapio}
                    className="flex items-center justify-between p-2 mb-4 rounded-md"
                  >
                    <div className="justify-center items-center">
                      <div className="flex flex-row space-x-8">
                        <div className="ml-40 flex flex-row space-x-435px ">
                          <h1 className="text-amber-950 text-2xl">
                            {item.nome_item}
                          </h1>
                          <h2 className="text-amber-950 text-xl">
                            {item.valor}
                          </h2>
                        </div>
                      </div>
                      <div className="ml-52 mt-2">
                        <h6 className="text-amber-950 text-lg">
                          {item.descricao}
                        </h6>
                        <div className=" flex flex-row">
                          <h6 className="text-amber-950 text-lg">
                            Xícara x ml
                          </h6>
                          <div className="ml-64">
                            <img
                              src={peninha}
                              alt="Rectangle"
                              onClick={() =>
                                handleOpenModal(
                                  "newItem",
                                  item.id_item_cardapio
                                )
                              }
                              onMouseDown={() => {
                                const timeout = setTimeout(() => {
                                  setIsLongPressing(true);
                                  if (isLongPressing) {
                                    deleteCardapio(item.id_item_cardapio);
                                  }
                                }, 500);
                                setLongPressTimeout(timeout);
                              }}
                              onMouseUp={() => {
                                clearTimeout(longPressTimeout);
                                setIsLongPressing(false);
                              }}
                              onTouchStart={() => {
                                const timeout = setTimeout(() => {
                                  setIsLongPressing(true);
                                  if (isLongPressing) {
                                    deleteCardapio(item.id_item_cardapio);
                                  }
                                }, 500);
                                setLongPressTimeout(timeout);
                              }}
                              onTouchEnd={() => {
                                clearTimeout(longPressTimeout);
                                setIsLongPressing(false);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
            })}

            <div className="fixed bottom-20 ml-80 left-96 right-0 flex justify-center mb-8">
              <div className="bg-green-400 px-4 rounded-xl">
                <button
                  className="text-lg"
                  onClick={() => handleOpenModal("inputs")}
                >
                  Adicionar
                </button>
              </div>
              <Link to="/Relatorio" className="bg-green-400 px-4 rounded-xl">
                <button>Relatório</button>
              </Link>
            </div>
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

        {modal && (
          <Modal
            isOpen={modal}
            type={modalType}
            inputs={modalType === "inputs" ? inputs : newItem}
            setInputs={modalType === "inputs" ? setInputs : setNewItem}
            handleClose={handleModalClose}
            handleFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    )
  );
};

export default Home;
