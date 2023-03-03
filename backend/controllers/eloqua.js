const request = require('request');

const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.test = async (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://secure.p01.eloqua.com/api/REST/1.0/data/form/2047',
        'headers': {
            'Authorization': 'Basic VGhlcm1vRmlzaGVyU2NpZW50aWZpY0NDR1xMYXVyZW50Lk5penpvbGk6SmFuQDY3MTAw',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "type": "FormData",
            "fieldValues": [
                {
                    "id": "36976",
                    "value": "test other"
                }
            ]
        })
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};

const fetchData = async (link) => {
    try {
        const response = await fetch(`${link}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

exports.getUserByEmail = async (req, res) => {
    const { email } = req.body;
    const data = await fetchData(`https://ebiz.thermofisher.com/EU/eloqua/getCustomer.php?email=${email}`);
    res.json(data);
}

exports.checkIfUserPreRegister = async (req, res) => {
    const { email } = req.body;
    const data = await fetchData(`https://ebiz.thermofisher.com/EU/NLSU/2.0/index.php?action=checkRegistrationActivateScienceSanofi`);
    res.json(data);
}

exports.submitActivateScience = async (req, res) => {
    const { emailAddress, accountNumber,  firstName, lastName,
        company, businessPhone, address1, city,
        address2, zipPostal, country, comments, supplierEvent, requestType
    } = req.body;

    var options = {
        'method': 'POST',
        'url': 'https://ebiz.thermofisher.com/EU/NLSU/2.0/index.php?action=submitActivateScience',
        'headers': {
        },
        formData: {
            'emailAddress': emailAddress,
            'accountNumber': accountNumber,
            'firstName': firstName,
            'lastName': lastName,
            'company': company,
            'businessPhone': businessPhone,
            'address1': address1,
            'city': city,
            'address2': address2,
            'zipPostal': zipPostal,
            'country': country,
            'comments': comments,
            'supplierEvent': supplierEvent,
            'requestType': requestType,
            'title': 'title'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
}

exports.preRegisterActivateScience = async (req, res) => {
    const { emailAddress, accountNumber,  firstName, lastName,
        company, businessPhone, address1, city,
        address2, zipPostal, country, title,
    } = req.body;

    var options = {
        'method': 'POST',
        'url': 'https://ebiz.thermofisher.com/EU/NLSU/2.0/index.php?action=submitInscriptionActivateScience',
        'headers': {
        },
        formData: {
            'emailAddress': emailAddress,
            'accountNumber': accountNumber,
            'firstName': firstName,
            'lastName': lastName,
            'company': company,
            'businessPhone': businessPhone,
            'address1': address1,
            'city': city,
            'address2': address2,
            'zipPostal': zipPostal,
            'country': country,
            'title': title,
            'language':  'French',
            'locale': 'fr_FR',
            'marketingCountry': 'FR'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
}

exports.registerActivateScience = async (req, res) => {
    const { emailAddress, accountNumber,  firstName, lastName,
        company, businessPhone, address1, city,
        address2, zipPostal, country, title,
    } = req.body;

    var options = {
        'method': 'POST',
        'url': 'https://ebiz.thermofisher.com/EU/NLSU/2.0/index.php?action=submitValidationActivateScience',
        'headers': {
        },
        formData: {
            'emailAddress': emailAddress,
            'accountNumber': accountNumber,
            'firstName': firstName,
            'lastName': lastName,
            'company': company,
            'businessPhone': businessPhone,
            'address1': address1,
            'city': city,
            'address2': address2,
            'zipPostal': zipPostal,
            'country': country,
            'title': title,
            'language':  'French',
            'locale': 'fr_FR',
            'marketingCountry': 'FR'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
}
