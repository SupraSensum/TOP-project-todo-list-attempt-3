# TOP-project-todo-list

## To do

- [x] Each `todo` should be an object; use classes; need to refactor current implementation
- [x] Give each `todo` the following properties:
  - [x] title
  - [x] description
  - [x] dueDate
  - [x] priority
  - [x] notes
  - [x] checklist
  - [x] projects
  - [x] completed
- [x] CLI should be able to do the following for each task
  - [x] create
  - [x] read
  - [x] update
  - [x] delete
- [x] Todo app should open to a default `project`
- [x] Separate application logic into modules
- [ ] User interface should be able to:
  - [ ] View all projects
  - [ ] View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
  - [ ] Expand a single todo to see/edit its details
  - [ ] Delete a todo
- [ ] Use other npm libraries, like
  - [ ] [date-fns](https://github.com/date-fns/date-fns) for formatting and manipulating dates and times
- [ ] Persistent storage
  - [ ] `localStorage`
  - [ ] app should check first if `localStorage` is available and prompt user to load it
- [ ] Improve validation
  - [ ] needs to happen before changes are made (e.g. a property is modified)
  - [ ] remove redundant #validate() calls, ocurring both in the setters and the constructor

## What are we trying to show off here?

- [ ] classes
- [ ] ES6 modules
  - [ ] import
  - [ ] export
  - [ ] default
- [ ] npm
  - [ ] basic CI/CD w/ npm scripts
  - [ ] bundling w/ webpack
    - [ ] prod vs dev modes
    - [ ] asset management
- [ ] json
- [ ] oop principles
- [ ] deploying to `gh-pages`

## How to contribute

### Current Best Practice to Keep `gh-pages` up to date with `main`

_Make sure to read the [npm scripts](https://github.com/SupraSensum/TOP-project-restaurant-menu/blob/main/package.json) themselves so you're not flying blind_

1. Commit your work on `main`. I like to use this npm script to do it all in one shot:
    ```
    npm run addCommitPush
    ```
1. Checkout `gh-pages` and merge `main`
    ```
    git checkout gh-pages && git merge main --no-edit
    ```
1. Run this script that will:
    1. Bundle into `dist`
    1. Add, commit && push just `dist` into `gh-pages`
    ```
    npm run deployPages
    ```

## Random
- Jump to [around 3h40m](https://youtube.com/live/MtU0hqes5do?feature=share) for a funny bit. I get stoked that something worked, Humi starts shorting hooray. Sadly, can't hear her hilarious "hooray".