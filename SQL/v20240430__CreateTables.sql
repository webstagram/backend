CREATE TABLE [Users] (
  [UserId] int,
  [Name] varchar,
  PRIMARY KEY ([UserId])
);

CREATE TABLE [Webs] (
  [WebId] int,
  [Name] varchar,
  [UserId] int,
  PRIMARY KEY ([WebId])
  FOREIGN KEY ([UserId]) REFERENCES [Users]([UserId])
);

CREATE TABLE [Topics] (
  [TopicId] int,
  [Name] varchar,
  PRIMARY KEY ([TopicId])
);

CREATE TABLE [Posts] (
  [PostId] int,
  [Caption] varchar,
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
  [Path] varchar,
  PRIMARY KEY ([ImageId])
  FOREIGN KEY ([PostId]) REFERENCES [Posts]([PostId])
);
