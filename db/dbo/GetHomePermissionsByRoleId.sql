﻿CREATE procedure GetHomePermissionsByRoleId
    @homeRoleId int
as
select
       h.homePermissionId
     , hp.homePermissionName
from dbo.homeRolePermission h
join dbo.homePermission hp on hp.homePermissionId = h.homePermissionId
where h.homeRoleId = @homeRoleId
go

