import { User } from '../../users/models/user';

export class Team {

  id : string;
  name : string;
  description : string;
  slug : string;
  members : User[];
  admin : User;

  constructor(id : string = null, name : string = null, description : string = null, 
        slug : string = null, admin : User = null, members : User[] = []) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.admin = admin;
    this.members = members;
  }
}