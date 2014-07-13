drop database if exists Intead;
Create database if not exists Intead;

Use Intead;

Create table if not exists FormDefs
(
  Id Bigint Not Null Primary Key Auto_Increment,
  FormDef Varchar(128) Not Null,
  XmlStr Varchar(500) Not Null,
  CreatedAt TIMESTAMP DEFAULT NOW(),
  CreatedBy VARCHAR(100) DEFAULT 'Neetu'
);

Create table if not exists login
(
  loginId Bigint Not Null Primary Key Auto_Increment,
  EmailId Varchar(256) Not Null,
  Pwd Varchar(256) Not Null,
  Name Varchar(256) Not Null,
  CreatedAt TIMESTAMP DEFAULT NOW(),
  CreatedBy VARCHAR(100) DEFAULT 'Neetu'

 );
Insert into login(loginId,EmailId,Pwd,Name) values(1,'singh.rp@gmail.com','123','RP Singh');


