### Create new products table:

```sql
CREATE TABLE products (
  title VARCHAR(255),
  description VARCHAR(255),
  image VARCHAR(255),
  price VARCHAR(255),
);
```

### Add new column into the table

```sql
ALTER TABLE products
ADD columnName VARCHAR(255);
```

### Add, delete, or modify columns in an existing table

Change DataType of a table column:

```sql
ALTER TABLE products
ALTER COLUMN propertyName TYPE DataType;
```

Change Maximum Allowed Characters of a table column

```sql
ALTER TABLE products
ALTER COLUMN propertyName TYPE VARCHAR(30);
```

Delete a column from a table

```sql
ALTER TABLE products
DROP COLUMN columnName;
```

DELETE Table

```sql
DROP TABLE tableName;
```

### Display product table

```sql
SELECT * FROM products;
```

### Add new products

```sql
INSET INTO products (title, description, image, price)
VALUES ('product name', 'product description', 'image url', 'product $price');
```

**Add multiple products**

```sql
INSET INTO products (title, description, image, price)
VALUES
  ('product name', 'product description', 'https://imageurl.com', 23)
  ('product name', 'product description', 'https://imageurl.com', 243);
```

### Get Products

Get All Products

```sql
SELECT * FROM products;
```

Get specific column Products

```sql
SELECT title, price, FROM products;
```

Update Product

```sql
UPDATE products
SET propertyName = 'propertyValue'
WHERE uniqueProperty = uniqueProperty /***** this unique property can product ID *****/ /***** if you don't add unique property it will update whole column data *****/
```

### DELETE Product

```sql
DELETE TABLE products
WHERE propertyName = propertyName;
```

DELETE all data

```sql
DELETE FROM products;
```
