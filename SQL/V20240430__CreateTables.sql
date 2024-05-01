CREATE TABLE [Users] (
  [UserId] int,
  [Name] varchar(50),
  PRIMARY KEY ([UserId])
);

CREATE TABLE [Webs] (
  [WebId] int,
  [Name] varchar(25),
  [UserId] int,
  PRIMARY KEY ([WebId])
  FOREIGN KEY ([UserId]) REFERENCES [Users]([UserId])
);

CREATE TABLE [Topics] (
  [TopicId] int,
  [Name] varchar(25),
  PRIMARY KEY ([TopicId])
);

CREATE TABLE [Posts] (
  [PostId] int,
  [Caption] varchar(255),
  [TopicId] int,
  [TimeCreated] DateTime,
  [WebId] int,
  PRIMARY KEY ([PostId]),
  FOREIGN KEY ([TopicId]) REFERENCES [Topics]([TopicId]),
  FOREIGN KEY ([WebId]) REFERENCES [Webs]([WebId])
);

CREATE TABLE [Images] (
  [ImageId] int,
  [PostId] int,
  [Path] varchar(255),
  PRIMARY KEY ([ImageId])
  FOREIGN KEY ([PostId]) REFERENCES [Posts]([PostId])
);
