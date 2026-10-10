const supabase = require('../config/supabaseClient');

const TABLE = 'loans';


async function getLoans(req, res) {
  try {
    const { status, member_name, book_title } = req.query;

    let query = supabase.from(TABLE).select('*').order('id', { ascending: true });

    if (status) query = query.eq('status', status);
    if (member_name) query = query.ilike('member_name', `%${member_name}%`);
    if (book_title) query = query.ilike('book_title', `%${book_title}%`);

    const { data, error } = await query;

    if (error) throw error;

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}


async function getLoanById(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}


async function createLoan(req, res) {
  try {
    const { member_name, book_title, loan_date, due_date, status } = req.body;

    if (!member_name || !book_title || !loan_date || !due_date) {
      return res.status(400).json({
        success: false,
        message: 'Field member_name, book_title, loan_date, dan due_date wajib diisi',
      });
    }

    const newLoan = {
      member_name,
      book_title,
      loan_date,
      due_date,
      status: status || 'Dipinjam',
    };

    const { data, error } = await supabase.from(TABLE).insert([newLoan]).select().single();

    if (error) throw error;

    return res.status(201).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}


async function updateLoan(req, res) {
  try {
    const { id } = req.params;
    const { member_name, book_title, loan_date, due_date, status, return_date } = req.body;

    const updateData = {};
    if (member_name !== undefined) updateData.member_name = member_name;
    if (book_title !== undefined) updateData.book_title = book_title;
    if (loan_date !== undefined) updateData.loan_date = loan_date;
    if (due_date !== undefined) updateData.due_date = due_date;
    if (status !== undefined) updateData.status = status;
    if (return_date !== undefined) updateData.return_date = return_date;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: 'Tidak ada data yang dikirim untuk diupdate' });
    }

    const { data, error } = await supabase
      .from(TABLE)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}


async function deleteLoan(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase.from(TABLE).delete().eq('id', id).select().single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
    }

    return res.status(200).json({
      success: true,
      message: 'Data peminjaman berhasil dihapus',
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
};
