LOAD DATA LOCAL INFILE 'C:/Users/Nancy Wu/library-backend/Data/LibraryBranchData.csv' 
INTO TABLE LibraryBranch 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;