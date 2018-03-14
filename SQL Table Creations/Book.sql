CREATE TABLE Book 
	(isbn		varchar(13),
	 title		varchar(100),
	 author 	varchar(100),
	 publisher	varchar(100),
	 genre		varchar(100),
 PRIMARY KEY (isbn),
 UNIQUE (title, author));

# This is a book

