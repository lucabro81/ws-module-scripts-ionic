
const utils = exports;

// DEFAULT CONFIG
let config_basePath  = "src/";
let config_appModule = "app/app.module.ts";
let config_services  = "services/web/";
let config_endpoints = "utils/Endpoints.ts";

if (process.env.npm_package_config_basePath) {
    config_basePath = process.env.npm_package_config_basePath;
}

if (process.env.npm_package_config_appModule) {
    config_appModule = process.env.npm_package_config_appModule;
}

if (process.env.npm_package_config_services) {
    config_services = process.env.npm_package_config_services;
}

if (process.env.npm_package_config_endpoints) {
    config_endpoints = process.env.npm_package_config_endpoints;
}

utils.base_path = process.cwd() + "/" + config_basePath;
utils.path_app_module = process.cwd() + "/" + config_endpoints;
utils.path_services = utils.base_path + config_services;
utils.path_endpoints = utils.base_path + config_endpoints;

/**
 *
 * @param string
 * @returns {string}
 */
utils.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 *
 * @param obj
 * @returns {Array}
 */
utils.objToArray = function(obj) {

    let array = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            array.push({
                key: key,
                obj: obj[key]
            })
        }
    }

    return array;

};

/**
 * determina se la risposta data è positiva
 *
 * @param response
 * @returns {boolean}
 */
utils.yes = function(response) {

    let response_uc = response.toUpperCase();

    return (response_uc === "SI") ||
        (response_uc === "S") ||
        (response_uc === "Y") ||
        (response_uc === "YES") ||
        (response_uc === "OK") ||
        (response_uc === "TRUE") ||
        (response_uc === "VERO") ||
        (response_uc.includes("SI CAZZO")) ||
        (response_uc.includes("FUCKYEAH!")) ||
        (response_uc.includes("FUCK YEAH!"));
};

/**
 * determina se la risposta data è negativa
 *
 * @param response
 * @returns {boolean}
 */
utils.no = function(response) {

    let response_uc = response.toUpperCase();

    return (response_uc === "NO") ||
        (response_uc === "N") ||
        (response_uc === "NOPE") ||
        (response_uc === "FALSE") ||
        (response_uc === "FALSO") ||
        (response_uc.includes("NO CAZZO")) ||
        (response_uc.includes("FUCKNOPE!")) ||
        (response_uc.includes("FUCK NOPE!"));
};

/**
 * associa ad una risposta positiva true e a quella negativa false, qualunque altra risposta sarà false
 *
 * @param response
 * @returns {boolean}
 */
utils.getResponse = function(response) {
    if (utils.yes(response)) {
        return true;
    }
    else if (utils.no(response)) {
        return false;
    }
    return false;
};

/**
 * creazione dell'array di possibilità partendo dalla classe degli endpoint
 *
 * @returns {Array}
 */
utils.askForEndpoints = function(endpoints_class, stdout) {
    let endpoint_arr = utils.objToArray(endpoints_class);
    let select_endpoint_question = "";
    select_endpoint_question += "Seleziona fra i seguenti gli endpoint con cui fare il web service:\n\n";

    endpoint_arr.forEach((obj, index) => {
        select_endpoint_question += "[" + index + "]" + obj.key + "\n";
    });

    stdout.write(select_endpoint_question + "\n(utilizza i numeri separati da uno spazio):");

    return endpoint_arr;
};

/**
 * ricavo i metodi dagli indici
 *
 * @param index_metodi_arr
 * @param endpoint_arr
 * @returns {Array}
 */
utils.createNameArray = function(index_metodi_arr, endpoint_arr) {
    let nomi_metodi_arr = [];
    index_metodi_arr.forEach((num) => {
        let key = endpoint_arr[parseInt(num)].key.toLowerCase();
        let name = key.split("_")
            .map((str, index) => {
                return (index > 0) ? utils.capitalizeFirstLetter(str) : str
            })
            .join("");
        nomi_metodi_arr.push(name);
    });

    return nomi_metodi_arr;
};