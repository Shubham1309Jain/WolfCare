<h1 align="center">
  <a href="https://github.com/agupta15k/ncsu_se_fall22_22_pr_2">
    🩺WolfCare
  </a>
</h1>

<h2 align="center"> Online Doctor Appointment and Symptoms Checker </h2>

<h2> Table of Contents </h2>

<li> 
<a href="#overview"> About WolfCare </a> 
</li>
<li> 
<a href="#appInAction"> App In Action </a> 
</li>
<li> 
<a href="#target audience"> Target Audience </a> 
</li>
<li> 
<a href="#tech"> Technologies </a> 
</li>
<li> 
<a href="#ig"> Getting Started </a>
</li>
<li> 
<a href="#directory"> Directory Structure </a>
</li>
<li> 
<a href="#support"> Support </a>
</li>
<li> 
<a href="#licenses"> License </a> 
</li>
<h2 id = "overview"> About WolfCare </h2>

WolfCare is an online application that manages the health portfolio of the patient and provides doctor’s assistance through an online portal. A virtual doctor appointment booking system overrides the problems of booking an appointment manually. It is convenient, helps in better resource management and aids in syncing of calender schedules. This project provides a platform for the users to create an account, search for doctors at a given location, view the doctor's background and book appointments. Additionally, we have included a symptoms check where users can add theor test report values and view the results of a medical condition.  


<h2 id = "appInAction"> App in Action </h2>

