Create table Categories(
category_id int not null primary key,
category_name nvarchar(50)
);
insert into Categories values(0,'All');
insert into Categories values(1,'Anime');
insert into Categories values(2,'Death');
insert into Categories values(3,'Happiness');
insert into Categories values(4,'Inspiration');
insert into Categories values(5,'Love');
insert into Categories values(6,'Poetry');
insert into Categories values(7,'Romance');
insert into Categories values(8,'Science');
insert into Categories values(9,'Success');
insert into Categories values(10,'Time');
insert into Categories values(11,'Truth');

select * from Categories;
