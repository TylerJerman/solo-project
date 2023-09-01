import { Sequelize } from 'sequelize';

async function connectToDB(dbURI) {

  const sequelize = new Sequelize(dbURI, {
    logging: false,
    define: {
      timestamps: false,
      underscored: true,
    },
    dialect: 'postgresql',
  })

  try {
    await sequelize.authenticate();
    console.log("Connected to DB successfully");
  } catch (error) {
    console.error(`Unable to connect to DB: ${dbURI}`, error);
  }

  return sequelize;
}

export default connectToDB;