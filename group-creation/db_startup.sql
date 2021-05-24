USE podcasts;

DROP TABLE dim_podcast_groups;
CREATE TABLE dim_podcast_groups (id_group BIGINT AUTO_INCREMENT, group_name TEXT, group_description TEXT, id_user BIGINT, created_at DATETIME, PRIMARY KEY (id_group));
INSERT INTO dim_podcast_groups (group_name, group_description, id_user, created_at) VALUES ('Tech policy', 'Intersection of emerging technology and policy', 5913, '2021-04-23 21:30:29');


SELECT * FROM dim_podcast_groups;
