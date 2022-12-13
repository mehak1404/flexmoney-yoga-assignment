## to start backend
    - npm install
    - npm run dev

## Database

    -There are three tables as per the requirements user, batch, and payment, 
    -batch has many to one relationship with the user table as the user can be in one batch at a time but batch has many users.
    -user has many to one relationship with payment 

## APIS
    - There are APIs for following functionalities
        - register,  login/logout (passport, JWT authentication is used)
        - APIs to create, update, delete batches and also to change batch of user and fetch the batch for a particular User
        - Crud APIs for payment, and payment details for a batch or user can be fetched.

        A whole report on testing is in the link- 