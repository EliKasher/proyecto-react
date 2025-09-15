import React, { useState } from "react";
import "../styles/MaterialForm.css";

type Material = {
  nombre: string;
  cantidad: number;
  link: string;
};

export default function MaterialForm() {
  const [materiales, setMateriales] = useState<Material[]>([
    { nombre: "", cantidad: 0, link: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof Material,
    value: string
  ) => {
    const nuevos = [...materiales];
    if (field === "cantidad") {
      nuevos[index][field] = Number(value);
    } else {
      nuevos[index][field] = value;
    }
    setMateriales(nuevos);
  };

  const handleAdd = () => {
    setMateriales([...materiales, { nombre: "", cantidad: 0, link: "" }]);
  };

  const handleRemove = (index: number) => {
    const nuevos = materiales.filter((_, i) => i !== index);
    setMateriales(nuevos);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Materiales:", materiales);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {materiales.map((mat, index) => (
        <div key={index} className="material-card">
          <p className="material-header">
            <h2>Material {index + 1}</h2>
          {materiales.length > 1 && (
            <p
              onClick={() => handleRemove(index)}
              className="cancel-btn"
            >
              <img src="close.svg" alt="" />
            </p>
          )}
          </p>
          <div className="first-row">
            <div className="field">
              <label>Nombre</label>
              <input
                type="text"
                value={mat.nombre}
                onChange={(e) => handleChange(index, "nombre", e.target.value)}
              />
              <p className="hint">El nombre del material.</p>
            </div>

            <div className="field">
              <label>Cantidad</label>
              <input
                type="number"
                value={mat.cantidad}
                onChange={(e) =>
                  handleChange(index, "cantidad", e.target.value)
                }
              />
              <p className="hint">
                Número de unidades necesarias de este material.
              </p>
            </div>
          </div>
          <div className="field">
            <label>Link</label>
            <input
              type="url"
              value={mat.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
            />
            <p className="hint">Enlace de referencia o compra del material.</p>
          </div>

        </div>
      ))}

      <div className="actions">
        <button type="button" onClick={handleAdd} className="add-btn">
          Agregar Material
        </button>
        <button type="submit" className="submit-btn">
          Guardar
        </button>
      </div>
    </form>
  );
}
