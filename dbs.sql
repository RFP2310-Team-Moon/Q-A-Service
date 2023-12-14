
CREATE TABLE IF NOT EXISTS Questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name VARCHAR NOT NULL,
  asker_email VARCHAR NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INTEGER
);

-- will this create the correct index?
CREATE INDEX idx_product_id ON "Questions"(product_id);

CREATE TABLE Answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES Questions(id),
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR NOT NULL,
  answerer_email VARCHAR NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INTEGER
);

CREATE INDEX idx_question_id ON "Answers"(question_id);

CREATE TABLE IF NOT EXISTS Photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER NOT NULL REFERENCES Answers(id),
  url VARCHAR(400) NOT NULL
)

CREATE INDEX idx_answer_id ON "Photos"(answer_id);

\copy "Questions"(id,product_id,body,date_written,asker_name,asker_email,reported,helpful) FROM './csv_data/questions.csv' WITH CSV HEADER;
-- \copy "Questions"(id,product_id,body,date_written,asker_name,asker_email,reported,helpful) FROM './data/questions.csv' WITH CSV HEADER;
-- should equal 3518963
SELECT COUNT(*) FROM "Questions";

\copy "Answers"(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful) FROM './csv_data/answers.csv' WITH CSV HEADER;
-- \copy "Answers"(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful) FROM './data/answers.csv' WITH CSV HEADER;
-- should equal 6879306
SELECT COUNT(*) FROM "Answers";

\copy "Photos"(id,answer_id,url) FROM './csv_data/answers_photos.csv' WITH CSV HEADER;
-- should equal 2063759
SELECT COUNT(*) FROM "Photos";

-- command that converts ts values to 'proper' UTC
alter table "Answers" alter column date_written TYPE TEXT USING TO_CHAR(TO_TIMESTAMP(date_written / 1000) AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');

alter table "Questions" alter column date_written TYPE TEXT USING TO_CHAR(TO_TIMESTAMP(date_written / 1000) AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');

-- this resets the sequence to the correct ID on insert for POST requests
ALTER SEQUENCE "Questions_id_seq" RESTART WITH 3518964;
SELECT * FROM "Questions_id_seq";
ALTER SEQUENCE "Answers_id_seq" RESTART WITH 6879307;
SELECT * FROM "Answers_id_seq";
ALTER SEQUENCE "Photos_id_seq" RESTART WITH 2063760;
SELECT * FROM "Photos_id_seq";

-- select * from "Questions" where product_id = 1000011;