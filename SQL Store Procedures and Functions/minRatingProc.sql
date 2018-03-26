DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `minRatingProc`()
BEGIN
	set @minRatingBook = minRating();
    select * from book where isbn = @minRatingBook;
END$$
DELIMITER ;
