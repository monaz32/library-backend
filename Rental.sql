CREATE TABLE Rental(
				rentalID CHAR(100), 
				status CHAR(100) NOT NULL,
				bookID CHAR(100) NOT NULL,
				accountID CHAR(100) NOT NULL,
				fromTime CHAR(100) NOT NULL,
				toTime CHAR(100) NOT NULL, 
				fromDate CHAR(100) NOT NULL,
				toDate CHAR(100) NOT NULL,
				returnTime CHAR(100),
				returnDate CHAR(100),
				PRIMARY KEY (rentalID),
				FOREIGN KEY (bookID) REFERENCES LibraryBook (bookID)
ON UPDATE CASCADE
ON DELETE CASCADE,
				FOREIGN KEY (accountID) REFERENCES Members (accountID)
ON UPDATE CASCADE
ON DELETE CASCADE,	
				FOREIGN KEY (fromTime, toTime, fromDate, toDate)
REFERENCES TimePeriod (fromTime, toTime, fromDate, toDate)
);
