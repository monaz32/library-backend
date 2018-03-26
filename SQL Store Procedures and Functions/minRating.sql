DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `MinRating`() RETURNS varchar(13) CHARSET utf8
BEGIN
	declare book varchar(13);
    declare avg1 decimal;
    declare avg2 decimal;
    declare minisbn varchar(13);
    
    declare calc_finished int default 0;
    
	declare cur1 cursor for select isbn from book; 
    
    DECLARE CONTINUE HANDLER 
	FOR NOT FOUND SET calc_finished = 1;
    open cur1;
    
    set avg1 = 10;
    
	Min: loop
    
		fetch cur1 into book;
        
        if calc_finished = 1 then
			leave Min;
        end if;
        
        select AVG(rating) into avg2 from review where isbn = book;
        
        if avg2 <= avg1 then
			set avg1 = avg2;
            set minisbn = book;
		end if;
        
	end loop;
    
    close cur1;
RETURN minisbn;
END$$
DELIMITER ;
