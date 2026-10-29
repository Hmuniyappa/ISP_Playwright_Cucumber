@createstudentgroupfunctionality
Feature: Create student group functionality

    Background:
        Given User is on AI Tutor login page
        When User enters usernameteacher3 and password
        And User clicks login button
       
@createdstudentgroup
Scenario: Create a new student group
    Given User clicks on the Create new Group button
    When User enters the student group details
    And User clicks the Save button
    Then The new student group should be created successfully

@editstudentgroup
Scenario: Edit an existing student group
    Given User clicks on the edit group button
    When User edit the student group details
    And User clicks the update group button
    Then The student group should be updated successfully