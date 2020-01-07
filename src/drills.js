const knex = require('knex');
require('dotenv').config();

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

function searchShoppingList(searchTerm){
    knexInstance
        .select()
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result);
        })

}

// searchShoppingList('sham');

function paginateList(page, resultsPerPage){
    const offset = resultsPerPage * (page - 1);
        
    knexInstance
        .select()
        .from('shopping_list')
        .limit(resultsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })

}

// paginateList(3, 10);

function selectBeforeDaysNumber(days){
    knexInstance
        .select()
        .from('shopping_list')
        .where('date_added', '>', knexInstance.raw(`now() -'?? days'::INTERVAL`, days))
        .then(result => {
            console.log(result);
        })
}

// selectBeforeDaysNumber(2);

function categoryPrice() {
  
    knexInstance
        .select('category')
        .from('shopping_list')
        .sum('price AS sum')
        .groupBy('category')
        .orderBy([
            {column: 'sum',
            order: 'ASC'}
        ])
        .then(result => {
          console.log(result);
        })
}

categoryPrice();

