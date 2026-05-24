const express = require('express');
const router = express.Router();
const { pool } = require('../../config/database');
const nodemailer = require('nodemailer');

// POST contact form
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  try {
    // Save to DB
    await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
  } catch (dbErr) {
    console.warn('[DB] Could not save contact:', dbErr.message);
  }

  // Send email if configured
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `[Portfolio] New message from ${name}`,
        html: `<h2>New Contact from Portfolio</h2>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p>
               <p>${message}</p>`
      });
    } catch (mailErr) {
      console.warn('[MAIL] Email send failed:', mailErr.message);
    }
  }

  res.json({ success: true, message: 'Message received. I will get back to you soon!' });
});

module.exports = router;