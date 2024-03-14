CREATE TABLE PRODUCT (
   id SERIAL NOT NULL,
   name VARCHAR(50) NOT NULL,
   category VARCHAR(50) NOT NULL,
   measure  VARCHAR(50) NOT NULL,
   price MONEY NOT NULL,
   CONSTRAINT product_pk PRIMARY KEY (id)
);

CREATE TABLE SUPPLY (
   id SERIAL NOT NULL,
   name VARCHAR(50) NOT NULL,
   city VARCHAR(50) NOT NULL,
   state VARCHAR(50) NOT NULL,
   CONSTRAINT supply_pk PRIMARY KEY (id)
);

CREATE TABLE PRODUCT_SUPPLY (
   id SERIAL NOT NULL,
   product_id INT NOT NULL,
   supply_id INT NOT NULL,
   amount INT NOT NULL,
   measure VARCHAR(50) NOT NULL,
   CONSTRAINT product_supply_pk PRIMARY KEY (id),
   CONSTRAINT product_supply_product_fk FOREIGN KEY (product_id) REFERENCES PRODUCT (id),
   CONSTRAINT product_supply_supply_fk FOREIGN KEY (supply_id) REFERENCES SUPPLY (id)
);