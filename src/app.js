const express = require('express');
const cors = require('cors');
const loansRoutes = require('./routes/loansRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Library Loan API is running',
    endpoints: {
      getAllLoans: 'GET /loans',
      filterLoans: 'GET /loans?status=Terlambat',
      getLoanById: 'GET /loans/:id',
      createLoan: 'POST /loans',
      updateLoan: 'PUT /loans/:id',
      deleteLoan: 'DELETE /loans/:id',
    },
  });
});

app.use('/loans', loansRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

module.exports = app;
