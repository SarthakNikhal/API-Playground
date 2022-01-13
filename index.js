const path = require('path');
const Client = require('pg').Client
const express = require('express')

const app = express();
const PORT = process.env.PORT || 5000;

// Postgre Trial
const client = new Client({
    user: "sn",
    password: "sn",
    database: "postgres",
    table: "users"
})

app.get('/api/users', async (req, res) => {
    try{
        await client.connect();
        
        const results = await client.query("select id, name from users");
        console.table(results.rows);
        res.send({"users": results.rows});
        //await client.query()
    }
    catch(err){
            console.log(`Failed to execute something ${err}. Not cool.`);
    }

})

app.use(express.static(path.join(__dirname, "static")));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









// // Postgre Trial
// const client = new Client({
//     user: "sn",
//     password: "sn",
//     database: "postgres",
//     table: "users"
// })

async function execute(){
    try{
            await client.connect();

            // await client.query("BEGIN");
            // // Execute any stuff here. This a transaction
            // await client.query("COMMIT");
            
            const rows = await client.query("select * from users");
            console.table(rows);
            //await client.query()
    }
    catch(err){
            console.log(`Failed to execute something ${err}. Not cool.`);
            // Just in case in there i error, rollback the query
            // await client.query("ROLLBACK");
    }
    finally{
        await client.end();
        console.log("cleaned and over");
    }
}

// client.connect()
// .then(() => console.log("Connected Successfully!"))
// .then(() => client.query("select * from users"))
// .then(result => console.table(result.rows))
// .catch(err => console.log(err))
// .finally(() => client.end());

//console.log("Hello from index");