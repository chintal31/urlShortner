## What is a URL Shortener Web App?

- An URL Shortener is used to shorten long web address. In the web app, user
  can enter any valid URL in the text field and get the required auto generated
  short url for it.

- Once user clicks on short url, application would redirect the user to original url
  provided.

## Architecture

The web application is built using following technologies/frameworks:

- Frontend: ReactJS, Material UI, Axios.

- Backend: NodeJS, Express, Redis.

The following diagram depicts the architecture and application working.

![alt text](https://github.com/chintal31/urlShortner/blob/main/architecture.png?raw=true)

### NodeJS Server -

- It handles core functionalities.

- Generating a short url - /URL_SHORTNER API generates a unique short url
  for received original url from the client. Further, Client receives back the short
  url along with stats in response.

- Redirect to original url - /REDIRECT/:SHORURL API whenever client clicks
  on short url, he/she is redirected to original url by mapping the short url
  received from query params with stored original url object in Redis.

### Redis –

- Redis is a in-memory key value data storage. It is very fast as it stores data
  in memory rather than on disk. The reason to choose Redis for this application was
  speed along with its key value storage data structure. It makes storing and fetching
  url objects along with its stats easy and fast.

### Possible improvements

- Create a dockerized application

- Automates Tests

- Integrate CI/CD pipelines

- Logging
