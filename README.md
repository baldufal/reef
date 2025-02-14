# Reef

Reef is the Express-based backend server for [Shacktopus](https://github.com/baldufal/shacktopus).

You can either start it via the Docker Compose script in the [Shacktopus](https://github.com/baldufal/shacktopus) repository or set it up locally as described below. Either way you need to pull this repo and configure the config.json file (steps 1. and 2. below).

## Setting it up locally

As a prerequesite you need to have [Node JS](https://nodejs.org/) installed.
You also need to have an instance of [MongoDB](https://www.mongodb.com/try/download/community) running. You can either set it up yourself or use the instance contained in the docker compose script of [Shacktopus](https://github.com/baldufal/shacktopus). If you set it up yourself you need to configure the value of *fallback_mongo_url* in *reef/config/config.json*, otherwise you can ignore that.

1. Clone the repo using `git clone git@github.com:baldufal/reef.git` or `git clone https://github.com/baldufal/reef.git`
2. Create a config file in reef/config/. As a starting point you can rename a copy of *config.json.example* to *config.json*
3. Install the dependencies by executing `npm install` in the reef directory
4. Build and start the server using `npm run start`.

## config.json
| Key | Example Value  | Meaning  |
|---|---|---|
| port  | 8443  | The port on which reef is reachable  |
|  cli_log_level | http  |   |
|  file_logging  |  false | Write logs to file  |
|  file_log_level |  info |   |
|  admin_password |  |   |
|  token_expiry_seconds | 3600  | Time until the JWT is invalidated (= logout after inactivity)  |
|  jwt_secret |  | Choose a random secret  |
|  thermocontrol_mock  | true  | Mock the thermocontrol API  |
|  thermocontrol_polling_rate | 300  |   |
|  thermocontrol_url | http://10.0.2.2:9079  |   |
|  thermocontrol_key |   |   |
|  thermocontrol_aux_mock | true  |   |
|  thermocontrol_aux_polling_rate | 1000  |   |
|  thermocontrol_aux_url | http://10.0.2.2:9080  |   |
|  kaleidoscope_mock | true  |   |
|  kaleidoscope_polling_rate | 300  |   |
|  kaleidoscope_url | http://10.0.2.2:3545  |   |
|  fallback_mongo_url | mongodb://USER:PASSWORD@localhost:27017/user_management?authSource=admin | The environment valriable "MONGO_URI" takes precedence  |