Execution screenshots can be found [here](https://github.com/Shubham1309Jain/WolfCare/tree/main/docs/execution/screenshots)

<h2 id = "target audience"> Target Audience </h2>

WolfCare targets uses who would like to check the presence of any medical conditions and book an appointment with a doctor. 

<h2 id = "tech"> Technologies :electron: </h2>

![Javascript](https://img.shields.io/badge/javascript-%2320232a.svg?style=for-the-badge&logo=javascript&logoColor=%2361DAFB) &nbsp; ![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=React&logoColor=%2361DAFB) &nbsp; ![Redux](https://img.shields.io/badge/Redux-%2320232a.svg?style=for-the-badge&logo=Redux&logoColor=%2361DAFB) &nbsp; ![PHP](https://img.shields.io/badge/php-%2320232a.svg?style=for-the-badge&logo=php&logoColor=%2361DAFB) &nbsp; ![MYSQL](https://img.shields.io/badge/mysql-%2320232a.svg?style=for-the-badge&logo=mysql&logoColor=%2361DAFB) &nbsp; ![HTML](https://img.shields.io/badge/HTML-%2320232a.svg?style=for-the-badge&logo=html5&logoColor=%2361DAFB) &nbsp; ![CSS](https://img.shields.io/badge/css-%2320232a.svg?style=for-the-badge&logo=css3&logoColor=%2361DAFB)

<h2 id = "ig"> Getting started </h2>

>***Note***: *All the requirements of the project are listed in the [requirements.txt](https://github.com/Shubham1309Jain/WolfCare/blob/main/requirements.txt) file with their required versions. The [INSTALL.md](https://github.com/Shubham1309Jain/WolfCare/blob/main/INSTALL.md) guides on how to download the required applications.*

- ### Prerequisites
  - [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en/) (version 16.X or 16.17.1) should be installed.
  - Make sure the database server (mysql) is on. Consider using XAMPP.
  - Download [Python3](https://www.python.org/downloads/).
  - pytest for testing the application server.
  - Clone the Github repository in your local system.
  - This project uses xampp, so make sure to install xampp in your system.
  - Run the xampp application, and start the `Apache` and`MySQL` by clicking on the start button.

- ### Dependencies

  **Backend**: [flask](https://flask.palletsprojects.com/en/2.2.x/) (2.2.2), [flask_cors](https://flask-cors.readthedocs.io/en/latest/) (3.0.10), [json](https://docs.python.org/3/library/json.html), [asyncio](https://docs.python.org/3/library/asyncio.html), [mysql](https://dev.mysql.com/doc/connector-python/en/) (2.2.9), [pytest](https://docs.pytest.org/en/7.1.x/) (7.2.0), [pdoc](https://pdoc.dev/) (0.10.0).
  
  **Frontend**: [axios](https://axios-http.com/docs/intro) (1.0.0), [antd](https://ant.design/docs/react/introduce) (4.23.4), [jsdoc](https://jsdoc.app/) (3.6.11), [react-select](https://react-select.com/home) (5.4.0), [react-tag-input](https://www.npmjs.com/package/react-tag-input) (6.8.1), [reactstrap](https://www.npmjs.com/package/reactstrap) (9.1.4), [jest](https://jestjs.io/).

- ### Installation and Run

    **Backend**: [Documentation](https://github.com/Shubham1309Jain/WolfCare/blob/main/docs/backend/index.html)

    1. Create virtual environment

    ```
    python -m venv <name_of_virtualenv>
    ```

    2. Activate Python Virtual environment

    ```
    <name_of_virtualenv>\Scripts\activate.bat for Windows users.
    source <name_of_virtualenv>/bin/activate for linux users.
    ```

    3. Install dependencies

    ```
    pip install -r requirements.txt
    ```

  	4. Make sure the database is imported from ```database/wolfcare.sql``` onto the mysql server.
	
    5. Run the below command from the main directory to start the backend application server.

    ```
    python -m src.backend.app
    ```

    6. The backend flask application will be up and running at ```localhost:5001```

    **Frontend**: [Documentation](https://github.com/Shubham1309Jain/WolfCare/blob/main/docs/frontendDocs/wolfcare/0.1.0/index.html)

    1. After cloning the repository, move to the directory ```src\frontend``` where our frontend code is located.

    2. Install all the dependencies using npm. Command to run: ```npm install```. This will fetch the dependecies from package.json file, and install them.

    3. Start the server by using the command ```npm start```. This will run the server on port ```3000```, and the website can be accessed by going to ```http://localhost:3000/```.

    4. If credentials of a registered user are available, use them, or register a new user and interact with the website.

 - ### Testing

    **Backend**

    1. Run the below command from the main directory. This should run all the test cases for app.py.

    ```
    pytest
    ```
    
    **Frontend**

    1. Move to the directory ```src\frontend``` where our frontend tests are located.
    
    2. Run the tests using the command ```npm test -- --coverage --watchAll=false```. This will run all the tests across the frontend code.

  - ### Troubleshooting
  
    Try the following troubleshooting steps. If none of them work, contact the repository owner/file an issue.

    **Backend**

    1. We have added the print statements in all of the backend functions to know execution of the codes.
    2. In case of error the print statements will let us know about the issue of code break.
    3. The api responses the status code, valid message and response header which they can share back for troubleshooting.

    **Frontend**
    
    1. Since frontend is build using JavaScript, React and Redux, check for console logs under developer tools to identify any failures.
    2. Consider installing and using [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux developer tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to track the request through the system.

<h2 id = "directory"> Directory Structure </h2>

    .
    ├── .github
    |   ├── ISSUE_TEMPLATE
    |   |   ├── bug_report.md               # Template for bug report
    |   |   ├── feature_request.md          # Template for feature request
    |   ├── workflows
    |   |   ├── frontendGitActions.yml      # GitActions workflow for frontend
    |   |   ├── backendGitActions.yml       # GitActions workflow for frontend
    ├── .vscode
    |   ├── extensions.json                 # Recommended extensions for vscode
    |   ├── settings.json                   # Workspace settings for vscode
    ├── database
    |   ├── wolfcare.sql                    # Database for project
    ├── docs
    |   ├── Rubrics
    |   |   ├── proj1rubric.md              # Project rubric
    |   ├── backend                         # Documentation for backend
    |   ├── frontendDocs/wolfcare/0.1.0     # Documentation for frontend
    |   ├── README.md                       # Readme file for docs folder
    ├── src
    |   ├── backend
    |   |   ├── __init__.py                 # Init file for backend
    |   |   ├── app.py                      # File containing backend APIs
    |   |   ├── dbconfig.py                 # DB configuration for backend
    |   |   ├── utils.py                    # Utilities for backend
    |   ├── frontend
    |   |   ├── public                      # Folder containing assets and images
    |   |   ├── src
    |   |   |   ├── api                     # Folder containing API calling frontend code
    |   |   |   ├── __tests__               # Folder containing unit tests for frontend
    |   |   |   ├── app                     # Folder containing redux store configuration
    |   |   |   ├── components              # Folder containing frontend react components
    |   |   |   ├── containers              # Folder containing containers to connect components with redux store
    |   |   |   ├── reducers                # Folder containing reducers
    |   |   |   ├── axiox.js                # API client generation
    |   |   |   ├── index.css               # CSS configuration for frontend
    |   |   |   ├── index.js                # Entry point for frontend
    |   |   |   ├── setupTests.js           # Setup jest configuration for unit testing
    |   |   |   ├── wolfcare.jsx            # Root react component
    |   |   ├── .eslintignore               # Ignore configuration for eslint
    |   |   ├── .eslintrc.js                # eslint configuration
    |   |   ├── package.json                # Package configuration and dependency closure
    |   ├── README.md                       # Readme file for src folder
    ├── test
    |   ├── README.md                       # Readme file for test folder
    |   ├── __init__.py                     # Init file for test folder
    |   ├── test_app.py                     # Tests for backend
    ├── .gitattributes                      # File for git attributes
    ├── .gitignore                          # File for git ignore
    ├── CITATION.cff                        # File for citations
    ├── CODE_OF_CONDUCT.md                  # Code of conduct for repository
    ├── CONTRIBUTING.md                     # Details about contributing to the repository
    ├── INSTALL.md                          # Details about prerequisite installation
    ├── LICENSE                             # MIT License details
    ├── README.md                           # Readme file for repository
    ├── requirements.txt                    # Details of dependency packages
    └── setup.py                            # Setup file for the module


<h2 id = "support"> Support </h2>

We do our best to answer all tickets in a timely manner, but sometimes we accumulate a backlog and may take awhile to respond. Please be patient—we will get back to you as soon as we can! 

Please do contact any of us:
* Shubham Jain(sajain4@wisc.edu)
* Nitesh Mishra(nmishra4@ncsu.edu)

<h2 id = "licenses"> Licence </h2>

* We are using [MIT license](https://github.com/Shubham1309Jain/WolfCare/blob/main/LICENSE)
* Copyright (c) 2022 Group 22
