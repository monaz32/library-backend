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
END