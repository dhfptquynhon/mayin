# Hướng dẫn Deploy lên GitHub Pages

## Vấn đề đã sửa:
✅ Đã cập nhật homepage trong `package.json` từ `tuandtvt88.github.io` thành `dhfptquynhon-create.github.io`

## Các bước để deploy:

### 1. Xóa build cũ (nếu có)
```bash
rm -rf build
```
Hoặc trên Windows PowerShell:
```powershell
Remove-Item -Recurse -Force build
```

### 2. Build lại project với homepage mới
```bash
npm run build
```

### 3. Kiểm tra build có đúng không
Mở file `build/index.html` và kiểm tra các đường dẫn có bắt đầu bằng `/DevicePrinter/` không.

### 4. Deploy lên GitHub Pages
```bash
npm run deploy
```

Lệnh này sẽ:
- Tự động chạy `predeploy` (build lại)
- Deploy thư mục `build` lên nhánh `gh-pages` của repository

### 5. Kiểm tra trên GitHub
1. Vào repository: https://github.com/dhfptquynhon-create/DevicePrinter
2. Vào Settings > Pages
3. Đảm bảo Source là `gh-pages` branch
4. Đợi vài phút để GitHub Pages cập nhật

### 6. Truy cập trang web
Sau khi deploy xong, truy cập:
https://dhfptquynhon-create.github.io/DevicePrinter/

---

## Lưu ý:
- Nếu vẫn không hiển thị đúng, có thể cần xóa cache trình duyệt (Ctrl + Shift + Delete)
- Đảm bảo repository là public
- Kiểm tra nhánh `gh-pages` có tồn tại và có file `index.html` không

