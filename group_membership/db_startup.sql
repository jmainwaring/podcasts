CREATE TABLE group_membership (new_membership_id BIGINT AUTO_INCREMENT, user_id BIGINT, group_id BIGINT, ts DATETIME, PRIMARY KEY (new_membership_id));
INSERT INTO group_membership (new_membership_id, user_id, group_id, ts) VALUES (1, 642, 73, '2021-04-11 20:52:49'); 
INSERT INTO group_membership (new_membership_id, user_id, group_id, ts) VALUES (2, 642, 49, '2021-04-11 20:53:42');
INSERT INTO group_membership (new_membership_id, user_id, group_id, ts) VALUES (3, 572, 73, '2021-04-11 20:53:57');