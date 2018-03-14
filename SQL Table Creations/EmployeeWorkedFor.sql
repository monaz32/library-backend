CREATE TABLE EmployeeWorkedFor 
	(eID			int,
	 branchNum		int,
	 fromDate 		varchar(100),
	 toDate			varchar(100),
	 fromTime		varchar(100),
	 toTime			varchar(100),
 PRIMARY KEY (eID, branchNum, fromDate, toDate, fromTime, toTime),
 FOREIGN KEY (eID) REFERENCES Employee(eID)
 ON DELETE CASCADE
 ON UPDATE CASCADE,
 FOREIGN KEY (branchNum) REFERENCES Librarybranch(branchNum)
 ON DELETE NO ACTION
 ON UPDATE CASCADE,
FOREIGN KEY (fromTime, toTime, fromDate, toDate)
REFERENCES TimePeriod (fromTime, toTime, fromDate, toDate)
);

