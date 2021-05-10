USE podcasts;

DROP TABLE group_membership;
CREATE TABLE group_membership (id_membership BIGINT AUTO_INCREMENT, id_user BIGINT, id_group BIGINT, created_at DATETIME, PRIMARY KEY (id_membership));
INSERT INTO group_membership (id_membership, id_user, id_group, created_at) VALUES (1, 642, 73, '2021-04-11 20:52:49'); 
INSERT INTO group_membership (id_membership, id_user, id_group, created_at) VALUES (2, 642, 49, '2021-04-11 20:53:42');
INSERT INTO group_membership (id_membership, id_user, id_group, created_at) VALUES (3, 572, 73, '2021-04-11 20:53:57');


SELECT * FROM group_membership;
