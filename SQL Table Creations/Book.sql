CREATE TABLE Book 
	(isbn		CHAR(13),
	 title		CHAR(100),
	 author 	CHAR(100),
	 publisher	CHAR(100),
 PRIMARY KEY (isbn),
 UNIQUE (title, author));

