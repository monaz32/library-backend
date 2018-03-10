CREATE TABLE Event (
eventID 	CHAR(8),
name 		CHAR(100),
branchNum 	CHAR(100) NOT NULL,
fromTime 	CHAR(100) NOT NULL,
fromDate	CHAR(100) NOT NULL,
toTime 		CHAR(100) NOT NULL,
toDate 		CHAR(100) NOT NULL,
PRIMARY KEY(eventID),
FOREIGN KEY (branchNum) REFERENCES LibraryBranch(branchNum)
	 ON DELETE NO ACTION
	 ON UPDATE CASCADE,
FOREIGN KEY (fromTime, toTime, fromDate, toDate)
REFERENCES TimePeriod (fromTime, toTime, fromDate, toDate)
);
