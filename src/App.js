import React, { useState, Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class SuperFloat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    };

    this.elementRef = (ref) => {
      if (!ref) {
        return;
      }

      const onResize = () => {
        const rect = ref.getBoundingClientRect();

        this.setState({
          width: rect.width,
          height: rect.height
        });
      }
      
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(ref);
      onResize();
    }

    this.placeholderRef = (ref) => {
      if (!ref) {
        return;
      }

      const onResize = () => {
        const rect = ref.getBoundingClientRect();

        this.setState({
          top: rect.top,
          left: rect.left
        });
      }
      
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(ref);
      onResize();
    }
  }

  render() {
    const placeholderStyle = {
      boxSizing: 'border-box',
      width: `${ this.state.width }px`,
      height: `${ this.state.height }px`,
    };

    const portalStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: `${ this.state.top }px`,
      left: `${ this.state.left }px`
    };

    console.warn(portalStyle);

    const portal = (
      <div style={ placeholderStyle } ref={ this.placeholderRef }>
        {
          ReactDOM.createPortal(
            <div ref={ this.elementRef } style={ portalStyle }>
              { this.props.children }  
            </div>,
            document.body
          )
        }
      </div>
    )


    return (
      <Fragment>
        { portal }
      </Fragment>
    )
  }
}

function DropDown() {
  const [ active, setActive ] = useState(false);

  return (
    <Fragment>
      <div className='dropdown-container'>
        <button
          onClick={ () => setActive(!active) }
          onBlur={ () => setActive(false) } 
          tabIndex='0'>
            Menu
        </button>
        {
          active && (
            <ul className='dropdown'>
              <li>foo</li>
              <li>bar</li>
              <li>baz</li>
              <li>bong</li>
              <li>zomg</li>
              <li>floop</li>
              <li>doop</li>
            </ul>
          )
        }
      </div>
    </Fragment>
  );
}

function App() {
  return (
    <div className="App">
      <div className="overflow-box">
        <DropDown />
      </div>
      <div className="overflow-box">
        <SuperFloat>
          <DropDown />
        </SuperFloat>
      </div>
    </div>
  );
}

export default App;
