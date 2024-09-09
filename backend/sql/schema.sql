-- This SQL script creates a 'users' table with the following fields:
-- - 'id': A unique identifier for each user (primary key), automatically incremented.
-- - 'role': The role of the user in the system (e.g., admin, doctor, user, staff), which cannot be null.
-- - 'pesel': The unique PESEL (Polish national identification number) of the user, which cannot be null and must be unique.
-- - 'name': The first name of the user, which cannot be null.
-- - 'surname': The last name of the user, which cannot be null.
-- - 'email': The user's email address, which cannot be null and must be unique.
-- - 'dialing_code': The dialing code for the user's phone number (e.g., '+48'), which cannot be null.
-- - 'phone_number': The user's phone number, which cannot be null and must be unique.
-- - 'password': The user's password (hashed), which cannot be null.
-- - 'must_change_password': A boolean field indicating if the user must change their password upon first login, which cannot be null.
-- - 'created_at': The timestamp when the user was created, automatically set to the current time.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role VARCHAR(15) NOT NULL,
    pesel CHAR(11) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    dialing_code VARCHAR(5) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    must_change_password BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);