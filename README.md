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

   Ensure you have Docker installed on your system. Navigate to the root directory of the project and run the following command to build the Docker image:

   ```sh
   docker build -t inventory-juggler .
   ```

   This command will create a Docker image named `inventory-juggler` using the Dockerfile located in the root directory.

2. **Run the Docker Container:**

   Once the image is built, you can run it using the following command:

   ```sh
   docker run -p 8080:80 inventory-juggler
   ```

   This command will start a new container from the `inventory-juggler` image and map port 8080 on your host to port 80 in the container. You can access the application by navigating to `http://localhost:8080` in your web browser.

3. **Stop the Docker Container:**

   To stop the running container, first identify the container ID using:

   ```sh
   docker ps
   ```

   Then stop the container with:

   ```sh
   docker stop <container_id>
   ```

Replace `<container_id>` with the actual ID of the running container.

These steps will help you build and run the Docker containers for the Inventory Juggler project.

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
