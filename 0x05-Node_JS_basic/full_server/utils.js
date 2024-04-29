const fs = require('fs');

function readDatabase(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Cannot load the database');
            } else {
                const lines = data.trim().split('\n').filter(line => line.trim() !== '');
                const studentsByField = {};

                lines.forEach(line => {
                    const [, , , field] = line.split(',');
                    if (!studentsByField[field]) {
                        studentsByField[field] = [];
                    }
                    studentsByField[field].push(line.split(',')[0]);
                });

                resolve(studentsByField);
            }
        });
    });
}

module.exports = { readDatabase };
