\copy "Questions"(id,product_id,body,date_written,asker_name,asker_email,reported,helpful) FROM './csv_data/questions.csv' WITH CSV HEADER;
-- should equal 3518963
SELECT COUNT(*) FROM "Questions";

\copy "Answers"(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful) FROM './csv_data/answers.csv' WITH CSV HEADER;
-- should equal 6879306
SELECT COUNT(*) FROM "Answers";

\copy "Photos"(id,answer_id,url) FROM './csv_data/answers_photos.csv' WITH CSV HEADER;
-- should equal 2063759
SELECT COUNT(*) FROM "Photos";


-- select * from "Questions" where product_id = 1000011;