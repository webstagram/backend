ALTER TABLE users
ADD ProfileImageUrl VARCHAR(255);
GO;

DROP PROCEDURE IF EXISTS GetOrCreateUser;
GO;

CREATE PROCEDURE GetOrCreateUser
    @UserName VARCHAR(39),
    @ProfileImageUrl VARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @UserId INT;

    SELECT @UserId = UserId FROM Users WHERE Name = @UserName;

    IF @UserId IS NULL
    BEGIN
        INSERT INTO Users (Name, ProfileImageUrl) VALUES (@UserName, @ProfileImageUrl);
        SET @UserId = SCOPE_IDENTITY(); -- Get the last inserted identity value
    END

    SELECT @UserId AS UserId;
END
