# Project-03

Heroku link: 

This application is a movie and TV show compendium. It showcases latest trending movies and TV shows. It provides personalized experience by allowing users to create an account and access it with their login credentials. It lets them search for movies or TV shows and save their personal comments and ratings to these movies/TV shows. Users can also share their content with friends and family in social media.

## Table of contents
1. [How the APP works](#howitworks)
2. [Technologies Used](#tech)
Applications Used
Wireframe Design
User Story Breakdown
Task Breakdowns
UI Design
How We Implemented Bootstrap
Mobile Responsiveness
API Design, Firebase, Libraries
Git Flow
DEMO Gif Walkthrough
Future RoadMap
Team memeber GIT Links
Code Snippets

<a name="howitworks"></a>
## 1. How the APP works

The landing page of the application showcases carousels for latest trending movies and TV shows. User can click on the movies to checkout the trailers of the movies they selected by clicking on it. 

<a name="tech"></a>
## Technologies Used
HTML
Javascript/jQuery
MongoDB
APIs
Javascript 
Bootstrap
AJAX
JSON
HTML 
React.js


## Applications Used
GitHub
ChromeDev tools
Visual Studio Code
Chrome browser

## Task Breakdowns
1. Andrew - A sleek looking UI using bootstrap and  the website being fully mobile responsive
2. Katia - 
3. Krishna - 
4. Sree - OAuth sign-in, Registration page logic, modelling, search page (inital design, backend routes and fetching data and rendering component in the browser), saved page (initial design, backend routes to store data and React.js code to fetch and render component)

## API Design, Libraries

### OMDB API
We used the OMDB API for searching movies (based on a user query)
The results from this search were used to render search results

### Rotten tomatoes
We scraped Rotten tomatoes pages to get latest trending movies and TV shows.
Rotten tomatoes pages included JSON objects for such data. We used this data for our application.

### Youtube videos for trailers
We scraped youtube search pages to get trailers for movies queried by users.


## Authors
<!-- make a link to the deployed site and have your name as the link -->
* [Andrew](https://github.com/homemadechowder)
* [Katia](https://github.com/katia)
* [Krishna](https://github.com/krishnaaddala)
* [Sree](https://github.com/sreeveena/)

## Appendix for Code Snippets

#### Code for authenticating a user(from browser)

  ```function authUser(email, password, provider){
    var password = {
        password: password,
        provider: provider
    };

    // Send the POST request.
    $.ajax("/api/auth/"+email, {
        type: "POST",
        data: password
        }).then(
        function(res, err) {
            if(res.result == "success"){
                $("#loginModal").modal('hide');
                $(elem).html("");
                checkSession();
            }else{
                var elem=$("#invalidLogin");
                $(elem).html("Please enter a valid email or password.");
                $(elem).css("color", "red");
            }
        }
    );
      }
  ```
#### Code for saving encrypted one-way hash(SHA256) encrypted password

  ``` if(data[0].provider){
          if(data[0].provider && data[0].provider == "events"){
              var encryptedPassword = Crypto.SHA256(req.body.password).toString();
              if( data[0].password == encryptedPassword){
                  req.session.userid = req.params.email;
                  res.json({ result:"success" });
                
             }else{
                
                res.json({ result:"fail" });
            }
        }else{
            req.session.userid = req.params.email;
            res.json({ result:"success" });
        }
    }else{
        res.json({ result:"fail" });
    }

    });
  ```
### Code using references in React.js for communicating between sibling components
```
constructor(props) {
      super(props);
      this.state = {
        menus: []
      };
      this.bucket = React.createRef();
    }
assignCategory = (category) => {
        this.bucket.current.selectACategory(category);
}

render() {
    return (
      <>
          <Nav cb={this.refreshComponent} menus={this.state.menus}/>
          <SearchInput cb={this.assignCategory}/>
          <Bucket ref={this.bucket}/>
      </>
    );
  }

```

## Git commands:

```
    git checkout master
    git checkout -b branchname
    
    *make changes to the files in your branch*
    
    git status
    git add .
    git commit -m "message"
    git push origin master
    
    *Create Pull Request*
    *Merge your code to "master"*
    ```
