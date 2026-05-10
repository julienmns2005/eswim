const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support for large HTML payloads

// Setup database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à SQLite:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// API Routes

// Obtenir tous les articles
app.get('/api/articles', (req, res) => {
  db.all('SELECT * FROM articles ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obtenir un article par ID
app.get('/api/articles/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Article non trouvé" });
      return;
    }
    res.json(row);
  });
});

// Créer un nouvel article
app.post('/api/articles', (req, res) => {
  const { title, category, image, content } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ error: "Le titre, la catégorie et le contenu sont requis." });
  }

  const stmt = db.prepare('INSERT INTO articles (title, category, image, content) VALUES (?, ?, ?, ?)');
  stmt.run([title, category, image, content], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Fetch the newly created article
    db.get('SELECT * FROM articles WHERE id = ?', [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
});

// Modifier un article
app.put('/api/articles/:id', (req, res) => {
  const { id } = req.params;
  const { title, category, image, content } = req.body;
  
  if (!title || !category || !content) {
    return res.status(400).json({ error: "Le titre, la catégorie et le contenu sont requis." });
  }

  const stmt = db.prepare('UPDATE articles SET title = ?, category = ?, image = ?, content = ? WHERE id = ?');
  stmt.run([title, category, image, content, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Article non trouvé." });
      return;
    }
    db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
      res.json(row);
    });
  });
});

// Supprimer un article (optionnel mais utile pour l'admin)
app.delete('/api/articles/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM articles WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Article supprimé", changes: this.changes });
  });
});

// Configure NodeMailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Recevoir une réservation et envoyer le PDF
app.post('/api/reservation', async (req, res) => {
  const { prenom, nom, email, niveau, message } = req.body;
  if (!prenom || !nom || !email) {
    return res.status(400).json({ error: 'Prénom, Nom et Email sont obligatoires.' });
  }

  const pdfPath = path.join(__dirname, 'guide.pdf');
  const hasGuide = fs.existsSync(pdfPath);

  try {
    const mailOptions = {
      from: `"Julien Moens - SwimAnalytics" <${process.env.EMAIL_USER}>`,
      to: email, // Le client reçoit le mail
      bcc: process.env.EMAIL_USER, // Vous recevez une copie pour savoir qui a téléchargé
      subject: 'Votre Guide de Captation Vidéo - SwimAnalytics',
      html: `
        <h2>Bonjour ${prenom},</h2>
        <p>Merci pour votre confiance ! Voici en pièce jointe votre <strong>Guide de Captation Vidéo</strong>.</p>
        <p>Prenez bien le temps de le lire avant de vous faire filmer. L'angle et la qualité des vidéos sont primordiaux pour réaliser une bonne analyse.</p>
        <ul>
          <li><strong>Votre Niveau :</strong> ${niveau || 'Non précisé'}</li>
          ${message ? `<li><strong>Votre message :</strong> ${message}</li>` : ''}
        </ul>
        <br />
        <p>Une fois vos vidéos tournées exactement comme indiqué, vous pouvez simplement <strong>répondre à ce mail</strong> pour me les transmettre (via WeTransfer ou Google Drive).</p>
        <br />
        <p>À très vite dans l'eau !</p>
        <p><em>Julien Moens</em></p>
      `,
      attachments: hasGuide ? [
        {
          filename: 'Guide_Captation_SwimAnalytics.pdf',
          path: pdfPath
        }
      ] : []
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error("Erreur serveur email:", error);
    res.status(500).json({ error: "Impossible d'envoyer l'email." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur http://localhost:${PORT}`);
});
