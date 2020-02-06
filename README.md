# 1. Requirement
- redis store in your machine
- change URL to yours in src/public/main.js 23 line (ex localhost:6003)  

# 2. How to use?  

```
npm install
npm start
```
http://localhost:6003


# 3. API Docs  

[register](#register)  
[login](#login)  
[logout](#logout)  
[verify](#verify)  
[profile](#profile)  


**register User**
----
  signup an user

* **URL**

  /auth/register

* **Method:**

  `POST`
  
* **URL Params**  

  None

* **Data Params**

  * **Required:**

    `id=[string]`  
    `password=[string]`  



* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** `{ "id": "jslee4" }`
 
* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:** `{ error : "id exist" }`

  OR

  * **Code:** 400 NOT FOUND <br />
    **Content:** `{ error : "id exist" }`

* **Sample:**

  ```
  ```

## **login**
----
  signin an user, save a new acceesstoken in session.

* **URL**

  /auth/login

* **Method:**

  `POST`
  
* **URL Params**  

  None

* **Data Params**

  * **Required:**

    `id=[string]`  
    `password=[string]`  


* **Success Response:**

  * **Code:** 202 <br />
    **Content:** None
 
* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:** None

* **Sample:**

  ```
  ```
## **logout**
----
  logout an user, destory a session.

* **URL**

  /auth/logout

* **Method:**

  `DELETE`
  
* **URL Params**  

  None

* **Data Params**

  * **Required:**

    `id=[string]`  
    `password=[string]`  


* **Success Response:**

  * **Code:** 202 <br />
    **Content:** None
 
* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:** None

* **Sample:**

  ```
  ```


## **verify**
----
  verify a token saved in client cookie by comparing in server session  
  this is test method to verify token 

* **URL**

  /auth/verify

* **Method:**

  `GET`
  
* **URL Params**  

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 202 <br />
    **Content:** `{"id": "jslee4","password": "1234","iat": 1580945462,"exp": 1580949062}`
 
* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:** None

* **Sample:**

  ```
  ```

## **profile**
----
  Returns string data about a single user

* **URL**

  /auth/verify

* **Method:**

  `GET`
  
* **URL Params**  

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `"{\"id\":\"jslee4\",\"password\":\"1234\"}"`
 
* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:** None

* **Sample:**

  ```
  ```


# 4. socket 

## socket.on 

**new message** 
---

* **event Name**

  new message

* **data**

  message: string
  
* **emit**

  * **event Name**
    new message 

  * **data:**
    `{ username: socket.username, message: data }`

**add user**  
---

* **event Name**

  add user

* **data**

  username: string
  
* **emit**

  * **event Name**
    login 

  * **data:**
    `{numUsers: numUsers}`

* **emit**

  * **broadcast**

  * **event Name**
    user joined 

  * **data:**
    `{username: socket.username, numUsers: numUsers}`


**typing**
---

* **event Name**

  typing

* **data**

  None
  
* **emit**

  * **broadcast**

  * **event Name**
    typing 

  * **data:**
    `{username: socket.username}`


**stop typing**
---

* **event Name**

  stop typing

* **data**

  None
  
* **emit**

  * **broadcast**

  * **event Name**
    stop typing 

  * **data:**
    `{username: socket.username}`


**disconnect**
---

* **event Name**

  user left

* **data**

  None
  
* **emit**

  * **broadcast**

  * **event Name**
    stop typing 

  * **data:**
    `{ username: socket.username, numUsers: numUsers }`
