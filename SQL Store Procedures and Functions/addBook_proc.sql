DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addBook`(isbn varchar(13), title varchar(100), author varchar(100),
publisher varchar(100), genre varchar(100))
BEGIN
	insert into book 
    values (isbn,title,author,publisher,genre);
END$$
DELIMITER ;
