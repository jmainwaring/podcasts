module.exports.generateUpdateStatement = (tableName, valuesAndCondition) => {
    
    /* Generates the SQL command for an UPDATE statement. The valuesAndCondition argument
    should be an array passed into the request body where the first element is an object 
    with the columns and values to update, and the second element is the condition for which 
    rows to update. For example: [{ income: 200000,  age: 34 }, { name: 'Sarah' }]. It can
    be passed in directly into the body as JSON like so: 
    {"valuesAndCondition": [{ "group_name": "Jake policy" }, { "id_group": 3 }]} */

    const baseSql = `UPDATE ${tableName} SET ? WHERE ?`;

    return [baseSql, valuesAndCondition]
};

