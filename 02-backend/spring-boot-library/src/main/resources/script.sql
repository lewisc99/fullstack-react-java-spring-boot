-- Create tb_user table with binary(16) ID
CREATE TABLE IF NOT EXISTS tb_user (
    id BINARY(16) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN,
    PRIMARY KEY (id)
);

-- Create tb_role table with binary(16) ID
CREATE TABLE IF NOT EXISTS tb_role (
    id BINARY(16) NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY (id)
);

-- Create user_role table
CREATE TABLE IF NOT EXISTS user_role (
    user_id BINARY(16) NOT NULL,
    role_id BINARY(16) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES tb_user(id),
    FOREIGN KEY (role_id) REFERENCES tb_role(id)
);

-- Trigger to set default binary(16) ID for tb_user table
DELIMITER //
CREATE TRIGGER set_default_user_id
BEFORE INSERT ON tb_user
FOR EACH ROW
BEGIN
    SET NEW.id = UNHEX(REPLACE(UUID(), '-', ''));
END;
//
DELIMITER ;

-- Trigger to set default binary(16) ID for tb_role table
DELIMITER //
CREATE TRIGGER set_default_role_id
BEFORE INSERT ON tb_role
FOR EACH ROW
BEGIN
    SET NEW.id = UNHEX(REPLACE(UUID(), '-', ''));
END;
//
DELIMITER ;

-- Insert into tb_user table

INSERT INTO tb_user (email, password, active)
VALUES ('jacopo@gmail.com', '$2a$12$RWvNHsHjHW/3sGQ5ovCyrO15V5/VO14ugBpuDEOTNHRDpmPMRuPIe', true);

-- Insert into tb_role table
INSERT INTO tb_role (name)
VALUES ('USER');

-- Insert into user_role table
INSERT INTO user_role (user_id, role_id)
VALUES (
    (SELECT id FROM tb_user WHERE email = 'jacopo@gmail.com'),
    (SELECT id FROM tb_role WHERE name = 'USER')
);

