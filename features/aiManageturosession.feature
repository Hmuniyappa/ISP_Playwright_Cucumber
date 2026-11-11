@manageaitutorsessionfunctionality
Feature: Manage AI Tutor session functionality

    Background:
        Given User is on AI Tutor login page
        When User enters usernameteacher3 and password
        And User clicks login button

        @viewaitutorsession
        Scenario:View AI Tutor session functionality
        And User navigates to AI Tutor Published session tab
        Then User should be able to view AI Tutor session

        @publishaitutorsession
        Scenario: Publish AI Tutor session functionality
        And User navigates to AI Tutor Published session tab
        Then User should be able to unpublish AI Tutor session