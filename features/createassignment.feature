Feature: Create Assignments functionality

    @createassignment
    Scenario: Created Assignment new functionality
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page
        And User creates a new public assignment
        And User click on create button
        Then Assignment should be created and Public successfully

    @saveforlater
    Scenario: Save for later a new assignment
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page
        And User creates a new assignment
        And User clicks Save for Later button
        Then Assignment should be created successfully

    @reset
    Scenario: Reset Assignments functionality
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page
        And User click on reset button
        Then Assignment should be reset successfully

    @cancel
    Scenario: Cancel Assignments functionality
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page
        And User click on cancel button
        Then Assignment should be cancelled successfully