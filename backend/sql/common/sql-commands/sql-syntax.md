### Get specific colum from table

```sql
SELECT DISTINCT columnName FROM tableName;
```

### Filter Data: Get specific data from table

```sql
SELECT * FROM products
WHERE title = 'T-shirt';
```

With Id

```sql
SELECT * FROM products
WHERE id = 12349;
```

```sql
SELECT * FROM products
WHERE price > 40;
```

### Sort Data: Get sort data from table

```sql
SELECT * FROM products
ORDER BY price;
```

Sort by descending

```sql
SELECT * FROM products
ORDER BY price DESC;
```

Sort Alphabetically

```sql
SELECT * FROM products
ORDER BY title;
```

### Limit: Get limited data from table

```sql
SELECT * FROM products
LIMIT 20;
```

OFFSET Clause specify where to start selecting the data.

```sql
SELECT * FROM products
LIMIT 20 OFFSET 15;
```

### MIN/MAX: Get min and max data from table

```sql
SELECT MIN(price)
FROM products;
```

```sql
SELECT MAX(price)
FROM products;
```

Give a name to the return column by using AS

```sql
SELECT MIN(price) AS lowest_price
FROM products;
```

### COUNT: returns the number of rows that matches a specified criterion

```sql
SELECT COUNT(id)
FROM products;
```

Use WHERE to get data from a specific column

```sql
SELECT COUNT(id)
FROM products
WHERE cetagory = 'Black';
```

### SUM(): Get total sum of a numeric column from table

```sql
SELECT SUM(quantity)
FROM products;
```
