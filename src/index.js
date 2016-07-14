/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

export withReactiveLocation from './withReactiveLocation';

let string;
let number;

class UserFriendConnectionList {

  static navigation = {
    params: {
      page: {type: number, default: 0}
    }
  };
}

class UserFriend {

  static navigation = {
    params: {friend: string},
    route: {
      connections: UserFriendConnectionList
    }
  };
}

class UserFriendList {

  static navigation = {
    params: {page: {type: number, default: 0}},
  };
}

class User {

  static navigation = {
    params: {user: string, full: true},
    route: {
      friends: [UserFriendList, UserFriend]
    }
  };
}

class Home { }

class About { }

class App {

  static navigation = {
    route: {
      index: Home,
      about: About,
      user: User,
    }
  };
}
