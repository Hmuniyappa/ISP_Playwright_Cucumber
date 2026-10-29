@saveassignmentfunctionality
Feature: Save tab Assignments functionality

    Background:
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page

    @continueDraft
    Scenario: continue Draft new functionality
        And User creates a new assignment
        And User clicks Save for Later button
        And User continues the draft assignment
        Then Draft assignment should be continued successfully

    @updatecreateAssigment
    Scenario: update Create Assignment new functionality
        And User continues the draft assignment
        Then Updated assignment should be saved successfully

    @editcreateassignment
    Scenario: edit Assignment new functionality
        And User continues the edited assignment
        Then Edited assignment should be saved successfully

    @copycreateassignment
    Scenario: copy Assignment new functionality
        And User continues the copy assignment
        Then Copied assignment should be saved successfully

    @publishassignment
    Scenario: Publish Assignment new functionality
        And User continues the publish assignment
        Then Assignment should be published successfully

    @deleteassignment
    Scenario: DeleteAssignment new functionality
        And User creates a new assignment
        And User clicks Save for Later button
        And User deletes the assignment
        Then Assignment should be deleted successfully