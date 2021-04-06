# auth-api

[Dev]()

## .env 

     - MONGODB_URI=mongodb+srv://rubabanat:0000@cluster0.ligjz.mongodb.net/Database?retryWrites=true&w=majority

     - SECRET="secretary"

## Feature requirement


- Combine 2 servers into a single server
- Create a new set of “Protected” API routes
-  Apply best practices and quality engineering
- a suite of tests to :
    - AUTH Routes
    - V1
    - V2
    - bearer
    - basic


---

## UML 

![uml](imgs/uml2.jpg)

--- 

## Tests that assert your features:

- [Github-Acton](https://github.com/RubaBanat/auth-api/actions)


- Coverage 

![coverage](imgs/cov1.png)


---


- [Pull-Request]()
- [Heroku-deployment]()


---


## workflow

- `First` : 

- Deploy to Dev
- Complete an ACP on your dev branch.
- Go immediately to the repository on GitHub and open the actions tab
- You should see your tests running
- If they were passing on your local machine, they’ll also pass here
- Once your tests have passed, go to Heroku.com and look at your dev app’s Activity tab, it should show you an active deployment
When it completes, go to the Heroku app URL and open your server in the browser, you should see the same results as you saw locally.


- `Second`:


- Go to your repository on GitHub
- Open a pull request from dev to main
- If your tests are passing, you will be able to merge this branch
- Once you merge, the tests will run again using GitHub actions
- Once the tests pass, Heroku will deploy your “main” branch to your “production” app!
- When that process completes, open your app in the browser to prove it.


---

# THE END

