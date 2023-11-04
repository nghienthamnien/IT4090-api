# IT4090-api

Group3_IT4090_HUST_20231

Môi trường:
    NodeJS: ^20.5.1
    MySQL: ^8.1.0
        download MySQL server: https://dev.mysql.com/downloads/mysql/

Hướng dẫn cài đặt dự án:
    B1: clone project
    B2: Mở terminal và cài đặt các dependecy bằng lệnh: npm i
    B3: Config dự án:
        - Trong thư mục gốc của dự án, tìm tệp .env.example và sao chép nó thành một tệp mới tên .env
        - Mở tệp .env và cấu hình các biến môi trường (thay thế các biến DATABASE_USER, DATABASE_PASSWORDDATABASE_NAME,DATABASE_HOST,DATABASE_PORT để config MySQL)
    B3: Mở terminal và init database bằng lệnh: npm run migrate:up
    B4: Chạy dự án bằng lệnh: npm run dev
        url: "http://localhost:8080/api/v1"
        swagger: "http://localhost:8080/api-docs/"

Cấu trúc thư mục: (chủ yếu code trong thư mục src)
    my-nodejs-project/
    ├── .husky/            (Lint code khi commit)
    ├── db/
        ├───migration      (Thư mục cập nhật cấu trúc database)
        ├───seeder         (Thư mục chứa một số dữ liệu cơ bản sẽ được insert vào database)
    ├── logs/              (Logger)
    ├── node_modules/      (Thư mục chứa các phụ thuộc của dự án)
    ├── package.json       (Tệp định nghĩa các phụ thuộc và cấu hình dự án)
    ├── package-lock.json  (Tệp chứa thông tin cụ thể về phiên bản của các phụ thuộc)
    ├── .env               (Tệp chứa các biến môi trường nhạy cảm, không được đưa lên kho lưu trữ)
    ├── README.md          (Tài liệu hướng dẫn và mô tả dự án)
    ├── src
        ├───config
        ├───constant
        ├───controller
        │   ├───admin
        │   └───customer
        ├───docs
        ├───helper
        ├───middleware     (Thư mục chứa các middleware)
        ├───model          (Thư mục chứa các tệp định nghĩa model)
        │   ├───mongodb
        │   └───mysql
        ├───routes         (Thư mục chứa các tệp định tuyến)
        │   ├───admin
        │   └───customer
        ├───service        (Thư mục chứa các service)
        │   ├───admin
        │   └───customer
        ├───util
        ├───validation     (Thư mục chứa các validation)
        └───app.js
