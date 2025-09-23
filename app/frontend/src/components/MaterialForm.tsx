import React, { useState } from "react";
import "../styles/course_form.css"

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
      <div className="form-section">
        <div className="section-header">
            <h3>Materiales</h3>
        </div>
      {materiales.map((mat, index) => (
        <div key={index} className="card">
          <div className="card-section-header">
            <h2>Material {index + 1}</h2>
          {materiales.length > 1 && (
            <span
              onClick={() => handleRemove(index)}
              className="cancel-btn"
            >
            <img src="close.svg" alt="Eliminar Material" />
            </span>
          )}
          </div>
          <div className="form-card-group">
            <div className="form-column">
              <label className="required">Nombre</label>
              <input
                type="text"
                value={mat.nombre}
                onChange={(e) => handleChange(index, "nombre", e.target.value)}
                name="materialName"
              />
              <p className="recommendations-col">El nombre del material.</p>
            </div>
            <div className="form-column">
              <label className="required">Cantidad</label>
              <input
                type="number"
                value={mat.cantidad}
                onChange={(e) =>
                  handleChange(index, "cantidad", e.target.value)
                }
                name="materialQuantity"
              />
              <p className="recommendations-col">
                Número de unidades necesarias de este material.
              </p>
            </div>
          </div>
          <div className="form-row">
            <label className="required">Link</label>
            <input
              type="url"
              value={mat.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
              name="materialLink"
            />
            <p className="recommendations">Enlace de referencia o compra del material.</p>
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
      </div>
    </form>
  );
}
