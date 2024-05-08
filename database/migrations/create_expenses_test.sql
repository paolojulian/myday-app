CREATE TABLE IF NOT EXISTS Expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO Expenses (amount, description) VALUES (100000, 'Gambling allowance')
