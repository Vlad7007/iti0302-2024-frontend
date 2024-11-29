# iti0302-2024-frontend

This is the frontend for the Inventory Juggler website. Project for the Web Application Development course (ITI0302) at TalTech.

## Prerequisites/requirements

- Node.js
- npm

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Build and Run Docker Containers

To build and run the Docker containers for this project, follow these steps:

1. **Build the Docker Image:**

   Ensure you have Docker installed and running on your system. Navigate to the root directory of the project and run the following command to build the Docker image:

   ```sh
   docker build -t your/docker-repository:frontend-latest .
   ```

   This command will create a Docker image using the Dockerfile located in the root directory.
   After that don't forget to push the image to dockerhub.

   ```sh
   docker push your/docker-repository:frontend-latest
   ```
2. **Run the Docker Container:**

   Make sure that you have a properly configured `docker-compose.yaml` file.
   It could look something like this:

   ```yaml
   services:
      frontend:
         image: your/docker-repository:frontend-latest
         container_name: your-frontend-name
         ports:
            - "3000:80"
         restart: unless-stopped
   ```

   After that, you can run the container using the following command:

   ```sh
   docker compose up
   ```

   This command will start the Docker container with the frontend.
   To look at it go, you can visit `http://localhost:3000` in your browser.
3. **Stop the Docker Container:**

   To stop the running container, you can use the following command:
   
   ```sh
   docker compose down
   ```

### Technology used

The following technologies are used in this project:

- Vue 3
- Vite
- Bootstrap 5
- Pinia
- Vue Router
- Axios
- Docker
- Nginx
