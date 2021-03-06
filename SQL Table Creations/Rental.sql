CREATE TABLE Rental(
				rentalID int auto_increment, 
				status tinyint NOT NULL,
				bookID int NOT NULL,
				accountID int NOT NULL,
				fromTime varchar(100) NOT NULL,
				toTime varchar(100) NOT NULL, 
				fromDate varchar(100) NOT NULL,
				toDate varchar(100) NOT NULL,
				returnTime varchar(100),
				returnDate varchar(100),
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

alter table rental auto_increment = 1000;