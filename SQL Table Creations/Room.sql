CREATE TABLE Room (
		roomName		CHAR(100),
		roomNumber		INTEGER(100) NOT NULL,
		branchNum 		CHAR(100) NOT NULL,
	 PRIMARY KEY (roomName),
	 FOREIGN KEY (branchNum) REFERENCES LibraryBranch(branchNum)
	 ON DELETE NO ACTION
	 ON UPDATE CASCADE);