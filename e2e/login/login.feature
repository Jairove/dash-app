Feature: This feature describe the scenarios of the login part of our authentication component

  Scenario Outline: The user is using the login form

    Given user clicks the login link
    Given '<email>' is the user email in the login form
    Given '<password>' is the user password in the login form
    When submitting the login form
    Then the login form is validated '<valid>'

    Examples:
      | email           | password                 | valid |
      | ""              | ""                       | false |
      | ""              | "thisisavalidpassword"   | false |
      | "test.es"       | "thisisavalidpassword"   | false |
      | "test@test.es"  | ""                       | false |
      | "test@test.es"  | "thisisavalidpassword"   | true  |
