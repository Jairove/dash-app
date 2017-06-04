Feature: Register

  Scenario Outline: The user is using the register form

    Given user is at the register page
    Given '<email>' is the user email in the register form
    Given '<password>' is the user password in the register form
    Given '<name>' is the user name in the register form
    When submitting the register form
    Then the register form is validated '<valid>'

    Examples:
      | email           | password                 | name       | valid |
      | ""              | ""                       | ""         | false |
      | ""              | "thisisavalidpassword"   | "test"     | false |
      | "test.es"       | "thisisavalidpassword"   | "test"     | false |
      | "test@test.es"  | ""                       | "test"     | false |
      | "test@test.es"  | "thisisavalidpassword"   | "test"     | true  |
      | "test@test.es"  | "thisisavalidpassword"   | ""         | false |
