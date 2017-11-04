/* Get the students listing */
exports.lists = function(req, res) {
    req.getConnection(function(err, con) {
        con.query('SELECT * FROM students', function(err, rows) {
            if (err) console.log('Error selecting: %s', err);
            res.render('view_students', { title: 'show all students', data: rows });
        });
    });
};

/* Show the form for adding students */
exports.add = function(req, res) {
    res.render('add_students', { title: 'Add Students' });
}

/* Edit students records */
exports.edit = function(req, res) {
    var id = req.params.id;
    req.getConnection(function(err, con) {
        con.query('SELECT * FROM students WHERE id=?', [id], function(err, rows) {
            if (err) console.log('Error Selecting: %s', err);
            res.render('edit_students', { title: 'Edit Students', data: rows });
        });
    });
};

/* Save students records */
exports.save = function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, con) {
        var data = {
            full_name: input.name,
            email: input.email
        };
        console.log(data);
        var query = con.query('INSERT INTO students set?', data, function(err, rows) {
            if (err) console.log('Error Inserting: %s', err);
            res.redirect('/students');
        });
        // console.log(query.sql);
    });
};


/* save the edited records */
exports.save_edit = function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, con) {
        var data = {
            full_name: input.name,
            email: input.email
        };
        con.query('UPDATE students set? WHERE id=?', [data, id], function() {
            if (err) console.log('Error Updating: %s', err);
            res.redirect('/students');
        });
    });
};

/* Delete record */
exports.delete_customer = function(req, res) {
    var id = req.params.id;
    req.getConnection(function(err, con) {
        con.query('DELETE FROM students WHERE id=?', [id], function(err, rows) {
            if (err) console.log('Error Deleting: %s', err);
            res.redirect('/students');
        })
    });
}