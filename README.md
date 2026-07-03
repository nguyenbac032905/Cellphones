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
14. làm tính năng sửa sản phẩm ( tương tự tạo mới sản phẩm )
15. làm tính năng thùng rác
    1. tạo api product deleted bên backend
    2. tạo service, type, hook cho api đó
    3. tạo giao diện trang thùng rác và gọi hook và đổ data ra
    4. tạo api product restore bên backend
    5. tạo service, type, hook cho api đó
    6. bắt sự kiện cho nút restore và xử lí thông báo lỗi,thành công, call api
    7. tạo api force delete product bên backend
    8. tạo service, type, hook cho api đó
    9. bắt sự kiện cho nút force delete và xử lí thông báo lỗi,thành công, call api
16. Tính năng đăng nhập, đăng kí admin, auth bằng accessToken và refreshToken
    1. tạo model user, sửa cấu hình cors có credentials: true để client có thể gửi cookie lên
    2. tạo các hàm generate accesstoken và refreshToken trong utils/jwt, khi gọi thì sẽ truyền vào payload và hàm sẽ sign bằng payload và secret key.
    3. tạo route register, controller register, service register. khi người dùng gửi thông tin lên thì bên service sẽ tạo tài khoản mới, tạo access token và refresh token và lưu refreshToken vào db. sau đó trả lại res cho controller, controller sẽ lưu refreshToken vào trong cookie với httpOnly, và trả về cho client {message, accessToken, user}
    4. tạo api login tương tự register
    5. tạo route refresh-token, khi client gọi đến route này thì controller sẽ gửi refreshToken trong cookie sang service(phải cải thư viện cookie-parse để đọc được cookie trong req). bên service sẽ decoded refreshToken, nếu refreshToken hết hạn hoặc sai thì nó sẽ ném ra lỗi 401, service sẽ gọi đến user có userID mình đã decoded ra và generateAccessToken mới và trả về cho controller.controller trả {accessToken} về cho client.
    6. tạo authMiddleware cho nhưng route private, ở đây sẽ check xem những request của người dùng có gửi accessToken lên không (tức là đã đăng nhập chưa) và nó có đúng không bằng cách verify accessToken và secretKey. nếu lỗi thì ném ra lỗi 401 tương ứng.
    7. Bên Frontend sẽ cài react-redux và redux tool kit để quản lí state auth
    8. tạo store.ts để để lưu state tổng. tạo authSlice để cấu hình state auth bao gồm state, các hàm reducers(clearAuth và setAuth). bọc Provider bên ngoài App để dùng store cho cả app.
    9. tạo privateClient để cấu hình instance private cho axios. mỗi request sẽ lấy ra accessToken trong store và gửi kèm lên headers. 
    10. mỗi response trả về sẽ bắt lỗi, nếu là lỗi 401(Unauthorization) thì sẽ kiểm tra xem request này đã gửi yêu cầu tạo accessToken mới chưa, nếu chưa thì call đến api /admin/api/auth/refresh-token để yêu cầu tạo accessToken mới, nếu mà server tạo thành công và trả về thì mình sẽ lưu lại accessToken mới vào state và gọi lại request bị lỗi với accessToken mới. còn nếu server không trả về accessToken mới tức là refreshToken đã hết hạn nên mình sẽ clearAuth đi và redirect về trang login để người dùng đăng nhập, từ đó tạo refreshToken mới.
    11. xử lí vấn đề nhiều request A,B,C cung lúc gây ra tạo nhiều accessTOken lại bằng cách tạo hàng đợi, mỗi response lỗi trả về sẽ check xem request A đó có yêu cầu tạo mới chưa, nếu có rồi thì sẽ đẩy vào hàng đợi, khi nào reqquest A tạo mới accessToken xong sẽ trả về cho từng request BCD và gọi lại các request đó với accessToken mới.
    12. tạo service login và hook login, route auth 
    13. tạo trang login, bắt sự kiện cho nút login, khi người dùng đăng nhập sẽ call hook login và gửi lên email, mật khẩu và nhận data trả về, gọi đến hàm dispatch để gửi action lên (tạo app/hooks để tạo hàm dispatch vì dùng typescript).
    14. tạo AminPrivateRoute để bọc những route private vào.
    15. sửa lại các service products, products category bên admin phải dùng privateClient.
    17. luồng tổng: Người dùng đăng nhập => server trả về accessToken và lưu refreshToken vào HTTP Only Cookie => mỗi request client sẽ gửi kèm accessToken => server verify token, nếu hợp lệ thì xử lí request, nếu hết hạn sẽ trả 401 Unauthorized => client tự động gọi API refresh-token để lấy accessToken mới và retry request cũ => nếu refreshToken hết hạn thì logout và chuyển về trang login.
    16. vấn đề đặt ra là khi F5 trang web sẽ xóa state auth đi và bị đẩy ra login dù token chưa hết hạn.
17. Xử lí vấn đề f5 sẽ xóa state auth đi và bị đẩy ra login
    1. viết api /auth/me để trả về thông tin user 
    2. tạo bootstrap auth, hàm này sẽ chạy mỗi khi reload trang. trong hàm này sẽ gọi đến hàm refresh-token để lấy accessToken mới, dùng accessToken đó để gọi đến /auth/me để lấy thông tin user. sau đó setStateAuth bằng user và accessToken đó.
    3. nhúng hàm vào main.tsx
19. validate backend bằng zod
    1. tạo file product.validation và createProductSchema, updateProductSchema
    2. tạo file validate middleware để đọc schema validate
    3. nhúng vào route
    4. xử lí bên create product, khi upload ảnh phải custom request để có thể gửi lên accessToken trong header
20. validate frontend bàng zod
    1. tạo product.validation và createProductSchema, updateProductSchema
    2. sửa lại type của PostProductBody và PatchProductBody bằng infer type của zod cho đồng bộ type
    3. parse  dữ liệu trước khi gửi gọi service post,patch. khi lỗi thì chuyển lỗi sang format của ant bằng cách tạo hàm zodToAntFormErrors. sau đó truyền lỗi vào form.
21. chuẩn hóa response product bên backend và xử lí bên frontend
    1. sửa lại service bên backend trả về dữ liệu chỉ gồm các raw key {data, meta,message}
    2. sửa lại controller, bổ sung thêm status success mỗi khi trả dữ liệu về
    3. sửa lại type của product response
    4. sửa lại service chỉ trả về raw data
    5. sửa lại hook actions create, update, delete không cần trả về data,error nữa, và bỏ try catch vì chỉ cần try catch ở UI và xử lí dựa vào success và message trả về thôi
    6. sửa lại hook fetch như products, product detail trả về đúng key products chứ không để raw nữa
    7. sửa lại các file giao diện tương ứng
22. chuẩn hóa response cho productcategory, auth, upload
23. chuẩn hóa lỗi phía backend, validate cả params bằng zod cho productID, clean controller và service products
    1. Sửa lại App Error để nhận cả chi tiết error nữa
    2. tạo middleware errorHandler để xử lí lỗi khi người dùng truyền next(error) và nhúng vào cuối của index.ts
    3. tạo asyncHandler để bọc controller, tự động throw lỗi mà mình không cần try catch cho các controller
    4. sửa lại product.validation, tạo thêm schema để validate productID, sửa validateMiddleware giúp validate cả params và query, truyền các schema validate tương ứng vào route
    5. clean controller và service products
