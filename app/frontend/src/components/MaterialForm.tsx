import React, { useState } from "react";
import "@/styles/MaterialForm.css";
import { Material } from "../types/course";



export default function MaterialForm(props: {
  materials: Material[],
  setMaterials: (arg: Material[]) => void
}) {
  //const [materiales, setMateriales] = useState<Material[]>([
    //{ nombre: "", cantidad: 0, link: "" },
  //]);

  const materiales = props.materials;
  const setMateriales = props.setMaterials;

  const handleChange = (
    index: number,
    field: keyof Material,
    value: string
  ) => {
    const nuevos = [...materiales];
    if (field === "quantity") {
      nuevos[index][field] = Number(value);
    } else {
      nuevos[index][field] = value;
    }
    setMateriales(nuevos);
  };

  const handleAdd = () => {
    setMateriales([...materiales, { name: "", quantity: 0, link: "" }]);
  };

  const handleRemove = (index: number) => {
    const nuevos = materiales.filter((_, i) => i !== index);
    setMateriales(nuevos);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                value={mat.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                name="materialName"
              />
              <p className="recommendations-col">El nombre del material.</p>
            </div>
            <div className="form-column">
              <label className="required">Cantidad</label>
              <input
                type="number"
                value={mat.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
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
