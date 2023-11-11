module.exports = (sequelize, DataTypes) => {
  let alias = "Book";
  let cols = {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: DataTypes.TEXT,
          allowNull: true,
      },
      link: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      genre: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      }
  };
  let config = {
      tableName: "Books",
      timestamps: false
  }

  const Book = sequelize.define(alias, cols, config);

  return Book;
}
