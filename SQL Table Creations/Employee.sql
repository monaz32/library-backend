CREATE TABLE Employee 
	(eID			int auto_increment,
	 eEmail		varchar(100),
	 SIN 			varchar(9),
	 ename		varchar(100),
	 eAddress		varchar(100),
	 ePhoneNumber	varchar(100),
 	 branchNum		int NOT NULL,
 	 adminstatus	tinyint, 
 	 password		varchar(100),			
 PRIMARY KEY (eID),
 foreign KEY (branchNum) REFERENCES librarybranch(branchNum)
 ON DELETE no action
 ON UPDATE CASCADE,
UNIQUE (ename, ePhoneNumber),
UNIQUE (eEmail),
UNIQUE (SIN));

alter table employee auto_increment = 100000;
