const { renderTemplate } = require("../utils/renderTemplate.js");
const sql = require("./db.js");
const fs = require("fs");
const path = require("path");

// constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.phone = user.phone;
  this.summary = user.summary;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM users";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.getAllWithPagination = (name, page, limit, result) => {
  let offset = (page - 1) * limit;
  let query = "SELECT * FROM users";

  if (name) {
    query += ` WHERE name LIKE ?`;
  }

  query += " LIMIT ? OFFSET ?";

  let params = name
    ? [`%${name}%`, parseInt(limit), parseInt(offset)]
    : [parseInt(limit), parseInt(offset)];

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, email = ?, phone = ?, summary = ? WHERE id = ?",
    [user.name, user.email, user.phone, user.summary, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

User.generateResume = (id, result) => {
  const query = `
   SELECT * FROM users WHERE id = ${id}
  `;

  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("Error fetching user ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      const userData = res[0];

      try {
        const templatePath = path.join(__dirname, "../resumeTemplate.html");
        const templateContent = fs.readFileSync(templatePath, "utf8");

        const finalResumeHtml = renderTemplate(templateContent, userData);

        result(null, finalResumeHtml); 
      } catch (templateError) {
        console.error("Template rendering error:", templateError);
        result(templateError, null);
      }

      return;
    }

    // If no user is found
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
