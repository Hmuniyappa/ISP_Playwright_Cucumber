@createassignmentfunctionality
Feature: Create Assignments functionality

 Background:
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page

    @createassignment
    Scenario: Created Assignment new functionality
        And User creates a new public assignment
        And User click on create button
        Then Assignment should be created and Public successfully

    @saveforlater
    Scenario: Save for later a new assignment
        And User creates a new assignment
        And User clicks Save for Later button
        Then Assignment should be created successfully

    @reset
    Scenario: Reset Assignments functionality
        And User click on reset button
        Then Assignment should be reset successfully

    @cancel
    Scenario: Cancel Assignments functionality
        And User click on cancel button
        Then Assignment should be cancelled successfully