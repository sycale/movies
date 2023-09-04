### Installation


`npm install`

### Running

`npm run start:dev`

### Example of .env file

`MONGODB_URI=`

### Functionality

implemented all the required logic including cascade deleting, pagination, middleware for loggin, data validation

### Api endpoints
Ideally I would use swagger for testings, but as it's just a simple app, i would prefer using postman for testing endpoints

To test endpoints you can import to json data from file `movies.postman_collection.

Global prefix for endpoints is `/api`

All the endpoints are separated into logical parts

**Movie**
```
POST - /api/movies - Create movie, Body - {
  title: string;
  description: string;
  releaseDate: Date;
  genres: string[]
}
GET - /api/movies - Find all, Query - {
    title?: string;
    genres?: string[];
    page: number;
    limit: number;
}
PUT - /api/movies/:movieId - Update movie, Body - {
    title?: string;
    description?: string;
    releaseDate?: Date,
    genres?: string[],
}
DELETE - /api/movies/:movieId - Deletes movie by id,
```
**Genre**
```
POST - /api/genres - Create movie, Body - {
    name: string;
}
GET - /api/genres - Get all genres
DELETE - /api/genres/:genreId - Deletes genre by id,
```