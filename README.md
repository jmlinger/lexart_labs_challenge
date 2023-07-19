<h1 align="center">FinChat</h1>
<br>

# Description
A chat bot app developed in Next.js and Node.js that gives financial information.
<br>
<br>

# Development Stacks

<div>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-339933?style=for-the-badge&logo=typescript&color=black" />
  </a>
   <a href="https://pt-br.reactjs.org/docs/getting-started.html">
    <img src="https://img.shields.io/badge/React-339933?style=for-the-badge&logo=react&color=black" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/next.js-339933?style=for-the-badge&logo=next.js&color=black" />
  </a>
    <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/tailwindcss-339933?style=for-the-badge&logo=tailwindcss&color=black" />
  </a>
    <a href="https://docs.npmjs.com/">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&color=black" />
  </a>
    <a href="https://www.fastify.io/">
    <img src="https://img.shields.io/badge/fastify-339933?style=for-the-badge&logo=fastify&color=black" /> 
  </a>
    <a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/prisma-339933?style=for-the-badge&logo=prisma&color=black" /> 
  </a>
    <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/postgresql-339933?style=for-the-badge&logo=postgresql&color=black" />
  </a>
</div>
<br>

# Instructions

To initiate the conversation just enter a phrase that contains the words: hello, good or i want.

After login enter a phrase that contains the word 'loan'.

To close the conversation just say 'goodbye' or 'bye'.

A few seconds after the bot's farewell message, you will be redirect to a page that you can generate and download a file that contains conversations of all users.

<br>

*IMPORTANT: The bot could take long to answer when you start the conversation. Just wait a litte!

This could happen because the server that the api is hosted disables it when its inactive for a few time.

<br>

# Deployed application

Access the app on Vercel clicking <a target="_blanck" href="https://deliciousfood.vercel.app/">here<a/>.

<br>

# Running the application locally
### Running Server

```bash

# Install dependencies
$ npm install

## Creates env file

- DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
	
# Run the application
$ npm run start

# the server app will run at port:3333 - access <http://localhost:3333>
```

### Running Web

```bash

# Install dependencies
$ npm install
	
# Run the application
$ npm run start

# the web app will run at port:3000 - access <http://localhost:3000>
```

<br>

## Server Application Funcionalities

<div align=right>
	<h4>V 1.0</h4>

</div>

Login Route (/login):
- [x] POST.

Answer Route (/answer):
- [x] POST.

Conversation Route (/conversation):
- [x] GET.
- [x] POST.

<br>
      
## WEB Application Funcionalities

<div align=right>
	<h4>V 1.0</h4>

</div>

Home Page (/):
- [x] Chat bot.

Historic Page (/historic):
- [x] Generate historic conversations.

<br>

## Status

<h3> 
	🚧  Finished Project 🚧
</h3>
