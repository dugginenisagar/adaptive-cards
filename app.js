const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const Adaptive = require('adaptivecards');
const { TextBlockConfig } = require('adaptivecards');

const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {

    let card = new Adaptive.AdaptiveCard();
    card.version = new Adaptive.Version(1, 0);

    let textBlock = new Adaptive.TextBlock();
    textBlock.text = "Hello World";
    textBlock.color = "Good";
    textBlock.size= "medium";
    textBlock.hostConfig = new TextBlockConfig.hostConfig({
        fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
        // More host config options
    });


    let image = new Adaptive.Image();
    image.url = 'https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg';
    
    

    card.addItem(textBlock);
    card.addItem(image);

    let json = card.toJSON();

    res.send(json);
});

app.get('/render', (req, res) => {
    var card = {
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "Image",
                "url": "http://adaptivecards.io/content/adaptive-card-50.png"
            },
            {
                "type": "TextBlock",
                "text": "Hello **Adaptive Cards!**"
            }
        ],
        "actions": [
            {
                "type": "Action.OpenUrl",
                "title": "Learn more",
                "url": "http://adaptivecards.io"
            },
            {
                "type": "Action.OpenUrl",
                "title": "GitHub",
                "url": "http://github.com/Microsoft/AdaptiveCards"
            }
        ]
    };
    // Create an AdaptiveCard instance
    var adaptiveCard = new Adaptive.AdaptiveCard();

    // Parse the card payload
    adaptiveCard.parse(card);
    console.log("Before");
    // Render the card to an HTML element:
    var renderedCard = adaptiveCard.render();
    console.log("After");
    // res.type('text/html');
    res.send(renderedCard.toJSON);
});

// starting the server
app.listen(8001, () => {
  console.log('listening on port 8001');
});