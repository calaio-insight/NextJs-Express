﻿create procedure GetHomeItemsByHomeId
    @homeId int
as
select
       hi.homeItemId
     , hi.homeId
     , hi.itemName
     , hi.itemPhoto
     , hi.purchaseDate
     , hi.purchasePrice
     , hi.maintenanceDate
     , hi.maintenanceCost
     , hi.notes
     , hi.createdBy
     , hi.createdDate
     , hi.modifiedBy
     , hi.modifiedDate
from dbo.homeItem hi
where hi.homeid = @homeId
go

