@teacherstudentreworkflow
Feature: My Student functionality

    @teacherstudentreworkflow
    Scenario: Teacher creates an assignment 
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page
        And User creates a new public assignment
        And User click on create button
        Then Assignment should be created and Public successfully
        And User starts a new browser session

        @studenttaskflow
        Scenario: creates an assignment from Student 2 
        Given User is on Marking login page
        When User enter UsernameStudent2 and Password
        And User clicks login button
        Then Student submits the assignment task
        And User starts a new browser session

        @teacherreworkflow
        Scenario: Teacher asking for rework
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page
        Then Assignment should be published and reworked successfully
        And User starts a new browser session


        @student2reworkflow
        Scenario: Student 2 reworks the assignment
        Given User is on Marking login page
        When User enter UsernameStudent2 and Password
        And User clicks login button
        Then Student should see the assignment reworked successfully


