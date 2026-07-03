import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      defaultValue: "Medium",
    },

    status: {
      type: DataTypes.ENUM("Pending", "Completed"),
      defaultValue: "Pending",
    },

    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "todos",
    timestamps: true,
  },
);

export default Todo;
