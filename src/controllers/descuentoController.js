import Descuento from "../models/descuentoModel.js";
import axios from "axios";

// Obtener todos los descuentos
export const getDescuentos = async (req, res) => {
  try {
    const descuentos = await Descuento.findAll();
    res.status(200).json(descuentos);
  } catch (error) {
    console.error("Error al listar descuentos:", error);
    res.status(500).json({ message: "Error al listar descuentos" });
  }
};

// Crear un nuevo descuento
export const createDescuento = async (req, res) => {
  const { descripcion, porcentaje_descuento, fecha_inicio, fecha_fin, estatus } = req.body;

  if (!descripcion || !porcentaje_descuento || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  if (porcentaje_descuento < 0 || porcentaje_descuento > 100) {
    return res.status(400).json({ message: "El porcentaje de descuento debe estar entre 0 y 100." });
  }

  if (new Date(fecha_inicio) > new Date(fecha_fin)) {
    return res.status(400).json({ message: "La fecha de inicio no puede ser mayor que la fecha de fin." });
  }

  try {
    const descuento = await Descuento.create({
      descripcion,
      porcentaje_descuento,
      fecha_inicio,
      fecha_fin,
      estatus: estatus ?? true,
    });

    res.status(201).json(descuento);
  } catch (error) {
    console.error("Error al crear descuento:", error);
    res.status(500).json({ message: "Error al crear descuento" });
  }
};

// Actualizar un descuento
export const updateDescuento = async (req, res) => {
  const { id } = req.params;
  const { descripcion, porcentaje_descuento, fecha_inicio, fecha_fin, estatus } = req.body;

  try {
    const descuento = await Descuento.findByPk(id);

    if (!descuento) {
      return res.status(404).json({ message: "El descuento no existe." });
    }

    const updatedDescuentoData = {
      descripcion: descripcion || descuento.descripcion,
      porcentaje_descuento: porcentaje_descuento !== undefined ? porcentaje_descuento : descuento.porcentaje_descuento,
      fecha_inicio: fecha_inicio || descuento.fecha_inicio,
      fecha_fin: fecha_fin || descuento.fecha_fin,
      estatus: estatus !== undefined ? estatus : descuento.estatus,
    };

    await descuento.update(updatedDescuentoData);

    res.status(200).json(descuento);
  } catch (error) {
    console.error("Error al actualizar descuento:", error);
    res.status(500).json({ message: "Error al actualizar descuento" });
  }
};

// Eliminar un descuento (cambio lógico de estado)
export const deleteDescuento = async (req, res) => {
  const { id } = req.params;

  try {
    const descuento = await Descuento.findByPk(id);

    if (!descuento) {
      return res.status(404).json({ message: "El descuento no existe." });
    }

    await descuento.update({ estatus: false });

    res.status(200).json({ message: "Descuento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar descuento:", error);
    res.status(500).json({ message: "Error al eliminar descuento" });
  }
};

// Aplicar un descuento a un producto
export const applyDescuentoToProduct = async (req, res) => {
  const { productId, descuentoId } = req.body;

  try {
    console.log("🟢 Iniciando aplicación de descuento");
    const baseProductUrl = "https://products-production-4dfa.up.railway.app/app/products";

    console.log("📦 Obteniendo producto:", `${baseProductUrl}/${productId}`);
    const productoResponse = await axios.get(`${baseProductUrl}/${productId}`);
    const producto = productoResponse.data;

    console.log("🔍 Producto recibido:", producto);

    const descuento = await Descuento.findByPk(descuentoId);
    console.log("🔍 Descuento recibido:", descuento);

    if (!producto) {
      console.warn("⚠️ Producto no encontrado");
      return res.status(404).json({ message: "El producto no existe." });
    }

    if (!descuento || !descuento.estatus) {
      console.warn("⚠️ Descuento no válido o inactivo");
      return res.status(404).json({ message: "El descuento no existe o no está activo." });
    }

    const precioOriginal = parseFloat(producto.precio);
    const precioConDescuento = precioOriginal - (precioOriginal * descuento.porcentaje_descuento) / 100;

    console.log(`💰 Aplicando descuento: de $${precioOriginal} a $${precioConDescuento}`);

    // 👇👇 Aquí se corrigió la ruta PATCH
    await axios.patch(`${baseProductUrl}/update/${productId}`, {
      precio: precioConDescuento
    });

    console.log("✅ Precio actualizado exitosamente");

    res.status(200).json({
      message: "Descuento aplicado correctamente",
      producto: { ...producto, precio: precioConDescuento },
      descuento,
    });
  } catch (error) {
    console.error("❌ Error al aplicar descuento:", error.message);
    console.error("🔎 Detalles del error:", error);
    res.status(500).json({ message: "Error al aplicar descuento" });
  }
};

