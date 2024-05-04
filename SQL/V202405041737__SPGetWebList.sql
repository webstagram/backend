DROP PROCEDURE IF EXISTS GetWebsWithTopics;
GO
CREATE PROCEDURE GetWebsWithTopics
AS
BEGIN
    SELECT 
        w.WebId,
        w.[Name] as WebName,
        u.[Name] as UserName,
        MAX(p.TimeCreated) AS MostRecentPost,
        STRING_AGG(t.[Name], ', ') WITHIN GROUP (ORDER BY t.[Name]) AS Topics
    FROM 
        Webs w
    INNER JOIN 
        Users u ON w.UserId = u.UserId
    LEFT JOIN 
        Posts p ON w.WebId = p.WebId
    LEFT JOIN 
        Topics t ON p.TopicId = t.TopicId
    GROUP BY 
        w.WebId, w.[Name], u.[Name]
    ORDER BY 
        MostRecentPost DESC;
END;
