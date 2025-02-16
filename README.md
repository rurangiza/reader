> [!Warning]
> This project is still in progress, so some informations might be missing below and will be filled in time.

# Reading
Reader is a web app that facilitates active reading. The goal is to create a space that will help you interact with your book's content via annotations, connect ideas across-books and easily review them.

![Image by thewordlyhabitat](./docs/annotation_illustrated.jpg)

# Try it

Here is how to run the app locally:
1. Install and run [docker](https://www.docker.com/get-started/)
2. Clone this repo and cd into it
```
git clone git@github.com:rurangiza/reader.git
cd reader
```
3. Rename the `.env.example` file to `.env` and add your Neo4j `username` and `password`
4. In the `app/` folder, rename the `.env.example` to `.env` and if needed, modify the `API_ENDPOINT` (Not necessary)
4. In the `api/` folder, rename the `config.example` file to `config.yml` and:
- add your [OpenAI API key](https://platform.openai.com/docs/quickstart)
- set your Neo4j `username` and `password`, can be anything
- the rest can stay as is, but feel free to customize
5. Run `make`

> N.B: to see what's in your db, visit `localhost:7888`. But if you changed the`NEO4J_HOST_HTTP_PORT` in the `.env` file, than use that port instead: `localhost:<your_port>`

# How it works
I built this app for two reasons:
1. Because I need it
2. To learn. That's why I'm sharing the code and documenting it. Hopefully it will help and start dicussions.

> diagrams coming up
