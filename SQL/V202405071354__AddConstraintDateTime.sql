ALTER TABLE [Posts]
ADD CONSTRAINT [DF_Posts_TimeCreated] DEFAULT (GETDATE()) FOR [TimeCreated];