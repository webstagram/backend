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

CREATE PROCEDURE GetOrCreateTopic
    @TopicName VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @TopicId INT;

    SELECT @TopicId = TopicId FROM topics WHERE Name = @TopicName;

    IF @TopicId IS NULL
    BEGIN
        INSERT INTO topics (Name) VALUES (@TopicName);
        SET @TopicId = SCOPE_IDENTITY(); -- Get the last inserted identity value
    END

    SELECT @TopicId AS TopicId;
END