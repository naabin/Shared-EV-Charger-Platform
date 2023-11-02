Makesure you Grant privilages on test_evcharger database by run on local mysql:
    GRANT ALL PRIVILEGES ON test_evcharger.* TO 'admin'@'localhost';
    FLUSH PRIVILEGES;


Test Specification for chatroom App
1. Introduction

    Objective: The objective is to outline the approach and guidelines for testing the functionalities of the chatroom app, ensuring reliability and correctness in models, views, and WebSocket consumers.

2. Test Items

    Models (Chatroom, Message)
    Views (get_chatroom, save_chatlog, get_user_chatrooms)
    Consumers (WebSocket for real-time chat)
3. Features to be Tested

    Creating and retrieving chatrooms and messages from the database.
    Execution of view functions, ensuring they return the expected responses.
    Real-time message exchange functionality through WebSockets.
4. Features Not to be Tested

    Performance testing for multiple simultaneous WebSocket connections is out of scope.
5. Approach

Models:
    Write tests to ensure that instances of models are being created and saved to the database correctly.
    Views:
    Test the endpoints by sending requests and checking for the correct response status and data.
    Consumers:
    Mimic WebSocket connections and interactions, ensuring messages are sent and received correctly.
6. Pass/Fail Criteria

    Tests should execute without errors, and the results should meet expectations for a pass.
    Any errors or unexpected outcomes during execution will result in a fail.
7. Test Deliverables

    Test cases
    Test data
    Test results and logs
8. Test Tasks

    Preparation of the test environment
    Execution of test cases
    Verification and validation of results
9. Environmental Needs

    A local Django development environment.
    Necessary permissions for database access.
10. Responsibilities

    Test Planning and Design: Eren
    Test Execution: Eren

11. Schedule

    Test Preparation: 1/11/2023 - 1/11/2023
    Test Execution: 2/11/2023 - 2/11/2023
    Result Analysis and Report Preparation: 2/11/2023 - 2/11/2023

12. Risks and Contingencies

    Issues accessing the database.
    Unavailability of the test environment.
    Lack of clarity or completeness in requirements.

Guide on Writing the Tests
Models:

    Use Django’s TestCase class.
    In the setUp method, create instances of your models.
    Write test methods to assert the creation of model instances and the correctness of their attributes.

Views:
    Use Django Rest Framework’s APITestCase class.
    Make requests to your endpoints and check the response status code and data.
    Use the reverse function to get the URLs of your endpoints.

Consumers:

    Use WebsocketCommunicator from Channels testing utilities.
    Connect to the WebSocket, send a message, and assert the message reception.
    Running the Tests
    Execute python manage.py test chatroom in your project directory.