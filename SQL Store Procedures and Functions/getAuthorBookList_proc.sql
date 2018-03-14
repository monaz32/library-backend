DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAuthorBookList`(iauthor varchar(100))
BEGIN
	select title , genre from book where author = iauthor;
END$$
DELIMITER ;