CREATE PROCEDURE GetOrCreateUser
    @Name VARCHAR(39),
    @UserId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT @UserId = UserId FROM Users WHERE Name = @Name;

    IF @UserId IS NULL
    BEGIN
        INSERT INTO Users (Name) OUTPUT INSERTED.UserId INTO @UserId VALUES (@Name);
    END
	
    SELECT @UserId AS UserId;
END
GO

CREATE PROCEDURE GetOrCreateTopic
    @Name VARCHAR(25),
    @TopicId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT @TopicId = TopicId FROM Topics WHERE Name = @Name;

    IF @TopicId IS NULL
    BEGIN
        INSERT INTO Topics (Name) OUTPUT INSERTED.TopicId INTO @TopicId VALUES (@Name);
    END

    SELECT @TopicId AS TopicId;
END