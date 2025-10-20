import React from "react";
import { type Material } from "../../types/course";

type Props = {
  data: Material[];
  setData: React.Dispatch<React.SetStateAction<Material[]>>;
};

const MaterialForm = ({ data, setData }: Props) => {
  const handleChange = (index: number, field: keyof Material, value: string) => {
    const nuevos = [...data];
    if (field === "quantity") {
      nuevos[index][field] = Number(value);
    } else {
      nuevos[index][field] = value;
    }
    setData(nuevos);
  };

  const handleAdd = () => {
    setData([...data, { name: "", quantity: 0, link: "" }]);
  };

  const handleRemove = (index: number) => {
    setData(data.filter((_, i) => i !== index));
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
        {data.map((mat, index) => (
          <div key={index} className="card">
            <div className="card-section-header">
              <h2>Material {index + 1}</h2>
              {data.length > 0 && (
                <span onClick={() => handleRemove(index)} className="cancel-btn">
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
                  onChange={(e) => handleChange(index, "quantity", e.target.value)}
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
              <p className="recommendations">
                Enlace de referencia o compra del material.
              </p>
            </div>
          </div>
        ))}

        <div className="actions">
          <button type="button" onClick={handleAdd} className="add-btn">
            Agregar Material
          </button>
        </div>
      </div>
    </form>
  );
};

export default MaterialForm;
