db.createUser(
  {
    user: "blogUser",
    pwd: "blogPassword",
    roles: [
      {
        role: "readWrite",
        db: "blogpostsdemo"
      }
    ]
  }
);
