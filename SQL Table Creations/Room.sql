CREATE TABLE Room (
		roomName		varCHAR(100),
		roomNumber		INT NOT NULL,
		branchNum 		int NOT NULL,
	 PRIMARY KEY (roomName),
	 FOREIGN KEY (branchNum) REFERENCES LibraryBranch(branchNum)
	 ON DELETE NO ACTION
	 ON UPDATE CASCADE);