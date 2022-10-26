const pool =  require('../Database/databaseConnect');

//Simple baseclass for storing data
class BaseService {

    constructor(table_name) {
        this.table_name = table_name;
    }

    /*****GET Records with pagination*****/

    async getRecordByPageNo(size, page) {
        console.log("hello")
        var collection = null;
        var sleep_local_instance = this.sleep;
        var page = page;
        var size = size; 
        pool.query(`SELECT * FROM ${this.table_name} ORDER BY id LIMIT $2 OFFSET (($1 -1 )*$2)`,[page,size], (error, results) => {
            if (error) {
                throw error
            } else {
                collection = results.rows;
                // return collection;
            }
            // console.log(collection);
        })
        while (collection == null) {
            await sleep_local_instance(500);
        }
        return collection;
    }

    /*****Get All the Records**********/
    async getAll() {
        console.log("hello")
        var collection = null;
        var sleep_local_instance = this.sleep;
        pool.query(`SELECT * FROM ${this.table_name} ORDER BY id ASC`, (error, results) => {
            if (error) {
                throw error
            } else {
                collection = results.rows;
                // return collection;
            }
            // console.log(collection);
        })
        while (collection == null) {
            await sleep_local_instance(500);
        }
        return collection;
    }
    async sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }
    /*****Get the Records by Id**********/
    async getRecordById(id) {
        var collection = null;
        var sleep_local_instance = this.sleep;
        const id_int = parseInt(id)
        pool.query(`SELECT * FROM  ${this.table_name} WHERE id = $1`, [id_int], (error, results) => {
            if (error) {
                throw error
            } else {
                collection = results.rows;
            }
        })
        while (collection == null) {
            await sleep_local_instance(500);
        }
        return collection;
    }

    /**
     * 
     * @param data: data that needs to be added to  
     */
    createRecord(data) {
        // const { name, age } = data
        // console.log(name , age);   
        // var a = Object.keys(data);
        // console.log(a);
        // a = data
        // console.log(a)
        // const a = Object.values(data);
        // console.log(a);
        var values ='';
        var keys ='';
        for(let [key,value] of Object.entries(data)){
            console.log(value)
            values+="'"+value+"'"+',';
            keys+= key+",";
        }
        values = values.slice(0,values.length-1);
        keys = keys.slice(0,keys.length-1);
        pool.query(`INSERT INTO  ${this.table_name} (${keys}) VALUES (${values})`,(error, results) => {
            if (error) {
                console.log("oops"+ error);
            }
            else{
                console.log("User added!")
            }
        })
    }
    updateRecord(id, data) {
        const id_int = parseInt(id)
        let str ='';
        for(let [key, value] of Object.entries(data)){
            str+= key+ '=' + "'"+value+"'"+ ','
            // console.log(key , value);  
        }
        str = str.slice(0,str.length-1);
        console.log(str);
        pool.query(
            `UPDATE ${this.table_name} SET ${str} WHERE id = ${id_int}`,(error, results) => {
                if (error) {
                    throw error
                }
                console.log(`User modified with ID: ${id_int}`)
            }
        )
    }
    deleteRecord(id) {
        const id_int = parseInt(id)
        pool.query(`DELETE FROM  ${this.table_name} WHERE id = $1`, [id], (error, results) => {
            if (error) {
                throw error
            }
           console.log(`User deleted with ID: ${id_int}`)
        })
    }

}
module.exports = BaseService;