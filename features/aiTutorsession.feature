@createaitutorsessionfunctionality
Feature: Create AI Tutor session functionality

    Background:
        Given User is on AI Tutor login page
        When User enters usernameteacher3 and password
        And User clicks login button
        Then user click on AI tutor session

    @createaitutorsession
    Scenario: Create AI Tutor session
        Then AI Tutor session should be created successfully

    @createaitutorsessionfile
    Scenario: Create AI Tutor session with file upload
        Then AI Tutor session should be created successfully with file upload

    @resetaitutorsession
    Scenario: Reset AI Tutor session
        Then AI Tutor session should be reset tutor successfully

    @cancelaitutorsession
    Scenario: Cancel AI Tutor session
        Then AI Tutor session should be cancelled tutor successfully


