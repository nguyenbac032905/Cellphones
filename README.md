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
7. Làm tính năng filter, sort, search, pagination
    1. Tạo useAdminProductQuery để tạo query và hàm updatequerry và gọi hook đó bên productPage để truyền vào useProducts để callAPI.
    và bên backend sẽ nhận được các query đó.
    2. filter: tạo 1 biết match để thêm nhưng field status, stock và điều kiện của nó. category thì cần lấy ra những thằng con của danh mục đó rồi tìm tât cả sản phẩm trong các danh mục đó, sau đó mới thêm vào match.
    3. Sort: tạo sortOption và sử dụng switch để xử lí các trường hợp sắp xếp
    4. Search: mình cần đánh index search cho slug, title để tìm kiếm tốt hơn trên mongo atlas, sau đó tạo toán tử $search để tìm
    5. sau đó mình sẽ push vào pipeline theo thứ  tự search rồi mới đến match (thỏa mãn điều kiện), rồi mới đến lookup(join bảng),unwind (vì bảng trả về mảng nên phải tách thành object),set(dùng để thay đổi các trường) rồi mới đến sort và facet ( dùng để tạo 2 luồng query cùng lúc, 1 cái lấy ra products và 1 cái dùng để đếm số sản phẩm). cuối cùng gọi đến hàm agregate và truyền pipeline vào
    6. Pagination: sử dụng pagination sẵn của ant và bắt sự kiện change để thay đổi query
8. làm tính năng thay đổi trạng thái sản phẩm
    1. tạo class AppError để chuẩn hóa lỗi, tạo route,controller, service patch, kiểm tra type của productID, sử dụng whitelist sercurity
    2. thêm type patchProduct, tạo hook update product, tạo service update, bắt sự kiện onchange cho switch để gọi đến hook cập nhật lại trạng thái
    3. nhúng message của ant để tạo thông báo
9. tính năng thay đổi vị trí sản phẩm
    1. bắt sự kiện onblur cho ô input position, khi người dùng click ra ngoài thì sẽ update lại vị trí sản phẩm nếu nó thay đổi
    2. thêm disable cho ô input khi người dùng gửi lên
    3. thêm các thông báo
10. Tính năng bulk actions
    1. tạo api delete bên backend
    2. tạo service delete bên frontend
    3. tạo hook delete bên frontend
    4. bắt sự kiện khi người dùng tích chọn dòng thì lấy ra từng row để lấy ra ids sản phẩm cần cập nhật
    5. khi người dùng click apply trên toolbar thì cập nhật lại tất cả sản phẩm bằng promise.all
    6. vấn đề gặp phải là khi cập nhật xong chọn refetch mà hook không chạy lại làm dữ liệu không đổi.
11. làm trang chi tiết sản phẩm
    1. tạo api get product
    2. tách riêng component loading và custom alert vào shared
    3. tạo service call api và tạo hook call service, không cần throw error trong hook vì đã xử lí UI rồi.
    4. tạo page detail product bên frontend
12. làm giao diện trang tạo mới sản phẩm
13. làm tính năng tạo mới sản phẩm và upload ảnh
    1. cài multer để upload file và cloudinary để upload file lên cloud
    3. tạo middleware upload ảnh, khai báo thêm kiểu file và files cho express.d.ts vì express không hiểu kiểu req.file của multer gắn vào.
    4. tạo api upload ảnh, cho nó chạy qua middleware uploadCloud và trả về key dạng {url: ""}
    5. tạo api upload product 
    6. tạo service post product, và hook tương ứng
    7. set action cho Upload của ant, khi người dùng chọn file sẽ post ảnh lên api đó
    7. khi người dùng chọn file thì hàm onChange được kích hoạt, hàm này nhận được filelist và kiểm tra xem có ảnh nào không upload được không (do cloudinary free chỉ cho phép upload ảnh <10mb). lọc qua từng phần tử của filelist và lấy ra url, id của upload.
    8. tạo itemsRender cho upload để hiển thị tag ảnh main, khi người dùng click vào 1 ảnh thì sẽ chạy đến hàm selectMain và set lại state mainImageId là ảnh vừa chọn.
    9. khi submit mình chạy qua các phần tử của filelist và chuẩn hóa nó về dạng lưu trong db. gọi đến hàm createProdut và gửi dữ liệu lên. sau khi gửi xong nếu có product trả về thì reset lại form và thông báo tạo thành công
