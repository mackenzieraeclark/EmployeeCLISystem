-- set db for where to go
use employees;

-- SEED INFO SO THAT APP HAS SOME CONTENT ON FIRST RUN

INSERT INTO employee
    (last_name, first_name, role_id, manager_id)
VALUES
    ('Herrera', 'Sharna', 1, NULL),
    ('Knight', 'Elle', 2, NULL),
    ('Bradshaw', 'Raphael', 3, 1),
    ('Oconnor', 'Nora', 4, 2),
    ('Mills', 'Najma', 5, NULL),
    ('Jordan', 'Arissa', 6, 5),

INSERT INTO department

INSERT INTO role