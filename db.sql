-- 데이터베이스 생성
CREATE DATABASE schedule_db;
USE schedule_db;

-- 일정 테이블 생성
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 고유 ID
    date DATE NOT NULL,                 -- 날짜 (YYYY-MM-DD)
    start_time TIME NOT NULL,            -- 시작 시간 (HH:MM:SS)
    end_time TIME NOT NULL,              -- 종료 시간 (HH:MM:SS)
    title VARCHAR(255) NOT NULL,         -- 일정 제목
    memo TEXT                            -- 메모 (선택 사항)
);
