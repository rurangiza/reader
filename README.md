> [!Warning]
> This project is still in progress, so some informations might be missing below and will be filled in time. Hello

# Reader
Reader is a web app that facilitates active reading. The goal is to create a space that will help you interact with your book's content via annotations, connect ideas across-books and easily review them.

![Image by thewordlyhabitat](./docs/annotation_illustrated.jpg)

# Todo's
Scatfold
- [x] setup turborepo (w/Nextjs and Nestjs)
- [x] add CRUD operations for books with in-memory db (object)
- [x] run Postgres in container for local dev
- [x] access db with Prisma -> create database package
- [x] add authentication
- [x] create ui package that uses shadcn + tailwind
- [ ] create basic UI for login and book management
- [ ] connect frontend to api (ky + react query + openapi)
- [ ] improve error handling and [logging](https://betterstack.com/community/guides/logging/)

CI
- [ ] ensure linting, formating and tsc checks run on save, commit and push (husky, GH actions)
- [ ] add tests (Jest: unit, integration tests). 80%
- [ ] run tests on commit, push

CD
- [ ] setup and run test and prod database (ex: aws db.t3.micro)
- [ ] deploy backend + connect to db
- [ ] deploy frontend
- [ ] add monitoring (opentelemetry, prometheus, grafana)
- [ ] apply db migrations based on branching/merging strategy
- [ ] run terrafrom apply
- [ ] add manual approval for PROD deployments