Feature: Ecommerce validation

  Scenario: placing the order
    Given a login to ecommerce application with "username" and "password"
    When add "IPHONE 13 PRO" to cart
    Then verify "IPHONE 13 PRO" is displayed to the cart