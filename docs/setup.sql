# create database
create or replace database agora;

# use database
use agora;

# create users table
create or replace table users(
    id char(36) not null primary key,
    type tinyint(2) not null,
    username varchar(64) not null unique,
    password varchar(255) not null,
    filename varchar(64) null,
    createdAt timestamp not null default current_timestamp(),
    updatedAt timestamp not null default current_timestamp() on update current_timestamp()
);

# create posts table
create or replace table posts(
    id char(36) not null primary key,
    userId char(36) not null,
    content text null,
    filename varchar(64) null,
    createdAt timestamp not null default current_timestamp(),
    updatedAt timestamp not null default current_timestamp() on update current_timestamp(),
    foreign key (userId) references users(id) on delete cascade
);

create or replace index userId on posts (userId);

# create comments table
create or replace table comments(
    id char(36) not null primary key,
    userId char(36) not null,
    postId char(36) not null,
    content text not null,
    createdAt timestamp not null default current_timestamp(),
    updatedAt timestamp not null default current_timestamp() on update current_timestamp(),
    foreign key (userId) references users(id) on delete cascade,
    foreign key (postId) references posts(id) on delete cascade
);

create or replace index postId on comments (postId);
create or replace index userId on comments (userId);

# create reactions table
create or replace table reactions(
    userId char(36) not null,
    postId char(36) not null,
    type tinyint not null,
    createdAt timestamp not null default current_timestamp(),
    updatedAt timestamp not null default current_timestamp() on update current_timestamp(),
    primary key (userId, postId),
    foreign key (userId) references users(id) on delete cascade,
    foreign key (postId) references posts(id) on delete cascade
);

create or replace index userId on reactions (userId);
create or replace index postId on reactions (postId);
