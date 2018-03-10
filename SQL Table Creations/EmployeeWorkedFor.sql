CREATE TABLE EmployeeWorkedFor 
	(eID			CHAR(100),
	 branchNum		CHAR(100),
	 fromDate 		CHAR(100),
	 toDate			CHAR(100),
	 fromTime		CHAR(100),
	 toTime			CHAR(100),
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

