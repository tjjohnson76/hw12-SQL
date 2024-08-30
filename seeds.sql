INSERT INTO departments (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');


INSERT INTO roles (title, salary, department_id)
VALUES  ('Lead Sales', 60000, 1),
        ('Sales Associate', 40000, 1),
        ('Lead Engineer', 100000, 2),
        ('Jr. Engineer', 50000, 2),
        ('Chief of Finance', 110000, 3),
        ('Finance Gremlin', 45000, 3),
        ('Head of Legal', 90000, 4),
        ('Legal Goblin', 39000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Jon', 'Doe', 1, NULL),
        ('Jane', 'Dos', 2, 1),
        ('Jen', 'Den', 3, NULL),
        ('Riff', 'Raff', 4, 3),
        ('Tan', 'John', 5, NULL),
        ('Mike', 'Wiz', 6, 5),
        ('Sully', 'Fluff', 7, NULL),
        ('Kitty', 'Kat', 8, 7);