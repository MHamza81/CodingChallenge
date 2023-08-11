import Server from './Server.js';

const port = Number(process.env.PORT || '4000');

const server = new Server();

const starter = async () => {
  try {
    await server.start(port);
    console.log(`Server running on port: ${port}`);
  } catch (error) {
    console.log(error);
  }
};

starter();
