DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NULL,
	department_name VARCHAR(50) NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( 'Smoked Tongue', 'Music', 4.23, 73);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( 'Dried Apple', 'Outdoors', 5.45, 53);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( 'Panasonic VCR', 'Electronics', 149.95, 24);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( 'Gatorade', 'Books', 2.49, 97);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( '80in LCD TV', 'Electronics', 6.44, 99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( 'Green Tea', 'Grocery', 1.42, 16);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( '3/4 Nut, Bolt', 'Industrial', 1.04, 59);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( '5hp Motor', 'Industrial', 238.99, 79);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( '15ft Canoe', 'Outdoors', 102.58, 38);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( 'Assian Creed, Cooking', 'Games', 67.99, 32);


SELECT * FROM products;