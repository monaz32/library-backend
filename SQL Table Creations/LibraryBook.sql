CREATE TABLE LibraryBook(bookID varchar(100), 
isbn 		varchar(13) NOT NULL,
branchNum 	varchar(100) NOT NULL,
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
