CREATE TABLE UserQuote(
    userr_id nvarchar(450) NOT NULL,
    quote_id int NOT NULL,
    PRIMARY KEY(userr_id, quote_id),
    FOREIGN KEY(userr_id) REFERENCES AspNetUsers(Id),
    FOREIGN KEY(quote_id) REFERENCES Quotess(quote_id)
)

