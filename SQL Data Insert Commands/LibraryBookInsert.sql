LOAD DATA LOCAL INFILE 'C:/Users/Nancy Wu/library-backend/Data/LibraryBookData.csv' 
INTO TABLE LibraryBook 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;