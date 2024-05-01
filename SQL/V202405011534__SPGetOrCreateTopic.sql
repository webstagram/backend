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