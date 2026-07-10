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
24. clean controller categories, auth, upload, recycle-bin và validate cho auth, recycle-bin
25. thêm global, login rate limit và security middleware
    1. tạo global rateLimiterMiddleware để rateLimit tổng, mỗi người có tối đa 300 request trong 15p
    2. tạo loginLimiterMiddleware, mỗi người được phép login sai 5 lần trong 15p
    3. sử dụng helmet() trong index.ts để thêm bảo mật cho header, hpp để chuẩn hóa query, sử dụng globalRateLimiter
    4. sử dụng loginRateLimiter trong auth route
26. bổ sung ratelimit cho register,upload, ratelimit size file. validate cho query product
    1. rate limit cho register, upload, force delete
    2. rate limit size file <1mb và giới hạn loại file có thể upload là jpeg, png, webp
    3. bổ sung validattion cho query
27. triển khai anti xss phía backend
    1. tạo hàm sanitizeHTMLS để whitelisst cho các thẻ được phép chứa trong desc,content
    2.  sử dụng để lọc desc,content trước khi lưu vào db
28. triển khai anti xss phía frontend
    1. tạo sanitizeHTMLs để xóa các tag, attribute nguy hiểm
    2. bọc sanitize trước khi dùng dangerouslySetInnerHTML
    3. không cần sanitize form trước khi submit vì tiny-mce đã tự làm rồi
29. Tối ưu query phía backend
    1. sử dụng toán tử $project để lấy những trường cần thiết, loại bỏ những trường nặng như desc, content
    2. chuyển mảng images thành chỉ lấy ra mainImage
    3. chỉ lấy ra _id và title của category
    4. tạo type productItemList bên frontend
    5. sửa lại phía giao diện hiển thị đúng mainImage
30. sửa lại toán tử để tối ưu query
    1. đầu tiên phải search trước vì đây là toán tử lọc rất mạnh, tiếp theo là đến match
    2. phải để sort trước skip và limit vì nếu sort sau thì chỉ sort được 1 số sản phẩm đã limit thôi
    3. tiếp theo là skip và limit để giảm số sản phẩm.
    4. tiếp theo mới đến lookup để join lấy category, rồi mới sử dụng $project để chọn các trường trả về cho db
    5. phải để count bên ngoài nhánh products vì products trả về {products: []} đã lọc rồi, không phải tổng số products trong sản phẩm
31. triển khai test unit cho products service, xong getProducts
    1. npm i -D jest @types/jest ts-jest và sửa lệnh test thì chạy "jest" và thêm "test:watch": "jest --watch". thêm type "jest" vào ts.config
    2. tạo file product.service.test
    3. mock model Product vì mình có gọi db trong service, mock aggregate vì có gọi đến hàm đó để truyền pipeline vào
    4. sử dụng hàm beforeEach để mặc định xóa đi những mock cũ trước khi test, và tạo hàm allowDiskUse trong aggregate và fake dữ liệu trả về cho nó dạng {products: [], total: [{count}: 10]}
    5. tạo test search vì nó là (test business rule). có 2 test case là truyền search vào query thì phải có toán tử search trong pipeline và khi không truyền search thì không có toán tử search trong pipeline.
    5. tạo test filter vì nó là (test business rule). test case 1 là khi truyền status, stock, category vào query thì phải build đúng $match, ở đây phải mock getAllCategoryChildIds vì nó gọi đến db. test case 2 là test nhánh logic của stock, khi truyền stock=outofstock thì phải filter stock=0 (test Branch Coverage). test case 3 là default lấy ra những sản phẩm deleted= false
    6. tạo test sort vì nó là (test business rule). test case 1 mình sẽ test tất cả các nhánh logic switch case của sort bằng test.each (test Branch Coverage). test case mình sẽ test default là position giảm dần khi không truyền vào query.
    7. tạo test pagination vì nó là (test business rule). test case 1 mình sẽ test truyền page và limit vào thì có toán tử skip, limit tương ứng. test case 2 mình là default, không truyền vào query thì sẽ lấy skip=0 và limit=4.
    8. tạo test thứ tự toán tử trong pipeline (test structural rule). ở đây mình sẽ test xem các toán tử có đúng thứ tự để tối ưu query không.
    9. tạo test return value chuẩn (test output). test case 1 là service phải trả về đúng dạng {data: [], meta: {}}.test case 2 khi total trả về rỗng thì total và total page = 0 (Test edge case). case 3: test bắt buộc phải gọi allowDiskUse vì nếu không gọi sẽ có nguy cơ tràn Ram.
32. xong test unit product service
33. xong test unit auth service
33. xong test unit auth middleware
34. xong test unit validate middleware
35. xong test unit errorHandler middleware
36. viết test cho createTree và recycleBin.service
37. cấu hình test integration và triển khai test integration cho products
    1. cài các package cần thiết: supertest, @types/supertest, mongodb-memory-server. tạo file jest.integration.config.js và thêm vào include trong `tsconfig` để TypeScript đọc được file config này
    2. tách riêng app.ts và index.ts để khi test chỉ import app, tránh chạy server thật
    3. tạo file setup để cấu hình database ảo (mongodb-memory-server), gồm các hàm connect DB, clear DB sau mỗi test và close DB sau khi test xong
    4. tạo auth.helper để tự động đăng ký/login và trả về accessToken dùng cho các API cần authentication
    5. tạo file integration test cho products. trước khi test sẽ connect DB và lấy accessToken, sau mỗi test sẽ clear DB và cuối cùng close DB. integration test sẽ kiểm tra toàn bộ flow thật của hệ thống: route -> middleware -> controller -> service -> MongoDB
38. viết test integration cho auth (còn test E2E sẽ để tới khi làm payment sẽ giá trị hơn)
39. tạo file request logging và error logging ở môi trường production
    1. npm i pino pino-http
    2. tạo file config cho request và error logging
    3. tạo middleware request và error logging
    4. (phần audit logging mình sẽ làm sau)
40. làm giao diện trang role list
41. làm tính năng tạo mới role
42. làm tính năng chi tiết và cập nhật role
43. làm tính năng xóa role
44. triển khai authorization bên backend
    1. sửa lại authMiddleware lấy ra cả perrmission và gán vào req.user, thêm bắt lỗi cho AppError mà khi check role không tồn tại ném ra phía trên.
    2. mở rộng type cho express để req.user không bị lỗi, khai báo ts-node {files: true } để đọc toàn bộ file .d.ts
    3. tạo permissionMiddleware để check role
    4. tạo file const permission bên backend để tạo enum tránh điền nhầm permission và cũng sử dụng nó để check validate bằng zod
    5. sử dụng phân quyền trong route
45. triển khai authorization bên frontent
    1. populate lấy ra cả permission vào trong thông tin user khi đăng nhập và đăng kí
    2. sửa lại authMiddleware lấy ra user kèm permission
    3. sửa lại type user bên backend, frontend chứa cả permission
    4. tạo use perrmission để lấy ra danh sách quyền của người dùng
    5. tạo permission route để xác minh có được vào route đó không
    6. bọc permission route vào các route
    7. xác mình quyền để hiển thị ui tương ứng
    8. tạo trang forbidden
46. làm giao diện danh sách user và các tính năng lọc, phân trang
47. xong tính năng tạo mới user
48. xong tính năng chi tiết, sửa, xóa user
