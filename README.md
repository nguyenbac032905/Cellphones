# Cellphones – Hướng dẫn chạy dự án

Dự án gồm 2 phần: **backend** (Node.js + Express + MongoDB) và **frontend** (React + Vite).

## Yêu cầu

- [Node.js](https://nodejs.org/) (khuyến nghị bản LTS 20 trở lên)
- [Git](https://git-scm.com/)
- Tài khoản MongoDB Atlas, Cloudinary, GHN, VNPay sandbox, Gmail (xem Bước 3)

## Bước 1: Clone dự án về máy

```bash
git clone <link-repo-cua-ban>
cd Cellphones
```

## Bước 2: Cài thư viện (backend và frontend)

Mở 2 terminal, mỗi terminal chạy một phần:

```bash
# Terminal 1 - backend
cd backend
npm install
```

```bash
# Terminal 2 - frontend
cd frontend
npm install
```

## Bước 3: Tạo file `.env`

### Backend: tạo file `backend/.env`

```env
NODE_ENV=dev
PORT=3000

# MongoDB Atlas
MONGO_URL=

# Cloudinary (upload ảnh)
CLOUD_NAME=
CLOUD_KEY=
CLOUD_SECRET=

# JWT
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=30d
REGISTER_SECRET=
REGISTER_TOKEN_EXPIRES=30m

# Gmail gửi OTP (dùng App Password, không phải mật khẩu đăng nhập)
EMAIL_USER=
EMAIL_APP_PASS=

# Giao Hàng Nhanh (GHN)
GHN_TOKEN=
GHN_SHOP_ID=
GHN_BASE_URL=https://dev-online-gateway.ghn.vn/shiip/public-api

# VNPay sandbox
VNP_TMN_CODE=
VNP_HASH_SECRET=
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_RETURN_URL=http://localhost:3000/api/payment/return_payment_url
```

Điền các giá trị còn trống:

| Key | Lấy ở đâu |
| --- | --- |
| `MONGO_URL` | MongoDB Atlas → Connect → Drivers (nhớ thêm tên database `Cellphones` vào chuỗi kết nối) |
| `CLOUD_NAME`, `CLOUD_KEY`, `CLOUD_SECRET` | Cloudinary → Dashboard |
| `JWT_*`, `REGISTER_SECRET` | Tự đặt chuỗi bí mật bất kỳ (dài, khó đoán) |
| `EMAIL_USER`, `EMAIL_APP_PASS` | Gmail → Bảo mật → Bật xác minh 2 bước → Mật khẩu ứng dụng |
| `GHN_TOKEN`, `GHN_SHOP_ID` | Tài khoản GHN dev |
| `VNP_TMN_CODE`, `VNP_HASH_SECRET` | Email VNPay sandbox gửi khi đăng ký |

### Frontend: tạo file `frontend/.env`

```env
VITE_BACKEND_LOCAL=http://localhost:3000
VITE_BACKEND_URL=<link-backend-deploy-neu-co>
```

> ⚠️ Không commit file `.env` lên Git và không chia sẻ các key này cho người khác.

## Bước 4: Chạy dự án

```bash
# Terminal 1 - chạy backend (http://localhost:3000)
cd backend
npm run dev
```

```bash
# Terminal 2 - chạy frontend (http://localhost:5173)
cd frontend
npm run dev
```

Mở trình duyệt vào địa chỉ mà terminal frontend in ra (thường là `http://localhost:5173`).

## Lệnh hữu ích

| Lệnh | Thư mục | Công dụng |
| --- | --- | --- |
| `npm run dev` | backend / frontend | Chạy chế độ phát triển |
| `npm run build` | backend / frontend | Build bản production |
| `npm test` | backend | Chạy unit test |
| `npm run test:integration` | backend | Chạy integration test |
| `npm run lint` | frontend | Kiểm tra code |
