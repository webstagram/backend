CREATE PROCEDURE GetOrCreateUser
    @UserName VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @UserId INT;

    SELECT @UserId = UserId FROM Users WHERE Name = @UserName;

    IF @UserId IS NULL
    BEGIN
        INSERT INTO Users (Name) VALUES (@UserName);
        SET @UserId = SCOPE_IDENTITY(); -- Get the last inserted identity value
    END

    SELECT @UserId AS UserId;
END