const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Foydalanuvchini JSON faylga saqlash
app.post("/save-user", (req, res) => {
    const filePath = path.join(__dirname, "users.json");

    // Eski ma’lumotlarni o‘qish
    fs.readFile(filePath, "utf8", (err, data) => {
        let users = [];
        if (!err && data) {
            users = JSON.parse(data);
        }

        users.push(req.body);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Xatolik yuz berdi" });
            }
            res.json({ message: "Foydalanuvchi saqlandi!" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishga tushdi`);
});
