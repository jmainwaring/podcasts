USE podcasts;

-- New record for each membership that currently exists
DROP TABLE IF EXISTS dim_group_membership;
CREATE TABLE IF NOT EXISTS dim_group_membership (id_membership BIGINT AUTO_INCREMENT, id_user BIGINT, id_group BIGINT, created_at DATETIME, PRIMARY KEY (id_membership));
INSERT INTO dim_group_membership (id_membership, id_user, id_group, created_at) VALUES (1, 642, 73, '2021-04-11 20:52:49'); 
INSERT INTO dim_group_membership (id_membership, id_user, id_group, created_at) VALUES (2, 642, 49, '2021-04-11 20:53:42');
INSERT INTO dim_group_membership (id_membership, id_user, id_group, created_at) VALUES (3, 572, 73, '2021-04-11 20:53:57');


-- Fact table for any time somebody's membership state is altered,  which includes joining or leaving a group
DROP TABLE IF EXISTS  fct_membership_events
CREATE TABLE IF NOT EXISTS fct_membership_events (id_membership_event BIGINT AUTO_INCREMENT, id_user BIGINT, action_type VARCHAR, id_group BIGINT, created_at DATETIME, PRIMARY KEY (id_membership_event));

SELECT * FROM dim_group_membership;
