# Thư mục src
Chứa toàn bộ source code dự án

## components
Chứa component nhỏ như header, footer, message....

## layout
Chứa layout của website có admin, client

## pages
Chứa các pages như là home, profile,... -> mỗi page được tạo thành từ nhiều component nhỏ 

## routes
Chứa router website
- pubicRoute: router không cần đăng nhập cũng vô được
- privateRoute: router cần đăng nhập mới vô được

mỗi component hoặc page có 1 file main.scss đi kèm để css cho component đó
component/GlobalStyle/main chứa css áp dụng cho toàn bộ website
component/GlobalStyle/mixin chứa biến css sử dụng lại nhiều lần
