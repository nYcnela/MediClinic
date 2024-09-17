-- 'users' table with the following fields:
-- - 'id': A unique identifier for each user (primary key), automatically incremented
-- - 'role': The role of the user in the system (e.g., admin, doctor, user, staff), which cannot be null and defaults to 'user'
-- - 'pesel': The unique PESEL (Polish national identification number) of the user, which cannot be null and must be unique
-- - 'name': The first name of the user, which cannot be null
-- - 'surname': The last name of the user, which cannot be null
-- - 'email': The user's email address, which cannot be null and must be unique
-- - 'dialing_code': The dialing code for the user's phone number (e.g., '+48'), which cannot be null
-- - 'phone_number': The user's phone number, which cannot be null and must be unique
-- - 'password': The user's hashed password, which cannot be null
-- - 'created_at': The timestamp when the user was created, automatically set to the current time
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role VARCHAR(15) NOT NULL DEFAULT 'user',
    pesel CHAR(11) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    dialing_code VARCHAR(5) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 'admins' table with the following fields:
-- - 'id': A unique identifier for each admin (primary key), automatically incremented
-- - 'user_id': A reference to the user associated with this admin (foreign key from 'users'), which will cascade on delete
-- - 'must_change_password': A boolean indicating if the admin must change their password upon first login, defaults to 'true'
CREATE TABLE admins (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	must_change_password BOOLEAN NOT NULL DEFAULT 'true'
);

-- 'doctors' table with the following fields:
-- - 'id': A unique identifier for each doctor (primary key), automatically incremented
-- - 'user_id': A reference to the user associated with this doctor (foreign key from 'users'), which will cascade on delete
-- - 'pwz': The doctor's medical license number (PWZ), which cannot be null
-- - 'sex': The doctor's gender, which cannot be null
-- - 'degree': The doctor's academic or professional degree (e.g., MD, PhD), which cannot be null
-- - 'must_change_password': A boolean indicating if the doctor must change their password upon first login, defaults to 'true'
-- - 'unique_user_id': A constraint ensuring that each doctor is uniquely associated with one user
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    pwz VARCHAR(7) NOT NULL,
    sex VARCHAR(5) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    must_change_password BOOLEAN NOT NULL DEFAULT 'true',
    CONSTRAINT unique_user_id UNIQUE (user_id)
);

-- 'doctor_specializations' table with the following fields:
-- - 'id': A unique identifier for each specialization (primary key), automatically incremented
-- - 'doctor_id': A reference to the doctor associated with this specialization (foreign key from 'doctors'), which will cascade on delete
-- - 'specialization': The name of the doctor's specialization (e.g., cardiology, dermatology), which cannot be null
-- - 'unique_doctor_specialization': A constraint ensuring that a doctor cannot have duplicate specializations
CREATE TABLE doctor_specializations (
    id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctors(user_id) ON DELETE CASCADE,
    specialization VARCHAR(255) NOT NULL,
    CONSTRAINT unique_doctor_specialization UNIQUE (doctor_id, specialization)
);

-- 'work_time_records' table with the following fields:
-- - 'id': A unique identifier for each work time record (primary key), automatically incremented
-- - 'employee_id': A reference to the user associated with this work time record (foreign key from 'users'), which will cascade on delete
-- - 'work_day': The day of the week the employee works (e.g., 'Monday', 'Tuesday'), which cannot be null
-- - 'start_time': The start time of the employee's work day, which cannot be null
-- - 'end_time': The end time of the employee's work day, which cannot be null
-- - 'unique_employee_workday': A constraint ensuring that an employee cannot have multiple work records for the same day
CREATE TABLE work_time_records (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES users(id) ON DELETE CASCADE, 
    work_day VARCHAR(9) NOT NULL, 
    start_time TIME NOT NULL,  
    end_time TIME NOT NULL,  
    CONSTRAINT unique_employee_workday UNIQUE (employee_id, work_day)  
);
