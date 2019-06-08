import { User } from '../../users/models/user';

export class Team {

  name: string;
  description: string;
  slug: string;
  members: User[];
  admin: User;

  constructor(name: string = null, description: string = null, slug: string = null, admin: User = null, members: User[] = null) {
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.admin = admin;
    this.members = members;
  }
}
