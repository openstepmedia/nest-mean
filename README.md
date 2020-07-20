# NestJS Tutorial Repository

Repository will be separated into `server` and `client` directory for **NestJS** backend and **Angular** frontend resepctively.

- [x] Server repository
- [x] Client repository
- [x] Docker support
- [x] Hook up Server and Client

## Server-side (NestJS)

This repository houses the Project's backend written using **NestJS**

See: https://github.com/openstepmedia/nest-mean/tree/master/server

## Client-side (Angular)

This repository houses the Project's frontend written using **Angular 6**

- **Ant Design**: The components design is by AntDesign (https://ng.ant.design/docs/introduce/en). I really like the subtle looks of AntDesign.
- **Steps**: `npm i` to install all the dependencies then just start the application with `ng serve`
- **Note**: Might be worth it to take a look at `proxy.conf.json` and how I setup the CLI to use the `proxy` file when serving so that we can call our backend on `localhost:3000`. This is so-called **Cross Domains Request** and our backend does not have CORS setup. Proxy will help us making the requests from `4200` to `3000`.

## Docker

Docker is supported.

- **Branch**: `docker`
- **Steps**: Just clone the repository, check out `docker` branch then from `root` directory, run `docker-compose up` and Docker will take over.
- **Note**: Angular application will be served by NGINX on `localhost`; Nest application will be running on `localhost:3000`; **cAdvisor** which monitors our containers will be running on `localhost:8080`. Again, it's worthwhile to explore the Dockerfile in both `client` and `server` directory; also `nginx.conf` and `docker-compose.yml` to get the gist of how Docker and Docker Compose work.
