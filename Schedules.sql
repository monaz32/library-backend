CREATE TABLE Schedules(
				accountID CHAR(100),
				roomName CHAR(100),
				fromTime CHAR(100),
				toTime CHAR(100),
				fromDate CHAR(100),
				toDate CHAR(100),
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