CREATE TABLE Schedules(
				accountID int,
				roomName varchar(100),
				fromTime varchar(100),
				toTime varchar(100),
				fromDate varchar(100),
				toDate varchar(100),
PRIMARY KEY(accountID, roomName, fromTime, toTime, fromDate, toDate), 
FOREIGN KEY(accountID) REFERENCES Members (accountID)
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY(roomName) REFERENCES Room(roomName)
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY (fromTime, toTime, fromDate, toDate)
REFERENCES TimePeriod (fromTime, toTime, fromDate, toDate)
);