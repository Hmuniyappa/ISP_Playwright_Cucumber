Feature: login functionality

  @teacher1
  Scenario: Successful login with valid credentials
    Given User is on Marking login page
    When User enters usernameteacher1 and password
    And User clicks login button
    Then User should be redirected to dashboard

@student1
  Scenario: Successful login with student credentials
    Given User is on Marking login page
    When User enter Usernamestudent1 and Password
    And User clicks login button
    Then User should be redirected to dashboard

@teacher2
  Scenario: Successful login with teacher credentials
    Given User is on Marking login page
    When User enters usernameteacher2 and password
    And User clicks login button
    Then User should be redirected to dashboard

 @teacher3
  Scenario: Successful login to ISP AI Tutor
    Given User is on AI Tutor login page
    When User enters usernameteacher3 and password
    And User clicks Tutor login button
    Then User should be redirected to AI tutor dashboard
  
