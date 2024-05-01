CREATE TABLE [Users] (
  [UserId] INT IDENTITY(1,1) PRIMARY KEY,
  [Name] VARCHAR(39)
);

CREATE TABLE [Webs] (
  [WebId] INT IDENTITY(1,1) PRIMARY KEY,
  [Name] VARCHAR(25),
  [UserId] INT,
  FOREIGN KEY ([UserId]) REFERENCES Users
);

CREATE TABLE [Topics] (
  [TopicId] INT IDENTITY(1,1) PRIMARY KEY,
  [Name] VARCHAR(25)
);

CREATE TABLE [Posts] (
  [PostId] BIGINT IDENTITY(1,1) PRIMARY KEY,
  [Caption] VARCHAR(255),
  [TopicId] INT,
  [TimeCreated] DATETIME,
  [WebId] INT,
  FOREIGN KEY ([TopicId]) REFERENCES Topics([TopicId]),
  FOREIGN KEY ([WebId]) REFERENCES Webs([WebId])
);

CREATE TABLE [Images] (
  [ImageId] BIGINT IDENTITY(1,1) PRIMARY KEY,
  [PostId] BIGINT,
  [Path] VARCHAR(255),
  FOREIGN KEY ([PostId]) REFERENCES Posts([PostId])
);