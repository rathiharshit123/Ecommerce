const logger = require("../utils/logger");
const constants = require("../utils/constants");


class ProductFeatures {

    query;
    queryStr;

    constructor(_query,_queryStr){
        this.query = _query;
        this.queryStr = _queryStr;
    }
    
    search(){
        const toSearch = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            },
        } : {}

        logger.info({msg: "Query to search",toSearch});
        this.query = this.query.find(toSearch);
        return this;
    }

    filter(){
        let fieldsToRemove = constants.FEILDS_TO_REMOVE_FOR_FILTER;

        const copyOfQuery = {...this.queryStr};
        fieldsToRemove.forEach(element => {
            delete copyOfQuery[element];
        });

        //For price and rating filters
        let filterQuery = JSON.stringify(copyOfQuery);
        filterQuery = JSON.parse(filterQuery.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`));

        logger.info({msg: "Filter Query",filterQuery})

        this.query = this.query.find(filterQuery);

        return this
    }

    pagination(resultPerPage){
        let currentPage = Number(this.queryStr.page) || 1;

        let prductsToSkip = resultPerPage * (currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(prductsToSkip);
        return this;
    }
}

module.exports = ProductFeatures;