# Gunakan image resmi Node.js versi 10.24.1
FROM node:10.24.1

# Buat direktori kerja di container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin semua file dari direktori lokal ke container
COPY . .

# Ekspos port 5000 (sesuai dengan port di server.js)
EXPOSE 5000

# Set environment variables dari file .env
ENV DB_HOST=103.217.145.239
ENV DB_USER=DBfaisal
ENV DB_PASS=13@Faisal
ENV DB_NAME=dumbflix
ENV SECRET_KEY=faisal
ENV DB_PORT=3306

# Jalankan aplikasi
CMD ["npm", "start"]
