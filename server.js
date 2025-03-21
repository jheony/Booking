const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL 연결 설정
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wlgus",
    database: "schedule_db"
});

db.connect(err => {
    if (err) {
        console.error("MySQL 연결 실패:", err);
        return;
    }
    console.log("MySQL 연결 성공!");
});

// 일정 추가 API
app.post("/addSchedule", (req, res) => {
    const { date, start_time, end_time, title, memo } = req.body;
    if (start_time >= end_time) {
        return res.status(400).json({ message: "종료 시간은 시작 시간보다 늦어야 합니다." });
    }

    const query = "INSERT INTO schedules (date, start_time, end_time, title, memo) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [date, start_time, end_time, title, memo], (err, result) => {
        if (err) {
            console.error("일정 추가 실패:", err);
            return res.status(500).json({ message: "DB 오류" });
        }
        res.json({ message: "일정 추가 성공!", id: result.insertId });
    });
});

// 일정 조회 API
app.get("/getSchedules", (req, res) => {
    const { date } = req.query;
    const query = "SELECT * FROM schedules WHERE date = ?";
    db.query(query, [date], (err, results) => {
        if (err) {
            console.error("일정 조회 실패:", err);
            return res.status(500).json({ message: "DB 오류" });
        }
        res.json(results);
    });
});

// 서버 실행
app.listen(3000, () => {
    console.log("서버 실행 중 (포트 3000)");
});
