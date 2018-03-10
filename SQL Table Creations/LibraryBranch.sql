CREATE TABLE LibraryBranch (
	branchNum 	CHAR(100),
	name		CHAR(100),
	phoneNum 	CHAR(100) NOT NULL,
	address	CHAR(100) NOT NULL,
UNIQUE(phoneNum),
UNIQUE(address),
PRIMARY KEY (branchNum)
);

