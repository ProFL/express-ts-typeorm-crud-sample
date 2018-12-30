# TypeScript <3 + Express.js + TypeORM + SQLite simple CRUD project

A simple project to serve as a starting point or sample for a REST API built from the [express-generator](https://expressjs.com/en/starter/generator.html) ([ejs](https://ejs.co/) as view engine), ported to [TypeScript](https://www.typescriptlang.org/) and with elements of the initial template of [TypeORM](http://typeorm.io/#/), modified for [SQLite](https://www.sqlite.org/index.html) to make the project self contained.

To run this project, use `npm start`, to debug it with [nodemon](https://nodemon.io/) use `npm run debug`

The CRUD routes are based on: localhost:3000/users

To create the project the following steps were used:

0) First, `npm i -g express-generator typeorm typescript tslint ts-node`

1) Typed in a terminal `express -e express-crud`, which generated a Express.js project template with ejs as view engine.

1) Then, all JS files where changed to .ts, and the command `tsc --init` was run to create the *tsconfig.json* file.

1) Changes were made on *package.json* to reflect that new structure. (mostly to the start script, and typescript was added as a dependency)

1) Then the command `tslint -i` was run to initialize the *tslint.json* file, it was also added as a dependency using `npm i --save-dev tslint`

1) All source files were then checked to match the recommended tslint rules and mostly import formats were updated.

1) To insert CRUD functionality typeorm was added as a dependency and given its tight coupling to ts-node, the project was adapted to use it as well. On this proccess nodemon was very useful as per configured in the nodemon.json file, strongly inspired in [this](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change) StackOverflow's question answers.

1) Using `typeorm init` the project's *ormconfig.json* file was generated as well as *entity/User.ts*, the *ormconfig.json* file was also modified to use SQLit instead of MySQL to make this project self contained.

1) The *services/database-handler.ts* file was created to wrap database access methods, also the CRUD routes were created in *routes/users.ts* accordance to the REST model (although with no authentication). The database connection call (singleton instantiation) was also called on *app.ts.*

1) After all that was done... Yay, happy day! Quick sample project ready to be open for public usage :)
