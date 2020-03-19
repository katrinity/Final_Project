# Project-03

Heroku link: 

This application is a movie and TV show compendium. It showcases latest trending movies and TV shows. It provides personalized experience by allowing users to create an account and access it with their login credentials. It lets them search for movies or TV shows and save their personal comments and ratings to these movies/TV shows. Users can also share their content with friends and family in social media.

## Table of contents
1. [How the APP works](#howitworks)
2. [Technologies Used](#tech)
3. [Applications Used](#app)
4. [Wireframe Design](#wire)
5. [User Story Breakdown](#user)
6. [Task Breakdowns](#task)
7. [UI Design](#UI)
8. [How We Implemented Bootstrap](#bootstrap)
9. [Mobile Responsiveness](#mobile)
10. [API Design, Firebase, Libraries](#design)
11. [Git Commands](#git)
12. [DEMO Gif Walkthrough](#gifs)
13. [Future RoadMap](#future)
14. [Team memeber GIT Links](#team)
15. [Code Snippets](#code)

<a name="howitworks"></a>
## 1. How the APP works

The landing page of the application showcases carousels for latest trending movies and TV shows. User can click on the movies to checkout the trailers of the movies they selected by clicking on it. 

## Login Credentials 
userid: askk@askk.com
password: Askk!123

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


<a name="app"></a>
## Applications Used
GitHub
ChromeDev tools
Visual Studio Code
Chrome browser

<a name="task"></a>
## Task Breakdowns
1. Andrew - A sleek looking UI using bootstrap and  the website being fully mobile responsive
2. Katia - 
3. Krishna - 
4. Sree - OAuth sign-in, Registration page logic, modelling, search page (inital design, backend routes and fetching data and rendering component in the browser), saved page (initial design, backend routes to store data and React.js code to fetch and render component)

<a name="design"></a>
## API Design, Libraries

### OMDB API
We used the OMDB API for searching movies (based on a user query)
The results from this search were used to render search results

### Rotten tomatoes
We scraped Rotten tomatoes pages to get latest trending movies and TV shows.
Rotten tomatoes pages included JSON objects for such data. We used this data for our application.

### Youtube videos for trailers
We scraped youtube search pages to get trailers for movies queried by users.


<a name="team"></a>
## Authors - Team members, GIT links
<!-- make a link to the deployed site and have your name as the link -->
* [Andrew](https://github.com/homemadechowder)
* [Katia](https://github.com/katrinity)
* [Krishna](https://github.com/krishnaaddala)
* [Sree](https://github.com/sreeveena/)

<a name="code"></a>
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

#### Code for sharing pages with friends online in social media

```
  <FacebookShareButton  className="d-inline" url={this.getSharableLink(value.link)}>
    <a key = {1} style = {buttonStyle.media} >
      <i style = {{marginLeft: '-.2rem', textAlign: 'center',color: "#4267b2"}} className="fab fa-facebook fa-lg"> </i>
    </a> 
  </FacebookShareButton>
  <TwitterShareButton  className="d-inline" url={this.getSharableLink(value.link)}>
    <a key = {2} style = {buttonStyle.media} >
      <i style = {{marginLeft: '-.2rem', textAlign: 'center',color: '#1DA1F2'}} className="fab fa-twitter fa-lg"> </i>
    </a> 
  </TwitterShareButton>
  <WhatsappShareButton className="d-inline" url={this.getSharableLink(value.link)}>
    <a key = {3 }style = {buttonStyle.media}>
      <i style = {{marginLeft: '-.2rem', textAlign: 'center', color: '#f685ab'}} className="fab fa-whatsapp fa-lg"></i>
    </a>
  </WhatsappShareButton>
```

<a name="git"></a>
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
