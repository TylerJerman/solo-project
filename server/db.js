import { Sequelize } from 'sequelize';

// const dbURI = process.env.DATABASE_URL || 'postgresql://username:password@localhost:5173/gumbo_db';

async function connectToDB(dbURI) {

  const sequelize = new Sequelize(dbURI, {
    logging: false,
    define: {
      timestamps: false,
      underscored: true,
    },
    dialect: 'postgresql',
  })

  // Try to authenticate (connect) to the database
  try {
    await sequelize.authenticate();
    // If successful, log a success message to the console
    console.log("Connected to DB successfully");
  } catch (error) {
    // If an error occurs, log the error message to the console
    console.error(`Unable to connect to DB: ${dbURI}`, error);
  }

  //return the initialized Sequelize instance for further use
  return sequelize;
}

// Export the function so it can be used elsewhere in the project
export default connectToDB;