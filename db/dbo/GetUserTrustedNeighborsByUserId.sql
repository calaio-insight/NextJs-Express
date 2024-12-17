CREATE procedure GetUserTrustedNeighborsByUserId
    @userId int
as
select
       utn.userTrustedNeighborId
     , utn.userId
     , utn.trustedUserId
     , u.displayName
     , u.photoUrl
     , u.email
from dbo.userTrustedNeighbor utn
join dbo.[user] u on u.userId = utn.trustedUserId
where utn.userId = @userId
go

