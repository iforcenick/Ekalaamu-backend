FROM  node:10.15.0

# set the deafult working directory
WORKDIR /ekalaamu

# copy package.json or pa
COPY package*.json ./


RUN npm install
# copy all files to the image
COPY . .

#Expose port
EXPOSE ${PORT}

#start app
CMD npm run dev

