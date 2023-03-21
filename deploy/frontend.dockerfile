# build stage
FROM node:18-slim
ARG backend_port
ENV VITE_BACKEND="http://localhost:${backend_port}"
WORKDIR /opt/itn-frontend
# 
COPY package*.json .
RUN npm ci --only dev
COPY . .
RUN npm run build
# 
# prod stage
FROM nginx:alpine-slim
COPY --from=0 /opt/itn-frontend/dist /usr/share/nginx/html