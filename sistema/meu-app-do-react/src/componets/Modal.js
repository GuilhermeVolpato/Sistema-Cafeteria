import React, { useState, useEffect } from "react";

const Modal = ({
  isOpen,
  type,
  inputs,
  setInputs,
  handleClose,
  handleFormSubmit,
}) => {
  const [displayedInputs, setDisplayedInputs] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisplayedInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleAddIngredients = (e) => {
    e.preventDefault();
    setInputs((prevInputs) => ({
      ...prevInputs,
      ...displayedInputs
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(inputs, e);
  };

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [isOpen, handleClose, inputs]);

  useEffect(() => {
    setDisplayedInputs(inputs);
  }, [inputs]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>{" "}
      {/* Dark overlay */}
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl">
          {type === "newItem" ? "Atualizar item" : "Inserir novo item"}
        </h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(displayedInputs).map((key) => (
            <div className="mb-4" key={key}>
              <label htmlFor={key} className="mr-2">
                {key}:
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={displayedInputs[key]}
                onChange={handleInputChange}
              />
            </div>
          ))}

          {type === "inputs" && (
            <div>
              <button
                type="submit"
                className="bg-green-400 px-4 rounded-xl"
                onClick={handleAddIngredients}
              >
                Adicionar ingredientes
              </button>
              <button
                type="button"
                className="bg-red-400 px-4 rounded-xl"
                onClick={removeInputs}
              >
                Remover ingredientes
              </button>
            </div>
          )}

          {type !== "inputs" && (
            <button type="submit" className="bg-green-400 px-4 rounded-xl">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export { Modal };
