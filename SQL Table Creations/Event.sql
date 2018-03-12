CREATE TABLE Event (
eventID 	varchar(8),
name 		varchar(100),
branchNum 	varchar(100) NOT NULL,
fromTime 	varchar(100) NOT NULL,
fromDate	varchar(100) NOT NULL,
toTime 		varchar(100) NOT NULL,
toDate 		varchar(100) NOT NULL,
PRIMARY KEY(eventID),
FOREIGN KEY (branchNum) REFERENCES LibraryBranch(branchNum)
	 ON DELETE NO ACTION
	 ON UPDATE CASCADE,
FOREIGN KEY (fromTime, toTime, fromDate, toDate)
REFERENCES TimePeriod (fromTime, toTime, fromDate, toDate)
);
