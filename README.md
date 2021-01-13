# Demo Json Application Frontend

### Running application
* Requires docker
* Build docker image from this repository working directory
```docker build -t demo-frontend .``` 
* Run application with image
```docker run -p 3000:80 demo-frontend```
* Go to ```http://localhost:3000``` and see frontend app.

### Application features included:
* Querying backend list with filters and query paramiters.
* Displaying folder details.
* Searching folder by numeric id, folder name or encoded path.