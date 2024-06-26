CREATE TABLE [Likes] (
	[LikeId] INT IDENTITY(1,1) PRIMARY KEY,
	[WebId] INT NOT NULL,
	[UserId] INT NOT NULL,
	FOREIGN KEY ([WebId]) REFERENCES Webs([WebId]),
	FOREIGN KEY ([UserId]) REFERENCES Users([UserId])
);