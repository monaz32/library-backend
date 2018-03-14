DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getGenreBookList`(igenre varchar(100))
BEGIN
	select * from book where genre = igenre;
END$$
DELIMITER ;
