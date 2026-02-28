# ========================================
# STAGE 1: Build Stage
# ========================================
FROM node:20-alpine AS builder

# Cài đặt pnpm
RUN npm install -g pnpm@8.15.0

# Set working directory
WORKDIR /app

# Copy package files trước để tận dụng Docker cache
COPY package.json pnpm-lock.yaml ./

# Cài đặt dependencies
RUN pnpm install

# Copy toàn bộ source code
COPY . .

# Build ứng dụng
RUN pnpm run build

# ========================================
# STAGE 2: Production Stage
# ========================================
FROM node:20-alpine AS production

# Cài đặt serve để phục vụ static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built assets từ builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Chạy serve với SPA mode (-s)
CMD ["serve", "-s", "dist", "-l", "3000"]