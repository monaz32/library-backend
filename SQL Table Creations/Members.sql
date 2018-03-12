
CREATE TABLE Members(
	accountID		varchar(100),
	phoneNum		varchar(100),
	email 			varchar(100) NOT NULL,
	name			varchar(100),
	fines			DECIMAL,
	UNIQUE(email),
	PRIMARY KEY(accountID)
);
