@createstudentgroupfunctionality
Feature: Create student group functionality

    Background:
        Given User is on AI Tutor login page
        When User enters usernameteacher3 and password
        And User clicks login button
        Given User clicks on the Toggle Menu and Student Groups option

    @createdstudentgroup
    Scenario: Create a new student group
        When User enters the student group details
        And User clicks the Save button
        Then The new student group should be created successfully

    @editstudentgroup
    Scenario: Edit an existing student group
        When User edit the student group details
        Then The student group should be updated successfully

    @resetandcancelstudentgroup
    Scenario: Reset and Cancel student group edit
        When User clicks the Reset and Cancel buttons

    @viewstudentgroup
    Scenario: View an existing student group
        When User views the student group details

    @deletestudentgroup
    Scenario: Delete an existing student group
        When User deletes the student group

    @creationgroupforTutor
    Scenario: Create a group for AI Tutor session
        When User enters the student group details
        And User clicks the Save button
        Then The new student group should be created successfully
        When User views the student group details
        Then User selects the custom group for AI Tutor session