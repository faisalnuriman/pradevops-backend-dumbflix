const { Sequelize } = require('sequelize');

// Membuat koneksi ke database menggunakan Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil.');
  } catch (error) {
    console.error('Koneksi ke database gagal:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();

