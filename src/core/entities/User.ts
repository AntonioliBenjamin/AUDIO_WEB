export enum ConnectMethod {
  google = "google",
  facebook = "facebook",
  email = "email",
}

export type UserProperties = {
  id: string;
  username: string;
  email: string;
  connectMethod: ConnectMethod;
  password: string;
  profilePicture?: string;
  createdAt: Date;
  confirmedAt: Date;
};

export class User {
  props: UserProperties;

  constructor(props: UserProperties) {
    this.props = props;
  }

  static create(props: {
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    id: string;
  }) {
    return new User({
      id: props.id,
      username: props.username.trim(),
      email: props.email.toLowerCase().trim(),
      connectMethod: null,
      password: props.password,
      profilePicture: props.profilePicture,
      createdAt: new Date(),
      confirmedAt: null,
    });
  }

  update(props: {
    username: string;
    profilePicture: string;
    connectMethod: ConnectMethod;
    password: string;
  }) {
    this.props.username = props.username;
    this.props.profilePicture = props.profilePicture;
    this.props.connectMethod = props.connectMethod;
    this.props.password = props.password;
  }
}
