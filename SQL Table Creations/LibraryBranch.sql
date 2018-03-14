CREATE TABLE LibraryBranch (
	branchNum 	int,
	name		varchar(100),
	phoneNum 	varchar(100) NOT NULL,
	address	varchar(100) NOT NULL,
UNIQUE(phoneNum),
UNIQUE(address),
PRIMARY KEY (branchNum)
);

