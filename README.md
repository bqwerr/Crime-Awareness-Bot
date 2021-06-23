
# Installation
Clone the master branch and follow below steps...

#### For Frontend environment...

```sh
cd Frontend
npm i
npm start
```
Replace MapBox token and Backend URL with yours..

#### For Backend environment...

```sh
cd Backend
virtualenv ENV
ENV\Scripts\activate
pip install -r requirements.txt
py manage.py makemigrations
py manage.py migrate
py manage.py runserver
```
To use your Dialogflow agent place your project service account key in root folder
Service accounts can be found at Google Cloud Console -> IAM & Admin
