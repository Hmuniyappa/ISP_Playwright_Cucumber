@studentassignmentfunctionality
Feature: Submit Assignments functionality

    @createassignmentforstudent
    Scenario: Teacher creates assignment for student
        Given User is on Marking login page
        When User enters usernameteacher1 and password
        And User clicks login button
        And User navigates to assignment page
        And User creates a new public assignment
        And User click on create button
        Then Assignment should be created and Public successfully

    @student2assignmenttask
    Scenario: Student 2 interacts with assignment task
        Given User is on Marking login page
        When User enter UsernameStudent2 and Password
        And User clicks login button
        Then Student should see the assignment submitted successfully

    Rule: Student assignment actions

        Background:
            Given User is on Marking login page
            When User enter UsernameStudent1 and Password
            And User clicks login button

        @resetstudentassignment
        Scenario: Student resets assignment
            Then Student should see the assignment reset successfully


        @saveDraftAssigment
        Scenario: Student saves assignment as draft
            Then Student should see the assignment saved as draft successfully

        @submitstudentassignment
        Scenario: Student submits assignment
            Then Student should see the assignment submitted successfully

        @editstudentassignment
        Scenario: Student edits assignment
            Then Student should see the assignment updated successfully
            
        @viewstudentanswer
        Scenario: Student views assignment answer
            Then Student should see the assignment answer successfully

