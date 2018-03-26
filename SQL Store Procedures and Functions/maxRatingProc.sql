DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `maxRatingProc`()
BEGIN
	set @maxRatingBook = maxRating();
    select * from book where isbn =  @maxRatingBook;
END$$
DELIMITER ;
