
###### 1) IF YOU ARE ON MAC YOU NEED TO CHANGE THE LINE TERMINATION FROM \r\n to \n #####
###### To do this you need to find \r\n and replace with \n ##############
###### 2) YOU NEED TO CHANGE THE PATHWAY TO YOUR LOCAL DRIVE WHERE THE CSV'S ARE STORED #####
###### To do this you need to find *****MY_PATH and REPLACE ALL with your path ########
###### example path for : C:/Users/Nancy Wu/library-backend/Data #####

CREATE TABLE Book 
	(isbn		varchar(13),
	 title		varchar(100),
	 author 	varchar(100),
	 publisher	varchar(100),
	 genre		varchar(100),
 PRIMARY KEY (isbn),
 UNIQUE (title, author));
 
 CREATE TABLE TimePeriod 
	(fromTime	VARCHAR(100),
	 toTime	VARCHAR(100),
	 fromDate 	VARCHAR(100),
	 toDate		VARCHAR(100),
 PRIMARY KEY (fromTime, toTime, fromDate, toDate));

CREATE TABLE LibraryBranch (
	branchNum 	int,
	name		varchar(100),
	phoneNum 	varchar(100) NOT NULL,
	address	varchar(100) NOT NULL,
UNIQUE(phoneNum),
UNIQUE(address),
PRIMARY KEY (branchNum)
);

CREATE TABLE Members(
	accountID		int auto_increment,
	phoneNum		varchar(100),
	email 			varchar(100) NOT NULL,
	name			varchar(100),
	fines			DECIMAL,
	UNIQUE(email),
	PRIMARY KEY(accountID)
);

alter table members auto_increment = 1000;

CREATE TABLE Employee 
	(eID			int auto_increment,
	 eEmail		varchar(100),
	 SIN 			varchar(9),
	 ename		varchar(100),
	 eAddress		varchar(100),
	 ePhoneNumber	varchar(100),
 	 branchNum		int NOT NULL,
 	 adminstatus	tinyint,
 PRIMARY KEY (eID),
 foreign KEY (branchNum) REFERENCES librarybranch(branchNum)
 ON DELETE no action
 ON UPDATE CASCADE,
UNIQUE (ename, ePhoneNumber),
UNIQUE (eEmail),
UNIQUE (SIN));

alter table employee auto_increment = 100000;

CREATE TABLE LibraryBook(bookID int auto_increment, 
isbn 		varchar(13) NOT NULL,
branchNum 	int NOT NULL,
status		tinyint NOT NULL,
PRIMARY KEY (bookID), 
FOREIGN KEY (isbn) REFERENCES Book(isbn)
ON UPDATE CASCADE
ON DELETE CASCADE, 
FOREIGN KEY (branchNum) REFERENCES LibraryBranch(branchNum)
ON UPDATE CASCADE
ON DELETE NO ACTION
);


alter table LibraryBook auto_increment = 1000;

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

CREATE TABLE Event (
eventID 	int auto_increment,
name 		varchar(100),
branchNum 	int NOT NULL,
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

alter table Event auto_increment = 1000;

CREATE TABLE Review(
accountID INT,
isbn varCHAR(13), 
rating INT,
review varCHAR(255), 
PRIMARY KEY (accountID, isbn), 
FOREIGN KEY (accountID) REFERENCES Members(accountID) 
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY (isbn) REFERENCES Book(isbn)
ON UPDATE CASCADE
ON DELETE CASCADE
);

CREATE TABLE Room (
		roomName		varCHAR(100),
		roomNumber		INT NOT NULL,
		branchNum 		int NOT NULL,
	 PRIMARY KEY (roomName),
	 FOREIGN KEY (branchNum) REFERENCES LibraryBranch(branchNum)
	 ON DELETE NO ACTION
	 ON UPDATE CASCADE);


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

LOAD DATA LOCAL INFILE '*****MY_PATH/BookData.csv' 
INTO TABLE Book 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/TimePeriodData.csv' 
INTO TABLE timeperiod
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/LibraryBranchData.csv' 
INTO TABLE librarybranch 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/MembersData.csv' 
INTO TABLE members
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/EmployeeData.csv' 
INTO TABLE employee 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/LibraryBookData.csv' 
INTO TABLE librarybook 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/RentalData.csv' 
INTO TABLE rental
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/ReviewData.csv' 
INTO TABLE review
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/RoomData.csv' 
INTO TABLE room 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/EmployeeWorkedForData.csv' 
INTO TABLE employeeworkedfor
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '*****MY_PATH/SchedulesData.csv' 
INTO TABLE schedules
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

