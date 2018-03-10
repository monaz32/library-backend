CREATE TABLE Employee 
	(eID			CHAR(100),
	 eEmail		CHAR(100),
	 SIN 			CHAR(9),
	 ename		CHAR(100),
	 eAddress		CHAR(100),
	 ePhoneNumber	CHAR(100),
 	 branchNum		CHAR(100) NOT NULL,
 PRIMARY KEY (eID),
 foreign KEY (branchNum) REFERENCES librarybranch(branchNum)
 ON DELETE no action
 ON UPDATE CASCADE,
UNIQUE (ename, ePhoneNumber),
UNIQUE (eEmail),
UNIQUE (SIN));
