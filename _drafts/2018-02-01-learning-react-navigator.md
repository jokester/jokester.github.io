[react-navigator]() is becoming defacto navigator in React Native world.

## Architecture

-

## Terms

- Screen
    - Components (commonly `<View />`) that can be jumped back and forward
- Navigator Constructor
    - HOCs to create Navigator Component from Screens
    - `StackNavigator`, `DrawerNavigator` etc
- Navigator Component
    - Can also be used as Screen
- Custom Navigator Component
    - `Router` + `View`
- Router: per Navigator Component (constructor)
    - Pure functions to (reduce over state) and (map state to component)
    - `(Action, State) -> State`
    - `(Path, Params) -> Action`
    - `(State) -> (Path, Param)`
    - `(State) -> (Component)`
    - `(routeName) -> (Component)`
    - [concept map](https://reactnavigation.org/docs/custom-routers.html)
    - XXX: how is router composed?
- Action
    - a `intent` or `command` object to change state
    - as per Action in redux
- State: per Navigator instance
    - nested (same hierarchy as nested navigator?)
    - only 1 screen is active?
        - what about during animation / transition?
    - XXX: does inactive component get unmounted?
- Dispatch
    - by default, 1 instance shared by all Navigator in the navigation tree. see https://reactnavigation.org/docs/custom-navigators.html#docsNav

## Helpers

- withNavigation
    - extracts navigation object from `React context`
- onNavigationStateChange
    - callback for builtin Navigator Component

## Resources

## Showcase + Demo
