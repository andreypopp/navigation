# Navigation


## Installation

```
% npm install derivable history @andreypopp/navigation
```

## Usage

Basic usage is as follows:

```js
import history from '@andreypopp/navigation/browserHistory'

history.location.react(location => {
  // new location, do something, render your React component
})
```

If you want React components to re-render when location changes:

```js
import history from '@andreypopp/navigation/browserHistory'
import {reactive} from 'react-reactive'

let Router = reactive(props => {
  let loc = history.location.get()

  if (loc.pathname === '/') {
    return <Home />
  } else {
    return <NotFound />
  }
})
```
