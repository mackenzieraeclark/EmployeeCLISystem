-- set db for where to go
use employees;

-- SEED INFO SO THAT APP HAS SOME CONTENT ON FIRST RUN

INSERT INTO employee
    (last_name, first_name, role_id, manager_id)
VALUES
    ('Herrera', 'Sharna', 1, 1),
    ('Knight', 'Elle', 2, 2),
    ('Bradshaw', 'Raphael', 3, 1),
    ('Oconnor', 'Nora', 4, 2),
    ('Mills', 'Najma', 5, 5),
    ('Jordan', 'Arissa', 6, 5);

INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Design'),
    ('Marketing'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Senior Engineer', 250000, 1),
    ('Mid Engineer', 1500000, 1),
    ('Junior Engineer', 100000, 1),
    ('UX / UI Senior Designer', 110000, 2),
    ('Junior Graphic Designer', 90000, 2),
    ('Client Facing Sales Lead', 100000, 3),
    ('B2B Sales Associate', 90000, 3),
    ('Account Associate', 90000, 4),
    ('Accountant', 100000, 4),
    ('Legal Consultant', 200000, 5);