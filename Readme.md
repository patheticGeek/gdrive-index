# Gdrive index

This lets you deploy a index server on heroku which serves files from your gdrive. It supports both gdrive and teamdrive.
As teamdrive links cannot be share with people out of the drive this will let you do it and this dosent have a limit on downloads from drive.

## Deploying

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/patheticGeek/gdrive-index)

## How to setup

New way:

1. Goto https://\<project name\>.herokuapp.com/setup
2. Goto https://developers.google.com/drive/api/v3/quickstart/nodejs and click on Enable the Drive API (when it asks for type of click select other) and get client id and client secret then paste those in the setup page
3. Fill out the rest and you'll see a table at the end telling you all the enviorment variables you need to set.
4. Goto setting page of your project on heroku and then in Config Vars section click Reveal Config Vars.
5. Add the config vars from the table onto heroku and wait 15-20sec before it starts up and you're good to go.

| Variable name                            | Value                                                                                                                           |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| CLIENT_ID                                | Client id your recived in step 2                                                                                                |
| CLIENT_SECRET                            | Client secret your recived in step 2                                                                                            |
| TOKEN                                    | Token you got in step 3                                                                                                         |
| PARENT_FOLDER (optional but recommended) | The id of the folder you want to be root of index                                                                               |
| AUTH (optional)                          | Username and password for index home (should be like username:password) share links will be available publically even with auth |
| SCOPE (optional)                         | Scope of the auth in array eg. ["https://www.googleapis.com/auth/drive"]                                                        |
