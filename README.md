
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a>
    <img src="media/logo.png" alt="Logo" width="80" height="80">
  </a>

<br />
<h1 align="center">Crime Awareness ChatBot</h1>

  
  

  <p align="center">
    User friendly Chabot Based Crime Awareness System.
    <br />
    <br/>
    <a href="https://github.com/bqwerr/Crime-Awareness-Bot">Repository</a>
    <!-- · <a href="https://bqwerr.github.io">Explore the docs</a> -->
  </p>
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <!-- <li><a href="#features">Features</a></li> -->
    <li><a href="#contributors">Contributors</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <!-- <li><a href="#contributors">Contact</a></li> -->
    <li><a href="#references">References</a></li>
  </ol>
</details>


<br />

<!-- ABOUT THE PROJECT -->
## About The Project
<br />

The objective of this project is to create a chatbot that can be used to create awareness about the crimes, by fetching statistical data from the dataset. The chatbot will ask query about your problem and fetch the data based on the intents and entities recognized from the trained data. It can also help in registering compliants through chatbot. An interactive Map has been developed in the application to fetch nearby police stations and register an SOS.

<br />

* NLTK Python library is used to tokenize words into input arrays, which are then provided as inputs to a neural network.
* Patterns will be input arrays and tag will be as the label to train the model.
    ![Intents](/media/intents.png)

<br />

### Flow Diagram 
![Flow Diagram](/media/flow.png)

<br />

### Class Diagram
![Class Diagram](/media/class.png)

### Use Case Diagram
![Use Case Diagram](/media/usecase.png)



<br />


<details open>

<summary> Screenshots of the application </summary>

<br />

#### Home Page
![Home](/media/home.png)

#### Login Page
![Login](/media/login.png)

#### Compliant Registration
![Compliant Registration](/media/compliant.png)

#### Awareness Query
![Awareness](/media/awareness.png)

#### Fetching Statistics using ChatBot
![Statistics](/media/chatbot-statistics.png)

#### SOS Page for User
![SOS](/media/sos.png)

#### Nearby SOS Compliants
![SOS](/media/sos-police.png)

### Crime Statistics
![Statistics](/media/statistics.png)

<br />

![Statistics](/media/visualization.png)

</details>
<br />

### Built With

[![My Skills](https://skillicons.dev/icons?i=django,python,js,react&perline=4)](https://skillicons.dev)


<br />

<!-- GETTING STARTED -->
## Getting Started

To get a local copy of this application up and running follow these example steps.

### Prerequisites

* Python & NodeJS had to be installed in the local system.

### Installation

#### To set up backend API, follow below steps

1. Clone the repository
   ```sh
   git clone https://github.com/bqwerr/Crime-Awareness-Bot.git
   ```
2. In the root project directory, open a terminal and create a virtual environment to install python libraries.

    ```
    cd Backend
    pip install virtualenv
    virtualenv env
    env\Scripts\activate
    ```

3. Now install python libraries

    ```
    pip install -r requirements.txt
    ```

4. Run the application, using below commands in sequence

    ``` 
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver
    ```

- Now the application will be running at http://localhost:8000.


#### To set up frontend application, follow below steps.
2. In the root project directory, input below commands.
```sh
cd Frontend
npm install
npm start
```
- Now the application will be running at http://localhost:3000.

<br />

### Usage

1. To get the required entities from the query provided by user, Create a Dialogflow agent and train accordingly. Then post the query to the agent using Python, to get recognized entities from the trained agent.
    - Place your project service account key in the root folder, to use dialogflow api using python.
    - Service account key can be found from google cloud <a href="https://console.cloud.google.com/iam-admin/">console</a>.

2. To use MapBox API at the frontend, replace the API key with yours.
    - MapBox API key can be created at https://www.mapbox.com/

<!-- See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues). -->




<!-- CONTRIBUTING -->
<!-- ## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
<br /> -->


<!-- CONTACT -->

## Contributors

[Srujan Tumma][linkedin] \
[Sai Kiran Kammari][SaiLinkedin]




<!-- ACKNOWLEDGMENTS -->
## References

* http://tflearn.org/models/dnn/
* https://www.django-rest-framework.org/#example
* https://cloud.google.com/dialogflow/docs/
* https://www.nltk.org/


[website]: https://bqwerr.github.io
[linkedin]: https://linkedin.com/in/srujan-tumma
[gmail]: mailto:tummasrujan@gmail.com
[github]: https://github.com/bqwerr
[SaiLinkedin]: https://www.linkedin.com/in/saikirankammari/

