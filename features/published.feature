@publishedassignmentfunctionality
Feature: Published tab Assignments functionality

    Background:
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page

    @copypublishedcreateassignment
    Scenario: copy Published Assignment new functionality
        And User creates a new public assignment
        And User click on create button
        Then Assignment should be created and Public successfully
        And User continues the copy published assignment
        Then Copied published assignment should be saved successfully

    @viewassignment
    Scenario: View a published assignment
        Then The assignment details popup should be displayed with the correct title

    @viewsubmissions
    Scenario: View submissions for a published assignment
        Then The submissions for the published assignment should be displayed successfully

    @regenerateassignment
    Scenario: Regenerate a published assignment
        Then The assignment should be regenerated with feedback successfully

    @editassignmentfeedback
    Scenario: Edit feedback for a published assignment
        Then The assignment edit feedback should be updated successfully

    @publishfinishassigment
    Scenario: Publish and finish a published assignment
        Then User should be able to publish and finish the assignment successfully
     
     @viewhistoryassignment
    Scenario: View history of a published assignment
        Then The history for the published assignment should be displayed successfully

    @closeassignment
    Scenario: Close a published assignment
        Then The closed assignment should be updated successfully
        
    @unpublishassignment
    Scenario: Unpublish a published assignment
        And User unpublishes the assignment
        Then The unpublished assignment should be deleted successfully

