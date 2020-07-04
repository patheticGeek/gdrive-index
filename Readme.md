# Gdrive index

This lets you deploy a index server on heroku which serves files from your gdrive. It supports both gdrive and teamdrive.
As teamdrive links cannot be share with people out of the drive this will let you do it and this dosent have a limit on downloads from drive.

## Deploying

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/patheticGeek/torrent-aio-bot)

## How to setup

I wrote this in a hurry will update in future

1. Click on deploy to heroku button above and make a heroku project.
2. Goto https://developers.google.com/drive/api/v3/quickstart/nodejs and click on Enable the Drive API (when it asks for type of click select other) copy client id and set an enviorment variable in heroku with name CLIENT_ID then copy client secret and set another env named CLIENT_SECRET.
3. Goto https://torrent-aio-bot.herokuapp.com/drivehelp and generate your token set a env names TOKEN to its value.
4. Goto the setting then config vars section and click reveal config vars. You'll need to add the following variables:

| Variable name                            | Value                                                                                                                           |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| CLIENT_ID                                | Client id your recived in step 2                                                                                                |
| CLIENT_SECRET                            | Client secret your recived in step 2                                                                                            |
| TOKEN                                    | Token you got in step 3                                                                                                         |
| PARENT_FOLDER (optional but recommended) | The id of the folder you want to be root of index                                                                               |
| AUTH (optional)                          | Username and password for index home (should be like username:password) share links will be available publically even with auth |
| SCOPE (optional)                         | Scope of the auth in array eg. ["https://www.googleapis.com/auth/drive"]                                                        |
