CREATE procedure GetTrustedNeighborsByHomeId
@homeId int
as
select
       t.trustedNeighborId
     , t.userId
     , t.homeId
     , t.roleId as roleType
     , u.displayName
from dbo.trustedNeighbor t
join dbo.[user] u on t.userId = u.userId
where t.homeId = @homeId
go

