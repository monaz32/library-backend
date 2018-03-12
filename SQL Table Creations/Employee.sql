CREATE TABLE Employee 
	(eID			varchar(100),
	 eEmail		varchar(100),
	 SIN 			varchar(9),
	 ename		varchar(100),
	 eAddress		varchar(100),
	 ePhoneNumber	varchar(100),
 	 branchNum		varchar(100) NOT NULL,
 PRIMARY KEY (eID),
 foreign KEY (branchNum) REFERENCES librarybranch(branchNum)
 ON DELETE no action
 ON UPDATE CASCADE,
UNIQUE (ename, ePhoneNumber),
UNIQUE (eEmail),
UNIQUE (SIN));
