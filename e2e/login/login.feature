Feature: Login

  Scenario Outline: The user is using the login form

    Given user is at the login page
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
