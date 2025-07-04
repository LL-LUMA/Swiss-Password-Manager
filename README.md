# Swiss Password Manager 🛡️

A secure and lightweight Chrome extension password manager using PHP & MySQL.

## Features
- User registration & login
- Store credentials per website
- Password encryption
- Chrome Extension interface
- Local + cloud storage

## Technologies
- HTML, CSS, JS (Chrome Extension)
- PHP (API backend)
- MySQL (via phpMyAdmin)
- JSON API for communication

## Setup
1. Clone the repo
2. Import `sql/schema.sql` in phpMyAdmin
3. Run backend from `http://localhost/swiss/api/`
4. Load the `chrome-extension/` directory in Chrome's Extensions page (developer mode)
5. Start saving passwords securely!

## Security
- Bcrypt for master passwords
- AES encryption (coming soon)
- Token-based auth (coming soon)

## License
MIT
