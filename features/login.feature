Feature: login functionality

  @smoke
  Scenario: Successful login with valid credentials
    Given User is on Marking login page
    When User enters username and password
    And User clicks login button
    Then User should be redirected to dashboard

  Scenario: Successful login with student credentials
    Given User is on Marking login page
    When User enter Username1 and Password1
    And User clicks login button
    Then User should be redirected to dashboard
  
  
