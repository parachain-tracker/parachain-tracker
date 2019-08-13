# after the @ is the sha256 hash (in docker called the "digest") of the image,
# this is what identifies the version of the image being used, not the tag. to
# update this to a newer version, just `docker pull` the desired image to get
# the digest
FROM node:10.16.2-alphine@sha256:0d5abfc8ef9d0984010a05e234324e517620af096b8aeb2fabc841157ef2e676

# Create app directory
WORKDIR /paratracker

COPY . .

RUN npm install
RUN npm run build:api
RUN npm run db:migration:run

# Bundle app source

EXPOSE 3333

CMD [ "node", "/paratracker/dist/apps/api/main.js" ]
