# CSS in JS (Emotion and Styled-Components)

![Emotion.js Logo](https://miro.medium.com/max/3840/1*hPN6aCm0RmEdHwksS8kaxA.png)

## Why use Emotion?

[Emotion](https://emotion.sh/) is a Javascript library that helps keep the concerns of styling and element architecture separate and makes components more readable, overall. Furthermore, when you have components that rely on JavaScript for their style, Emotion gives control of those states back to CSS instead of using a multitude of conditional class names.

## CSS in JS

Local Inline Styles are useful for specificity, but are limited in capabilities (it's only a subset of CSS). They don’t have media queries, keyframes, pseudo-selectors, etc.

For example:

```javascript

    // Vanilla JS
    let element = document.createElement('div');
    element.setAttribute('style', 'color: red; padding: 20px;')

    // React
    <Component
        style={{
            color: "red",
            padding: "20px",
            }}
    />

```

With Emotion, JavaScript is used to style our components with CSS template literals. When the components are parsed, CSS is generated and attached to the DOM. The CSS used in styled is much more capable than inline styles, allowing for nesting, mixins, and other advanced usage (but not as powerful as a CSS pre-processor).

See sites that use CSS in JS:
[Oscar Health](https://www.hioscar.com/)

```javascript
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/core */
import { css, jsx } from '@emotion/core';

const color = 'white';

render(
  <div
    css={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
);
```

## Code-Along

### Installation

First we're going to want to install the `styled-components` dependency.

```
npm i @emotion/styled @emotion/core
```

### The Basic Setup

If you take a look at our boilerplate, we will have a `Components` directory, where we will store all of our styled components, as well as an App.js and index.js.

Let's implement a basic button in App.js to familarize ourselves with how Emotion works!

- Step 1 Configure the JSX Babel Plugin to use Emotion's `jsx` function instead of `React.createElement`

```javascript
// Set the jsx pragma at the top of any js file that uses the css prop
/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
```

You may also configure your `.babelrc` if you are using something like `Next.js`. Your .babelrc would look something like so:

```json
{
  "presets": [
    [
      "next-babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/core"
        }
      }
    ]
  ],
  "plugins": ["babel-plugin-emotion"]
}
```

- Step 2 Create your first CSS in JS component

```javascript
function App() {
  return (
    <div>
      <button
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          cursor: pointer;
        `}
      >
        Pink Button
      </button>
    </div>
  );
}
```

- Step 3 Add a hover pseudo class, and pass in dynamic styles.

```javascript
function App() {
  const color = 'white';
  return (
    <div>
      <button
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            color: ${color};
          }
        `}
      >
        Hover to change color
      </button>
    </div>
  );
}
```

### Styled Components

```javascript
// /components/Buttons.js
import styled from '@emotion/styled';

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  font-family: 'Menlo', monospace;
`;
```

In our `App.js`, we will import the Button and render it in our App.

```javascript
// App.js

import { Button } from './components';

function App() {
  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
      `}
    >
      <Button>Press me</Button>
    </div>
  );
}

export default App;
```

### Inheritance with Styled-Components

We can refactor our `Buttons.js` to dry our code when creating more button variations. We will create a base `Button` component that all specific buttons will inherit the styled properties of.

```javascript
// Buttons.js
...

// The Base Button Component
const Button = styled.button`
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 2px;
    min-width: 100px;
    cursor: pointer;
    font-family: "Menlo", monospace;
`
// PrimaryButton inherits Button
const PrimaryButton = styled(Button)`
    // CSS / SCSS goes in here
    background-color: red;
    border: none;
    color: white;
`

```

### Global Styles

### Adding more button states with nesting

![Button States](./markdown/images/button-states.png)

Next we will be implementing our various Button states. The correct properties will usually be provided to you through a brand guide or a design system by a designer. If you're a unicorn and designed the button states yourself, you can retrieve the colors, padding, and font-sizes yourself from Figma or any conventional design tool.

```javascript
// Buttons.js
...

const primaryColor = '#FF5757';
const hoverColor = '#FF4646';
const activeColor = '#FF0000';

const textOnPrimary = '#000000';
const textOnPrimaryInverted = '#ffffff';

const disabled = '#B1B1B1';
const disabledText = '#3E3D3D';

const PrimaryButton = styled(Button)`
    // CSS / SCSS goes in here
    background-color: ${primaryColor};
    border: none;
    color: ${textOnPrimary};

    &:hover {
        background-color: ${hoverColor};
        color: ${textOnPrimaryInverted};
    }

    &:focus {
        background-color: ${activeColor};
        color: ${textOnPrimaryInverted};
        outline: 2px solid ${activeColor};
        outline-offset: 1px;
    }

    &:active {
        background-color: ${activeColor};
        color: ${textOnPrimaryInverted};
    }

    &:disabled {
        background-color: ${disabled};
        color: ${disabledText};
        cursor: not-allowed;
    }
`

```

### Additional Button Variations

Modifiers in styled-components allow us to add additional modifications to our styled-components. For the example of the button, we will add two modifiers for bigger and smaller Primary Buttons.

First install the `styled-components-modifiers` package

```
    npm i styled-components-modifiers
```

After this, we will go ahead and define our `BUTTON_MODIFIERS`, which is a configuration object of functions that return CSS styled strings.

```javascript
// Buttons.js
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const BUTTON_MODIFIERS = {
    small: () => `
      font-size: 0.8rem;
      padding: 8px;
    `,
    large: () => `
      font-size: 1.5rem;
      padding: 16px 25px;
    `,
    warning: () =>  `
      background-color: #F2DC12;
      color: black;

      &:hover, &:focus, &:active {
          background-color: #F2DC12;
          color: black;
          outline: none;
      }
    `
}

...

```

We will then apply the modifiers <strong>in the last line of our defined PrimaryButton</strong>, such that it is not overridden by any of the defined styles.

```javascript
// Buttons.js

...

const PrimaryButton = styled(Button)`
    // CSS / SCSS goes in here
    background-color: ${primaryColor};
    border: none;
    color: ${textOnPrimary};

    &:hover {
        background-color: ${hoverColor};
        color: ${textOnPrimaryInverted};
    }

    ...

    ${applyStyleModifiers(BUTTON_MODIFIERS)}
`

export default PrimaryButton;

```

In `App.js`, we are then able to utilize modifiers like so:

```javascript

    <PrimaryButton modifiers="large">A Large Button</PrimaryButton>

    <PrimaryButton modifiers="small">A Small Button</PrimaryButton>

    <PrimaryButton modifiers={["large", "warning"]}>A Large Warning Button</PrimaryButton>

```

### Global Styles with Polished

You can also define Global styles with styled components. We will also be installing the polished dependency to utilize some additional functionality for CSS in JS type of projects

- `npm install polished`

- `import { createGlobalStyle } from "styled-components'`

- define and export your GlobalStyle with `createGlobalStyle`

- import GlobalStyle to `index.js`, and place it right underneath your `App` component.

```javascript
// utils / Global.js
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

// CSS RESET
// Base Font Size: 16px
export const GlobalStyle = createGlobalStyle`
    // Cross Browser Compatibility
    ${normalize()}
    html {
        font-size: 16px;
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        font-family: 'Menlo', monospace;
    }

    main {
        width: 90%;
        margin: 0 auto;
    }
`;
```

And import GlobalStyle into `index.js`

```javascript
// index.js
...
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

```

### Building a Modal with Composite Styled Components

![Modal](./markdown/images/modal.png)

In the second part of this lesson we will be building a modal in order to call our users to action. This is a great way of leading them to a login / signup page. For this example I used an open source illustration from [undraw.io](https://undraw.co/) as well as an icon from [Font Awesome](https://fontawesome.com/)

#### 1. Create your Modals.js in /components

```
touch components/Modals.js
```

#### 2. Create your ModalWrapper component to wrap all sub-components.

First, create your parent component that will house all other components of the modal.

```javascript
// Modals.js

import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  width: 800px;
  height: 550px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 2px;
  font-family: 'Menlo', monospace;
`;
```

#### 3. Create Your Header and Text Component for the Modal.

We will then create the `SignUpHeader` and `SignUpText`.

```javascript
// Modals.js

const SignUpHeader = styled.h3`
  font-size: 2rem;
  margin-bottom: 0;
`;

const SignUpText = styled.p`
  font-size: 1rem;
  max-width: 70%;
  text-align: center;
`;
```

#### 4. Create a stateless functional component which will act as our modal.

```javascript
// Modal.js

// import the PrimaryButton
import { PrimaryButton } from './Buttons';

export const SignUpModal = () => {
  return (
    <ModalWrapper>
      <SignUpHeader>Sign Up!</SignUpHeader>
      <SignUpText>Sign up today to get access to cool things!</SignUpText>
      <PrimaryButton>Submit</PrimaryButton>
    </ModalWrapper>
  );
};
```

#### 5. Make a directory called `assets`, to hold our illustrations and icons.

Your assets directory will look something like so:

![asset structure](./markdown/images/assets.png)

- `mkdir` a `icons` and `illustrations`. And `touch index.js` in your assets directory.

- Drag the `signup.svg` from undraw.io into your illustrations folder. We will then export this in our `index.js` and use it as the `src` of an `img`

```javascript
// assets/index.js

import SignUp from './illustrations/signup.svg';

export const Illustrations = {
  SignUp,
};
```

- `touch icons/close-icon.js` to hold our fontawesome icon. We will export this as a styled component.

```javascript
// assets/icons/close-icon.js

import React from 'react';
import styled from 'styled-components';

const CloseIconWrapper = styled.svg`
  width: 100%;
  height: 100%;
`;

export const CloseIcon = () => (
  <CloseIconWrapper aria-hidden='true'>
    <svg
      aria-hidden='true'
      focusable='false'
      data-prefix='far'
      data-icon='times'
      className='svg-inline--fa fa-times fa-w-10'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 320 512'
    >
      <path
        fill='currentColor'
        d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'
      ></path>
    </svg>
  </CloseIconWrapper>
);
```

- export the `CloseIcon` component from our `index.js`

```javascript
// assets/index.js

export * from './icons/close-icon';
```

#### 6. Import our assets into `Modals.js` and render them

```javascript
// Modals.js

import { Illustrations, CloseIcon } from '../assets';

// Button to wrap our CloseIcon component
const CloseModalButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  right: 40px;
  top: 40px;
  width: 24px;
  height: 24px;
  padding: 0;
`;

export const SignUpModal = () => {
  return (
    <ModalWrapper>
      <img
        src={Illustrations.SignUp}
        alt='Sign up for an account'
        aria-hidden='true'
      />
      <SignUpHeader>Sign Up!</SignUpHeader>
      <SignUpText>Sign up today to get access to cool things!</SignUpText>
      <PrimaryButton>Submit</PrimaryButton>
      <CloseModalButton aria-label='Close modal'>
        <CloseIcon />
      </CloseModalButton>
    </ModalWrapper>
  );
};
```

#### 7. Let's create give App a flex container and render a button and a modal.

```javascript
// App.js
import React from 'react';
import { PrimaryButton } from './components/Buttons';
import { SignUpModal } from './components/Modals';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
      }}
    >
      <h1>My Styled Components</h1>
      <PrimaryButton>Click Me</PrimaryButton>
      <SignUpModal />
    </div>
  );
}

export default App;
```

### Animation and functionality with react spring

#### 1. Add state to our App component

In `App.js`, we want to import `useState` to create a toggle state for our modal.

- `import React, { useState } from 'react`;

- initialize `showModal` and `setShowModal` with a default value of `false`

- add an `onClick` listener to our `PrimaryButton`

- pass the useState properties to the `SignUpModal`

```javascript
// App.js

import React, { useState } from 'react';
import { PrimaryButton } from './components/Buttons';
import { SignUpModal } from './components/Modals';

function App() {
  // useState hook
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
      }}
    >
      <h1>My Styled Components</h1>

      <PrimaryButton onClick={() => setShowModal(!showModal)}>
        Click Me
      </PrimaryButton>

      <SignUpModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default App;
```

#### 2. Add animation to our modal

- First we will `npm install react-spring`

- Next, `import { useSpring, animated } from 'react-spring'` in our `Modals.js`

- Define the animation style in our `SignUpModal` component

- wrap the entire `SignUpModal` in an `<animated.div style={animated}>`

- Finally remember to add the `setShowModal` callback to the `CloseModalButton`

```javascript
// Modals.js

import { useSpring, animated } from 'react-spring';

...

export const SignUpModal = (props) => {
    const animation = useSpring({
        opacity: props.showModal ? 1 : 0,
        transform: props.showModal ? `translateY(0)` : `translateY(-200%)`
    });
    return (
        <animated.div style={animation}>
            <ModalWrapper>
                <img
                    src={Illustrations.SignUp}
                    alt="Sign up for an account"
                    aria-hidden="true"
                />
                <SignUpHeader>Sign Up!</SignUpHeader>
                <SignUpText>Sign up today to get access to cool things!</SignUpText>
                <PrimaryButton>Submit</PrimaryButton>
                <CloseModalButton
                    aria-label="Close modal"
                    onClick={() => props.setShowModal(false)}
                >
                    <CloseIcon/>
                </CloseModalButton>
            </ModalWrapper>
        </animated.div>
    )
}

```

<strong>Alternatively, you can restyle the `ModalWrapper` as an animated div</strong>

```javascript
// Modals.js

const ModalWrapper = styled(animated.div)`
...
`
// apply animation like so
...
<ModalWrapper style={animation}>

```

### In conclusion

Styled-Components removes the need for additional css files and style leaking. It keeps all of your components isolated and style independent and makes updating a particular component much easier.

#### Additional Resources

If you're interested in other CSS in JS libraries, check out [Emotion](https://emotion.sh/docs/introduction) which is very similar to styled-components. Another library for writing styles in JS is [Polished](https://polished.js.org/) and allows for a variety of mixins to dry up your code.
