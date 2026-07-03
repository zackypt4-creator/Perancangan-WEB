CREATE TABLE todos (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(100) NOT NULL,

    description TEXT,

    priority ENUM(
        'Low',
        'Medium',
        'High'
    ) DEFAULT 'Medium',

    status ENUM(
        'Pending',
        'Completed'
    ) DEFAULT 'Pending',

    due_date DATE,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);