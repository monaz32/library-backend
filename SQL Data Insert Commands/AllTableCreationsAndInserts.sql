
###### 1) IF YOU ARE ON MAC YOU NEED TO CHANGE THE LINE TERMINATION FROM \r\n to \n #####
###### To do this you need to find \r\n and replace with \n ##############
###### 2) YOU NEED TO CHANGE THE PATHWAY TO YOUR LOCAL DRIVE WHERE THE CSV'S ARE STORED #####
###### To do this you need to find ****MYPATH and REPLACE ALL with your path ########
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
    password		varchar(100),
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
     password		varchar(100),
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

delimiter //
create trigger schedule_no_overlap before insert on schedules
for each row
begin
  if exists (select * from schedules
			 where roomName=new.roomName
             and str_to_date(concat(fromTime, ' ', fromDate), '%H:%i %m/%d/%Y') <= str_to_date((concat(new.toTime, ' ', new.toDate)), '%H:%i %m/%d/%Y')
             and   str_to_date(concat(toTime, ' ', toDate), '%H:%i %m/%d/%Y')     >= str_to_date((concat(new.fromTime, ' ', new.fromDate)), '%H:%i %m/%d/%Y')) then
		signal sqlstate '45000' SET MESSAGE_TEXT = 'Overlaps with existing data';
  end if;
end; //

delimiter ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `calcFines`()
BEGIN
	declare totalfines decimal;
    declare rentaltodate varchar(100);
    declare dayslate int;
    declare memberid varchar(100);
    declare calc_finished int default 0;
    
    declare cur1 cursor for select M.fines, R.toDate, M.accountID 
    from members M, rental R
    where M.accountID = R.accountID and R.status = 0;
    
    DECLARE CONTINUE HANDLER 
	FOR NOT FOUND SET calc_finished = 1;
    open cur1;
    
    addfines: loop
    
		fetch cur1 into totalfines, rentaltoDate, memberid;
        
        if calc_finished = 1 then
			leave addfines;
        end if;
        
		set dayslate = Datediff (current_date(), STR_TO_DATE(rentaltodate, '%m/%d/%Y'));   
        
        if dayslate > 0 then
			set totalfines = totalfines + 1;
		end if;
        
        update members
        set fines = totalfines
        where accountid = memberid;
        
	end loop;
    
    close cur1;
END $$
delimiter ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Division`()
BEGIN
	CREATE TABLE isbnlist (isbn varchar(13));

    CREATE TABLE branchlist (branchNum int,isbn varchar(13));

    
    
    insert into isbnlist 
    select distinct isbn from librarybook;
    
    insert into branchlist
    select branchNum,isbn from librarybook;
    
SELECT DISTINCT branchNum
  FROM branchlist AS PS1 
  WHERE NOT EXISTS
       (SELECT *
          FROM isbnlist
         WHERE NOT EXISTS
               (SELECT *
                  FROM branchlist AS PS2
                 WHERE (PS1.branchNum = PS2.branchNum)
                   AND (PS2.isbn = isbnlist.isbn)));
	  drop table isbnlist;
	drop table branchlist;
    
END$$
delimiter ;

CREATE TRIGGER libraryBookStatusTrigger AFTER UPDATE ON rental
FOR EACH ROW
  UPDATE libraryBook
     SET status = 1
   WHERE bookID = NEW.bookID;

LOAD DATA LOCAL INFILE '****MYPATH/BookData.csv' 
INTO TABLE Book 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/TimePeriodData.csv' 
INTO TABLE timeperiod
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/LibraryBranchData.csv' 
INTO TABLE librarybranch 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/MembersData.csv' 
INTO TABLE members
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/EmployeeData.csv' 
INTO TABLE employee 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/LibraryBookData.csv' 
INTO TABLE librarybook 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/RentalData.csv' 
INTO TABLE rental
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/ReviewData.csv' 
INTO TABLE review
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/RoomData.csv' 
INTO TABLE room 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/EmployeeWorkedForData.csv' 
INTO TABLE employeeworkedfor
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/SchedulesData.csv' 
INTO TABLE schedules
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '****MYPATH/EventData.csv' 
INTO TABLE event
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

