import React from "react";
import { render } from "react-dom";

/**
 * Login Component
 * */
function withLogin(UserRef) {
  return class extends UserRef {
    constructor(...args) {
      super(...args);
    }

    setLoggedIn = () => {
      this.setState({
        name: "Niraj",
        session: true
      });
    };

    logOut = () => {
      this.setState({
        name: "Please Login",
        session: false
      });
      this.toggleMenu(false);
    };
  };
}

/**
 * Big Menu Title Component
 */
function MenuTitle(ParentClass) {
  return class extends ParentClass {
    componentDidMount = () => {
      this.setState({
        title: "The Big Update title"
      });
    };

    changeBigMenuTitle = title => {
      this.setState({
        title
      });
    };
  };
}

/**
 * Main Menu Layout
 */
function Menu(ParentClass) {
  return class extends ParentClass {
    constructor(...args) {
      super(...args);
    }

    toggleMenu = (toggle = true) => {
      this.setState({
        menuOpen: toggle ? !this.state.menuOpen : toggle
      });
    };

    changeBigMenuTitleFromHere = () => {
      this.changeBigMenuTitle("New Tile is here");
    };

    menu() {
      return () => {
        return (
          this.state.menuOpen && (
            <div>
              {this.state.title && <h3>{this.state.title}</h3>}
              <ul>
                <li
                  data-title="Title One"
                  onClick={this.changeBigMenuTitleFromHere}
                >
                  Menu One
                </li>
                <li>Menu Two</li>
                <li>Menu Three</li>
                <li>Menu Four</li>
                <li>Menu Five</li>
              </ul>
            </div>
          )
        );
      };
    }
  };
}

/**
 * Core Interface for App, which will hold store, state, common methods
 */
class MasterInterface extends React.Component {
  state = {
    name: "Please Login",
    menuOpen: false,
    title: "The Big Title",
    session: false
  };
}

@MenuTitle // Inject Big Menu title into Master Layout
@Menu // Inject Main menu in Master Layout
@withLogin // Inject Login Component to Master Layout
class MasterLayout extends MasterInterface {
  render() {
    const { name } = this.state;
    const Menu = this.menu();

    return (
      <div>
        {this.state.session ? (
          <span onClick={this.logOut}>Logout</span>
        ) : (
          <span onClick={this.setLoggedIn}>Login</span>
        )}
        <div>
          <div> Awesome {name}</div>
          {this.state.menuOpen ? (
            <span onClick={this.toggleMenu}>Close Menu</span>
          ) : (
            <span onClick={this.toggleMenu}>Open Menu</span>
          )}
          <Menu />
        </div>
      </div>
    );
  }
}

render(<MasterLayout />, document.getElementById("root"));
