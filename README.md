1. Cấu hình project
    1. npm create vite@latest để cài vite vào thư mục root
    2. Project name: frontend Framework: React Variant: TypeScript
    3. cài 1 số thư viện npm install react-router-dom, npm install antd, npm install tailwindcss @tailwindcss/vite
    4. Setup TailwindCSS cho Vite trong file vite.config.ts, import vào index.css
    5. tạo cấu trúc thư mục
2. Tạo giao diện cơ bản
    1. cài react-router-dom
    2. tạo layout client và admin
    3. tạo page dashboard và home
    4. tạo route dashboard và home
    5. tạo file rotes tổng
    6. nhúng routes vào app.tsx
    7. npm i express cors dotenv, npm i -D nodemon,typescript,ts-node-dev,@types/node,@types/express,@types/cors
    8. cau hinh thu muc
3. Kết nối mongoDb
    1.Thêm DATABASE_URL vào .env và tạo file database.config để kết nối để database,
    2. Cài mongoose-slug-updater và thêm file types cho nó vì thư viện này chưa hỗ trợ ts, khai báo nơi đọc types trong tsconfig 
    3. Tạo model Product và ProductCategory
    4. Thêm index cho Product và ProductCategory cho hợp lí
    5. call thử api
4. Dựng layout phía admin
    1. Nhúng layout mẫu của ant
    2. tách ra thành các components sidebar, header admin.
    3. bổ sung thanh tìm kiếm, block user và notifycation trênh header
5. Call Api bằng axios
    1.tạo file handle error
    2.Cấu hình axios instance và tạo interceptor cho privateClient và publicClient (handle error cho interceptor)
    3.Tạo service product để call api và trả về dữ liệu chuẩn
    4. Gọi service bên UI
6. Tạo giao diện trang products list admin
    1.Tạo admin product table: tạo biến column để chứa tên các cột, sử dụng render để render ra mã tsx nếu cần. sử dụng thuộc tính pagination bottomCenter để căn giữa pagination sử dụng rowSelected để tạo checkbox chọn row và trả về rowKey
    3.Tạo admin product Filter: sử dụng grid của tailwind để chia layout và responsive 
    4.Tạo admin product Toolbar: sử dụng grid của tailwind để chia layout và responsive 
    5.responsive cho table product, header admin