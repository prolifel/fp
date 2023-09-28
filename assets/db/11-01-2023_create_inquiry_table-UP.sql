create table inquiry (
    id int not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    phone varchar(255) not null,
    address varchar(255) not null,
    postalcode varchar(255) not null,
    city varchar(255) not null,
    items text not null,
    admin varchar(255) not null,
    links text not null,
    photo varchar(255) not null,
    created_at datetime not null,
    primary key (id)
);