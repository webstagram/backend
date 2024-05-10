CREATE TABLE [Tags] (
  [TagId] INT IDENTITY(1,1) PRIMARY KEY,
  [UserId] INT,
  [WebId] INT,
  FOREIGN KEY ([UserId]) REFERENCES Users([UserId]),
  FOREIGN KEY ([WebId]) REFERENCES Webs([WebId])
);
