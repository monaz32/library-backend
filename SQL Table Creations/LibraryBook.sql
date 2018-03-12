CREATE TABLE LibraryBook(bookID int auto_increment, 
isbn 		varchar(13) NOT NULL,
branchNum 	int NOT NULL,
status		varchar(100) NOT NULL,
genre		varchar(100),
PRIMARY KEY (bookID), 
FOREIGN KEY (isbn) REFERENCES Book(isbn)
ON UPDATE CASCADE
ON DELETE CASCADE, 
FOREIGN KEY (branchNum) REFERENCES LibraryBranch(branchNum)
ON UPDATE CASCADE
ON DELETE NO ACTION
);


alter table LibraryBook auto_increment = 1000;
