# Sử dụng Node.js để build ứng dụng React
FROM node:16-alpine AS build

# Set thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng Nginx để phục vụ ứng dụng React
FROM nginx:stable-alpine

# Copy file cấu hình Nginx
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy file build của React sang thư mục được phục vụ bởi Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose cổng 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
