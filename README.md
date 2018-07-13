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
    <td rowspan="2"><code>/movies<code></td>
    <td>GET</td>
    <td>
      <ul>
        <li><code>id</code></li>
        <li><code>title</code></li>
        <li><code>limit</code></li>
        <li><code>skip</code></li>
      </ul>
    </td>
    <td>
      <ul>
        <li>
          You can get movie by its <i>id</i> or <i>title</i>.
          <i>id</i> and <i>title</i> are exclusive, where <i>id</i> takes precedance.
        </li>
        <li>all options are optional, when id and title are omited returns multiple values.</li>
        <li>Use <i>limit</i> to limit result to specified number.</li>
        <li>Use <i>skip</i> to skip returning specified results.</li>
        <li><i>limit</i> and <i>skip</i> can be used to create pagination.</li>
        <li>when <i>id</i> or <i>title</i> is present then <i>limit</i> and <i>skip</i> has no effect.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>POST</td>
    <td><ul><li><code>title</code></li></ul></td>
    <td><ul><li><i>movie title</i> is only one parameter and it is required to be present in request body.</li></ul></td>
  </tr>
  <tr>
    <td rowspan="2"><code>/comments</code></td>
    <td>GET</td>
    <td>
      <ul>
        <li><code>movieId</code></li>
        <li><code>limit</code></li>
        <li><code>skip</code></li>
      </ul>
    </td>
    <td>
      <ul>
        <li>When <i>movieId</i> is present returns only comments for specified movie by its id.</li>
        <li>Use <i>limit</i> to limit result to specified number.</li>
        <li>Use <i>skip</i> to skip returning specified results.</li>
        <li><i>limit</i> and <i>skip</i> can be used to create pagination.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>POST</td>
    <td>
      <ul>
        <li><code>comment</code></li>
        <li><code>movieId</code></li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Both parameters are required to be present in request body.</li>
        <li><i>movieId</i> needs to be valid and present movie id, use GET /movies to get list of movies or POST /movies to create one</li>
        <li><i>comment</i> should contain comment message for specified movie</li>
      </ul>
    </td>
  </tr>
</table>
