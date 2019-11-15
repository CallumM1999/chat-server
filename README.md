# Chat Server
Backend for [React Native Chat App](https://github.com/thecallum/react-native-chat-app)

## Table of Contents
* [About](#About)
* [Installation](#About)

### About
Chat server is the backend for [React Native Chat App](https://github.com/thecallum/react-native-chat-app).

I have hosted the service on Heroku using Express Web Framework.

The backend is composed of two parts: 
* Socket-io server api
* Static server for Register page

#### Website
The website Contains a form for users to register for the app. The form makes use of VueJs.

[Register form](https://nameless-reef-89192.herokuapp.com/)

Due to VueJs, the form relies on JavaScript. Hence, the backend will deliver polyfills if the browser requires it.

#### Database
The backend connects to a nosql MongoDB database hosted on MLab. It is interfaced with Mongoose.

### Installation
* [Local](#Local)
* [Heroku](#Heroku)


#### Local

##### Prerequisites
* Nodejs
* npm or yarn
* mongodb

Initialize package manager
```
yarn
```
Build webpack bundle
```
yarn build
```
Start server
```
yarn start
```
#### Heroku

##### Prerequisites
* Nodejs
* npm or yarn
* herokuCLI


Initialize the project as a git repo, then commit.

```
git init

git add .

git commit -m 'first'
```
Create a heroku app. If you haven't setup Heroku, [this](https://devcenter.heroku.com/articles/getting-started-with-nodejs) is a good tutorial.
```
heroku create
```
Check that heroku exists in the remotes. If not, double check the tutorial.
```
git remote -v
```
Push the respo to heroku
```
git push heroku master
```


Next, we need to connect out app to a database.
```
heroku addons:create mongolab
```

Copy the value for the key MONGODB_URL, and add it to the key DB_URL.
```
heroku config

heroku config:set DB_URL=copied_value
```

Generate random key, about 20 characters long. [This Site](https://www.random.org/strings/) is a good place. You want to maximize the variability, so included capitals and numbers.

The key is used for authentication, so don't put a weak string like *secret*.

Then set the value JWT_KEY to the random string
```
heroku config:set JWT_KEY=random_string
```

Then reboot

```
heroku reboot
```
Everything should be working. Open the webpage and navigate to /register to check if everything is working.
```
heroku open
```

