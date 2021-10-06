const Computer = require('../models/computer.model');
const User = require('../models/user.model');
const searchHistoryCtrl = require('./search-history.controller');

/**
 * Crea la computadora
 * @param computer Computer
 * @returns Computer
*/
async function create(computer) {   
    try {

        computer.scores = getScoring(computer);
        const createdComputer = await Computer(computer).save();
        return createdComputer;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Get a computer by Id.
 * @param id string - ObjectId
 * @returns Computer
*/
async function get(id) {
    try {
        const computer = await Computer.findOne({
            '_id': id
        }).populate({ path: 'comments.user',  model: User, select: 'name lastName image'});
        return computer;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Updates a computer data and returns the updated computer
 * @param computer Computer
 * @returns Computer
*/
async function update(computer) {
    try {
        const updatedComputer = await Computer.findOneAndUpdate(
            { _id: computer._id },
            computer,
            { new: true }
        );
        return updatedComputer;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Get computers by filers
 * @returns Array of Computer
*/
async function search(filters) {
    try {
        console.log(filters);
        const computers = await Computer.find(filters);
        return computers;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Add a comment to a computer
 * @returns computer with the comments
*/
async function addComment(comment, computerId) {
    try {
        let computer = await Computer.findOne({
            '_id': computerId
        });

        let averageRating = 0;
        for (let i = 0; i < computer.comments.length; i++) {
            averageRating += computer.comments[i].rating;
        }
        averageRating += comment.rating;
        averageRating = averageRating/(computer.comments.length + 1);
        averageRating = averageRating.toFixed(2);
        averageRating = Number(averageRating);
        computer = await Computer.findOneAndUpdate(
            { _id: computerId},
            {
                $push: { comments: comment},
                rating: averageRating
            },
            { new: true }
        ).populate({ path: 'comments.user',  model: User, select: 'name lastName image'});
        return computer;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Removes a comment from a computer
 * @returns computer with the comments
*/
async function removeComment(commentId, computerId) {
    try {
        let computer = await Computer.findOne({
            '_id': computerId
        });

        let averageRating = 0;
        for (let i = 0; i < computer.comments.length; i++) {
            if (commentId === computer.comments[i]._id) {
                averageRating += computer.comments[i].rating;
            }
        }
        if (averageRating !== 0) {
            averageRating = averageRating/(computer.comments.length + 1);
            averageRating = averageRating.toFixed(2);
            averageRating = Number(averageRating);
        }
        computer = await Computer.findOneAndUpdate(
            { _id: computerId},
            {
                $pull: { comments: {'_id': { $in: [commentId] }}},
                rating: averageRating
            },
            { new: true }
        ).populate({ path: 'comments.user',  model: User, select: 'name lastName image'});
        return computer;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Get an array of computers based on their scores
 * @param filters Filters
 * @returns Array of Computer
*/
async function searchByScore(answers, usageProfiles, type, userId, isNewSearch) {
    try {
        if (typeof userId !== 'undefined' && userId !== null && isNewSearch) {
            console.log('hola');
            const searchHistory = {
                type,
                usageProfiles,
                user: userId,
                answers
            };

            await searchHistoryCtrl.create(searchHistory);
        }

        var filters = {
            "processorMinScore": 0,
            "processorMaxScore": 0,
            "ramMinScore": 0,
            "ramMaxScore": 0,
            "storageMinScore": 0,
            "storageMaxScore": 0,
            "graphicsCardMinScore": 0,
            "graphicsCardMaxScore": 0
        };
        for (var i = 0; i < answers.length; i++) {
            // console.log(answers[i]);
            filters = await updateFilters(filters, answers[i]);
        }
        console.log(filters);
        return getComputerByFiltersQuery(filters, type);
        //return getComputerByFiltersQueryMin(filters, type);
        //return getComputerByFiltersQueryMinOr(filters, type);
    } catch (error) {
        console.log(error);
        return error;
    }
}

function updateFilters(filters, answer) {
    var fieldNames = Object.keys(answer);
    for (var i = 0; i < fieldNames.length; i++) {
        if (fieldNames[i] == "label" || fieldNames[i] == "value")
            continue;
        if (answer[fieldNames[i]] > filters[fieldNames[i]])
            filters[fieldNames[i]] = answer[fieldNames[i]];
    }
    return filters;
}

async function getComputerByFiltersQuery(filters, type) {
    let computers = await Computer.find({
        "scores.processorScore": { $gte: filters.processorMinScore, $lte: filters.processorMaxScore },
        // "scores.processorScore": { $lte: filters.processorMaxScore },
        "scores.ramScore": { $gte: filters.ramMinScore, $lte: filters.ramMaxScore },
        // "scores.ramScore": { $lte: filters.ramMaxScore },
        "scores.storageScore": { $gte: filters.storageMinScore, $lte: filters.storageMaxScore },
        // "scores.storageScore": { $lte: filters.storageMaxScore },
        "scores.graphicsCardScore": { $gte: filters.graphicsCardMinScore, $lte: filters.graphicsCardMaxScore },
        // "scores.graphicsCardScore": { $lte: filters.graphicsCardMaxScore },
        'computerType': type
    }).sort({ "scores.processorScore": 1, "scores.ramScore": 1, "scores.storageScore": 1, "scores.graphicsCardScore": 1 });
    console.log(computers);
    if (computers.length === 0) {
        const orderedFilters = orderFiltersByMinScore(filters);
        // console.log(orderedFilters);
        for (let i = 0; i < orderedFilters.length; i++) {
            const findObject = {'computerType': type};
            findObject['scores.' + orderedFilters[i].spec + 'Score'] = { $gte: orderedFilters[i].min, $lte: orderedFilters[i].max };
            computers = await Computer.find(findObject);
            if (computers.length !== 0) {
                break;
            }
        }
    }
    // console.log(computers);
    return orderByComputerByPromedio(computers, filters);
}

function orderFiltersByMinScore(filters) {
    const orderedFilters = [];
    for (const filter in filters) {
        if (filters.hasOwnProperty(filter) && filter.indexOf('Min') !== -1) {
            const filterItem = {
                min: filters[filter],
                max: filters[filter.substring(0, filter.indexOf('Min')) + 'MaxScore'],
                spec: filter.substring(0, filter.indexOf('Min'))
            }
            orderedFilters.push(filterItem);
        }
    }

    return orderedFilters.sort((a, b) => {
        return b.min - a.min;
    });
}

/**
 * busca la computadora que coumple con los requistos minimos y maximos.
 * @param computer
 * @returns scores
*/
async function getComputerByFiltersQueryMinOr(filters, type) {
    const computers = await Computer.find({
        "$or":[
            { "scores.processorScore": { $gte: filters.processorMinScore} },
            { "scores.ramScore": { $gte: filters.ramMinScore} },
            { "scores.storageScore": { $gte: filters.storageMinScore} },
            { "scores.graphicsCardScore": { $gte: filters.graphicsCardMinScore} },
        ],
        'computerType': type
    }).sort({ "scores.processorScore": 1, "scores.ramScore": 1, "scores.storageScore": 1, "scores.graphicsCardScore": 1 });
        return orderByComputerByPromedio(computers);
}

async function getComputerByFiltersQueryMin(filters, type) {
    const computers = await Computer.find({
        "scores.processorScore": { $gte: filters.processorMinScore },
        "scores.ramScore": { $gte: filters.ramMinScore },
        "scores.storageScore": { $gte: filters.storageMinScore },
        "scores.graphicsCardScore": { $gte: filters.graphicsCardMinScore },
        'computerType': type
    }).sort({ "scores.processorScore": 1, "scores.ramScore": 1, "scores.storageScore": 1, "scores.graphicsCardScore": 1 });
    console.log(computers);
    return orderByComputerByPromedio(computers);
}

/**
 * Calcula y ordena las computadores por scores.
 * @param {array} computers 
 */
function orderByComputerByPromedio(computers, filters) {
    promedios = [];
    for (let index = 0; index < computers.length; index++) {
        const element = computers[index];
        var computerAvg = { "avg": 0, "computer": Computer }
        computerAvg.avg = getAvg(element.scores, filters);
        computerAvg.computer = element;
        promedios[index] = computerAvg;
    }
    computers = [];
    // console.log(promedios);
    i = 0;
    orderByDesc(promedios).forEach(element => {
        console.log("Promedios: " + element.avg + " computer: " + element.computer.name);
        computers[i] = element.computer;
        i++;
    });
    return computers;
}

/**
 * Ordena el array de promedios por score de computadoras.
 * @param {computerAvg} promedios 
 */
function orderByDesc(promedios) {
    return promedios.sort(function (a, b) { return a.avg - b.avg });
}

/**
 * Calcula el promedio de los score de  computadoras.
 * @param {Computer.scores} scores 
 */
function getAvg(scores, filters) {
    let averages = {};
    for (const filter in filters) {
        if (filters.hasOwnProperty(filter) && filter.indexOf('Min') !== -1) {
            const filterType = filter.substring(0, filter.indexOf('Min'));
            const filterAvg = (filters[filter] + filters[filterType + 'MaxScore']) / 2;
            averages[filterType] = Math.abs(scores[filterType + 'Score'] - filterAvg);
        }
    }
    // console.log(averages);
    return ((averages.processor + averages.ram + averages.storage + averages.graphicsCard) / 4)
    //return ((scores.processorScore + scores.ramScore + scores.storageScore + scores.graphicsCardScore) / 4)
}

/**
 * Generate computer's score based on the full specification.
 * @param computer
 * @returns scores
*/
function getScoring(computer) {
    try {
        const scores = {};
        scores.processorScore = getProcessorScoring(computer.specifications.processor, computer.computerType.toUpperCase());
        scores.ramScore = getRamScoring(computer.specifications.memory, computer.computerType.toUpperCase());
        scores.storageScore = getStorageScoring(computer.specifications.storage, computer.computerType.toUpperCase());
        scores.graphicsCardScore = getGraphicsCardScoring(computer.specifications.graphicsCard, computer.computerType.toUpperCase());
        // console.log(scores);
        return scores;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * It generates processor scoring based on the processor's specification.
 * @param processorSpecs
 * @param computerType
 * @returns Processor Scoring
*/
function getProcessorScoring(processorSpecs, computerType) {
    try {
        let score = 0;
        let aux = 0;


        //It calculates scoring based on brand.
        switch (processorSpecs.brand.toUpperCase()) {
            case "INTEL":
                score += 20;
                break;
            case "AMD":
                score += 15;
                break;
        }

        //It calculates scoring based on processor's cores.
        aux = processorSpecs.cores;
        switch (true) {
            case aux <= 2:
                score += 5;
                break;
            case aux <= 4:
                score += 10;
                break;
            case aux <= 6:
                score += 15;
                break;
            case aux <= 8:
                score += 20;
                break;
            case aux > 8:
                score += 25;
                break;
        }

        //It calculates scoring based on processor's cache memory (MB).
        aux = processorSpecs.cache;
        switch (true) {
            case aux <= 1:
                score += 2;
                break;
            case aux <= 2:
                score += 3;
                break;
            case aux <= 3:
                score += 4;
                break;
            case aux <= 4:
                score += 5;
                break;
            case aux <= 8:
                score += 7;
                break;
            case aux <= 12:
                score += 10;
                break;
            case aux > 12:
                score += 15;
                break;
        }


        switch (computerType) {

            //It calculates processor scoring for PC category.
            case "PC":

                //It calculates scoring based on processor's rate (GHz).
                aux = processorSpecs.rate;
                switch (true) {
                    case aux <= 2.8:
                        score += 5;
                        break;
                    case aux <= 3.5:
                        score += 10;
                        break;
                    case aux <= 3.6:
                        score += 15;
                        break;
                    case aux <= 3.7:
                        score += 20;
                        break;
                    case aux <= 3.8:
                        score += 25;
                        break;
                    case aux <= 4:
                        score += 30;
                        break;
                    case aux <= 4.2:
                        score += 35;
                        break;
                    case aux > 4.2:
                        score += 40;
                }

                break;

            //It calculates processor scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":

                //It calculates scoring based on processor's rate (Ghz).
                aux = processorSpecs.rate;
                switch (true) {
                    case aux <= 1.1:
                        score += 5;
                        break;
                    case aux <= 1.2:
                        score += 7;
                        break;
                    case aux <= 1.3:
                        score += 10;
                        break;
                    case aux <= 1.4:
                        score += 14;
                        break;
                    case aux <= 1.5:
                        score += 15;
                        break;
                    case aux <= 1.6:
                        score += 16;
                        break;
                    case aux <= 1.8:
                        score += 18;
                        break;
                    case aux <= 2.1:
                        score += 21;
                        break;
                    case aux <= 2.2:
                        score += 22;
                        break;
                    case aux <= 2.3:
                        score += 23;
                        break;
                    case aux <= 2.6:
                        score += 25;
                        break;
                    case aux <= 3.4:
                        score += 30;
                        break;
                    case aux <= 3.6:
                        score += 33;
                        break;
                    case aux <= 4.5:
                        score += 35;
                        break;
                    case aux <= 4.6:
                        score += 37;
                        break;
                    case aux > 4.6:
                        score += 40;
                        break;
                }

                break;
        }
        return score;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * It generates ram scoring based on the ram's specification.
 * @param ramSpecs
 * @param computerType
 * @returns Ram Scoring
*/
function getRamScoring(ramSpecs, computerType) {
    try {
        let score = 0;
        let aux = 0;


        //It calculates scoring based on ram's memory (GB).
        score += ramSpecs.ram / 2;

        //It calculates scoring based on ram's types.
        switch (ramSpecs.ramType.toUpperCase()) {
            case 'DDR2':
                score += 5;
                break;
            case 'LPDDR2':
                score += 7;
                break;
            case 'LPDDR3':
                score += 12;
                break;
            case 'DDR3':
                score += 15;
                break;
            case 'DDR4':
                score += 25;
                break;
            case 'DDR5':
                score += 35;
                break;
        }


        switch (computerType) {

            //It calculates ram scoring for 'PC' category.
            case "PC":

                //It calculates scoring based on ram's speed (MHz).
                aux = ramSpecs.speed;
                switch (true) {
                    case aux <= 800:
                        score += 2;
                        break;
                    case aux <= 1600:
                        score += 5;
                        break;
                    case aux <= 2133:
                        score += 10;
                        break;
                    case aux <= 2400:
                        score += 17;
                        break;
                    case aux <= 3000:
                        score += 20;
                        break;
                    case aux <= 3200:
                        score += 35;
                        break;
                    case aux <= 4000:
                        score += 40;
                        break;
                    case aux > 4000:
                        score += 50;
                        break;
                }

                break;

            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":

                //It calculates scoring based on ram's speed (MHz).
                aux = ramSpecs.speed;
                switch (true) {
                    case aux <= 533:
                        score += 2;
                        break;
                    case aux <= 600:
                        score += 5;
                        break;
                    case aux <= 733:
                        score += 7;
                        break;
                    case aux <= 800:
                        score += 10;
                        break;
                    case aux <= 933:
                        score += 13;
                        break;
                    case aux <= 1000:
                        score += 15;
                        break;
                    case aux <= 1600:
                        score += 20;
                        break;
                    case aux <= 2133:
                        score += 25;
                        break;
                    case aux <= 2400:
                        score += 30;
                        break;
                    case aux <= 3000:
                        score += 35;
                        break;
                    case aux <= 3200:
                        score += 40;
                        break;
                    case aux <= 4000:
                        score += 45;
                        break;
                    case aux > 4000:
                        score += 50;
                        break;
                }

                break;
        }

        return score;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * It generates storage scoring based on the storage's specification.
 * @param storageSpecs
 * @param computerType
 * @returns Storage Scoring
*/
function getStorageScoring(storageSpecs, computerType) {
    try {
        let score = 0;
        let aux = 0;
        switch (computerType) {

            //It calculates scoring for 'PC' category.
            case "PC":

                //It calculates scoring based on storage type, its speed and space.
                aux = storageSpecs.speed;
                switch (storageSpecs.storageType.toUpperCase()) {

                    case 'HDD':
                        score += 5;

                        //It calculates scoring based on storage speed.
                        switch (true) {
                            case aux <= 5400:
                                score += 10;
                                break;
                            case aux <= 7200:
                                score += 15;
                                break;
                            case aux > 7200:
                                score += 20;
                                break;
                        }


                        //It calculates scoring based on storage space.
                        aux = storageSpecs.space;
                        switch (true) {
                            case aux <= 500:
                                score += 5;
                                break;
                            case aux <= 1000:
                                score += 10;
                                break;
                            case aux <= 2000:
                                score += 15;
                                break;
                            case aux > 2000:
                                score += 20;
                                break;
                        }

                        break;

                    case 'SSD':
                        score += 20;

                        //It calculates scoring based on storage speed.
                        switch (true) {
                            case aux <= 1400:
                                score += 5;
                                break;
                            case aux <= 1500:
                                score += 10;
                                break;
                            case aux <= 2800:
                                score += 20;
                                break;
                            case aux <= 3000:
                                score += 30;
                                break;
                            case aux > 3000:
                                score += 40;
                                break;
                        }



                        //It calculates scoring based on storage space.
                        aux = storageSpecs.space;
                        switch (true) {
                            case aux <= 32:
                                score += 5;
                                break;
                            case aux <= 64:
                                score += 10;
                                break;
                            case aux <= 128:
                                score += 20;
                                break;
                            case aux <= 256:
                                score += 30;
                                break;
                            case aux <= 512:
                                score += 40;
                                break;
                            case aux <= 1000:
                                score += 50;
                                break;
                            case aux > 1000:
                                score += 60;
                                break;
                        }

                        break;
                }

                break;

            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":


                //It calculates scoring based on storage type, its speed and space.
                aux = storageSpecs.speed;
                switch (storageSpecs.storageType.toUpperCase()) {

                    case 'HDD':
                        score += 5;

                        //It calculates scoring based on storage speed.
                        switch (true) {
                            case aux <= 5400:
                                score += 10;
                                break;
                            case aux <= 7200:
                                score += 15;
                                break;
                            case aux > 7200:
                                score += 20;
                                break;
                        }


                        //It calculates scoring based on storage space.
                        aux = storageSpecs.space;
                        switch (true) {
                            case aux <= 500:
                                score += 5;
                                break;
                            case aux <= 1000:
                                score += 10;
                                break;
                            case aux <= 2000:
                                score += 15;
                                break;
                            case aux > 2000:
                                score += 20;
                                break;
                        }

                        break;

                    case 'SSD':
                        score += 20;

                        //It calculates scoring based on storage speed.
                        switch (true) {
                            case aux <= 1400:
                                score += 5;
                                break;
                            case aux <= 1500:
                                score += 10;
                                break;
                            case aux <= 2800:
                                score += 20;
                                break;
                            case aux <= 3000:
                                score += 30;
                                break;
                            case aux > 3000:
                                score += 40;
                                break;
                        }


                        //It calculates scoring based on storage space.
                        aux = storageSpecs.space;
                        switch (true) {
                            case aux <= 32:
                                score += 5;
                                break;
                            case aux <= 64:
                                score += 10;
                                break;
                            case aux <= 128:
                                score += 20;
                                break;
                            case aux <= 256:
                                score += 30;
                                break;
                            case aux <= 512:
                                score += 40;
                                break;
                            case aux <= 1000:
                                score += 50;
                                break;
                            case aux > 1000:
                                score += 60;
                                break;
                        }

                        break;
                }

                break;
        }

        return score;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * It generates graphics card scoring based on the graphic card's specification.
 * @param graphicSpecs
 * @param computerType
 * @returns Graphic Card Scoring
*/
function getGraphicsCardScoring(graphicSpecs, computerType) {
    try {
        let score = 0;
        let aux = 0;

        //It calculates scoring based on graphics card brand.
        switch (graphicSpecs.brand) {
            case 'AMD':
                score += 5;
                break;
            case 'INTEL':
                score += 10;
                break;
            case 'NVIDIA':
                score += 10;
                break;
        }

        //It calculates scoring based on graphics card ram type.
        switch (graphicSpecs.ramType) {
            case 'DDR2':
                score += 5;
                break;
            case 'DDR3':
                score += 10;
                break;
            case 'DDR4':
                score += 15;
                break;
            case 'DDR5':
                score += 20;
                break;
            case 'GDDR6':
                score += 25;
                break;
            default:
                break;
        }


        switch (computerType) {

            //It calculates scoring for 'PC' category.
            case "PC":


                //It calculates scoring based on graphics card type and its ram.
                switch (graphicSpecs.graphicCardType) {
                    case 'INTEGRADA':
                        score += 10;
                        break;

                    case 'DEDICADA':
                        score += 25;

                        //It calculates scoring based on graphics ram.
                        aux = graphicSpecs.ram;
                        switch (true) {
                            case aux <= 1:
                                score += 5;
                                break;
                            case aux <= 3:
                                score += 10;
                                break;
                            case aux <= 6:
                                score += 20;
                                break;
                            case aux <= 8:
                                score += 30;
                                break;
                            case aux > 8:
                                score += 40;
                                break;
                        }

                        break;
                }

                break;


            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":


                //It calculates scoring based on graphics card type and its ram.
                switch (graphicSpecs.graphicCardType) {
                    case 'INTEGRADA':
                        score += 10;
                        break;

                    case 'DEDICADA':
                        score += 30;

                        //It calculates scoring based on graphics ram.
                        aux = graphicSpecs.ram;
                        switch (true) {
                            case aux <= 1:
                                score += 5;
                                break;
                            case aux <= 3:
                                score += 10;
                                break;
                            case aux <= 6:
                                score += 20;
                                break;
                            case aux <= 8:
                                score += 30;
                                break;
                            case aux > 8:
                                score += 40;
                                break;
                        }

                        break;
                }

                break;
        }

        return score;
    } catch (error) {
        console.log(error);
        return error;
    }

}

module.exports = {
    create,
    get,
    update,
    search,
    addComment,
    removeComment,
    searchByScore
};
