# comment-that-movie

Simple REST Api which allows commenting on movies. It is using external movies resource at omdbapi.com

## Installation

You will need `node.js` with `npm` installed on your machine.

```
$ git clone git@github.com:vip1all/comment-that-movie.git
$ cd ./comment-that-movie
$ npm install
```

## Running

To run application you will need OMDB apikey, to get one head over [here](http://www.omdbapi.com/apikey.aspx). You will need that later.

#### With Heroku:
Create `.env` file in root folder and assign your **omdb apikey** to `OMDB_API_KEY` variable:

```
OMDB_API_KEY=YourApiKey
```

Then you can simply run:

```
$ heroku local
```

And your application should be running on localhost:3000 using memory database.

To run production verison you will need to add 2 variables to `.env`, `DATABASE_URL` which is connection string to PostgreSQL database and `NODE_ENV=production` which indicates that you want to run this application in production mode. Your `.env` file should look like:

```
NODE_ENV=production
OMDB_API_KEY=YourApiKey
DATABASE_URL=sqlite://:memory:
```

#### Without Heroku:
Same as when running with heroku you will need to setup some enviroment variables: `OMDB_API_KEY`, and for production `NODE_ENV=production` and `DATABASE_URL`. So run it like that:

```
$ OMDB_API_KEY=YourApiKey node src/server.js
```

#### Changing default port:
If you would like to change the default port of the application simply use enviroment variable `PORT`:
In `.env`: `PORT=1234` or when running from console `OMDB_API_KEY=YourApiKey PORT=1234 node src/server.js`.

## Testing

To run tests you will need to get omdb apikey, head over [here](http://www.omdbapi.com/apikey.aspx). After you get your key create `.env` file and put it here:

```
OMDB_API_KEY=YourApiKey
```

Then run tests:

```
npm test
```

Viola.

# REST Api
<table>
  <tr>
    <th>Path</th>
    <th>Method</th>
    <th>Options</th>
    <th>Description</th>
  </tr>
  <tr>
    <td rowspan=2>`/movies`</td>
    <td>GET</td>
    <td>
      <ul>
        <li>id - get movie by its id</li>
        <li>title - get movie by its titile</li>
        <li>limit - limit result to that number</li>
        <li>skip - skip first x results</li>
      </ul>
    </td>
    <td>
      <ul>
        <li><i>id</i> and <i>title</i> are exclusive, where <i>id</i> takes precedance.</li>
        <li>all options are optional, when id and title are omited returns multiple resources.</li>
        <li>when <i>id** or <i>title</i> is present then <i>limit</i> and <i>skip</i> has no effect.</li>
      </ul>
    </td>
  </tr>
</table>
