DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLibraryBookList`()
BEGIN
	select * from librarybook;
END$$
DELIMITER ;
