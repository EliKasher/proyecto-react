import React from "react";
import { type Material } from "../../types/course";

import { useDispatch } from "react-redux";
import {
  updateMaterial,
  addMaterial,
  removeMaterial,
  updateIsValid,
} from "../../reducers/formReducer";

import { urlValidation } from "../../utils/validators";

type Props = {
  data: Material[];
  isValid: boolean;
  showErrors: boolean;
};

const MaterialForm = ({ data, isValid, showErrors }: Props) => {
  const dispatch = useDispatch();

  const handleChange = (
    index: number,
    field: keyof Material,
    value: string
  ) => {
    dispatch(updateMaterial({ index, field, value }));
  };

  const handleAdd = () => {
    dispatch(addMaterial({ name: "", quantity: 0, link: "" }));
  };

  const handleRemove = (index: number) => {
    dispatch(removeMaterial(index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const errors = new Array(data.length).fill({
    name: { msg: "" },
    quantity: { msg: "" },
    link: { msg: "" },
  });

  const validate = () => {
    let errorCount = 0;

    const nameLengthError = {
      msg: "El largo del nombre del material debe ser de al menos 5 carácteres.",
    };
    const quantitySizeError = {
      msg: "La cantidad del material debe ser al menos 1",
    };
    const linkError = { msg: "La URL no es válida" };

    if (data.length !== 0) {
      // check if name is at least 5
      // check quanitity > 0
      // check link

      for (let i = 0; i < data.length; i++) {
        if (data[i].name.length < 5) {
          errorCount++;
          errors[i].name = nameLengthError;
        }

        if (data[i].quantity < 1) {
          errorCount++;
          errors[i].quantity = quantitySizeError;
        }

        if (!urlValidation(data[i].link)) {
          errorCount++;
          errors[i].link = linkError;
        }
      }
    }

    return errorCount === 0;
  };

  const status = validate();

  if (status != isValid) dispatch(updateIsValid(status));

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
                {showErrors && errors[index].name.msg && (
                  <p className="errors-col">{errors[index].name.msg}</p>
                )}
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

                {showErrors && errors[index].quantity.msg && (
                  <p className="errors-col">{errors[index].quantity.msg}</p>
                )}
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
              {showErrors && errors[index].link.msg && (
                <p className="errors-col">{errors[index].link.msg}</p>
              )}
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
