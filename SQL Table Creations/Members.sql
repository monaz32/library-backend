
CREATE TABLE Members(
	accountID		CHAR(100),
	phoneNum		CHAR(100),
	email 			CHAR(100) NOT NULL,
	name			CHAR(100),
	fines			DECIMAL,
	UNIQUE(email),
	PRIMARY KEY(accountID)
);
