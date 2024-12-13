CREATE procedure InsertUserTrustedNeighbor
@userId int
, @trustedUserId int
, @newId int OUTPUT
as
begin
    begin transaction;

    insert into dbo.userTrustedNeighbor (userId, trustedUserId, createdBy, createdDate, modifiedBy, modifiedDate)
    values (
             @userId
           , @trustedUserId
           , @userId
           , GETDATE()
           , @userId
           , GETDATE())

    select @newId = SCOPE_IDENTITY();

    commit transaction;
end
go

