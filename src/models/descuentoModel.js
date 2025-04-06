import { DataTypes } from "sequelize";
import sequelize from "../config/bd.js";

const Descuento = sequelize.define("Descuento", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING(255), // Breve descripción del descuento
    allowNull: false,
  },
  porcentaje_descuento: {
    type: DataTypes.DECIMAL(5, 2), // Porcentaje de descuento (ej. 10.00 para 10%)
    allowNull: false,
    validate: {
      min: 0, // No puede ser negativo
      max: 100, // No puede exceder el 100%
    },
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false, // Fecha de inicio del descuento
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false, // Fecha de finalización del descuento
  },
  estatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Indica si el descuento está activo
  },
}, {
  timestamps: false,
  tableName: "descuentos", // Nombre de la tabla en la base de datos
});

export default Descuento;