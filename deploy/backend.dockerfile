FROM node:18-slim
ARG backend_port
WORKDIR /opt/itn-backend
# 
COPY package*.json ./
RUN npm ci --only production --omit dev
COPY . .
# 
EXPOSE $backend_port
CMD ["npm", "run-script", "start"]