@saveandclose
Feature: Create Assignments functionality

Scenario: Create a new assignment

    Given User is on Marking login page
    When User enters usernameteacher1 and password
    And User clicks login button
    And User navigates to assignment page
    And User creates a new assignment
    And User clicks Save for Later button
    Then Assignment should be created successfully