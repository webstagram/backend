DROP PROCEDURE IF EXISTS GetWebsWithTopics;
GO
CREATE PROCEDURE GetWebsWithTopics
    @userIdParam INT
AS
BEGIN
    SELECT 
        w.WebId,
        w.[Name] AS WebName,
        u.[Name] AS UserName,
        u.ProfileImageUrl,
        MAX(p.TimeCreated) AS MostRecentPost,
        STRING_AGG(t.[Name], ', ') WITHIN GROUP (ORDER BY t.[Name]) AS Topics,
        COUNT(l.LikeId) AS LikeCount,
        CASE WHEN COUNT(l2.UserId) > 0 THEN 1 ELSE 0 END AS LikeStatus
    FROM 
        Webs w
    INNER JOIN 
        Users u ON w.UserId = u.UserId
    LEFT JOIN 
        Posts p ON w.WebId = p.WebId
    LEFT JOIN 
        Topics t ON p.TopicId = t.TopicId
    LEFT JOIN 
        Likes l ON w.WebId = l.WebId
    LEFT JOIN 
        Likes l2 ON (w.WebId = l2.WebId AND l2.UserId = @userIdParam)
    GROUP BY 
        w.WebId, w.[Name], u.[Name], u.ProfileImageUrl
    ORDER BY 
        MostRecentPost DESC;
END;
