# Gdrive index

This lets you deploy a index server on heroku which serves files from your gdrive. It supports both gdrive and teamdrive.
As teamdrive links cannot be share with people out of the drive this will let you do it and this dosent have a limit on downloads from drive.

## Deploying

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## How to setup
1. Deploy on heroku and add config vars of CLIENT_ID & CLIENT_SECRET manually.
2. To Generate values, Goto https://developers.google.com/drive/api/v3/quickstart/nodejs and click on Enable the Drive API (when it asks for type of click select Desktop) and you get CLIENT_ID & CLIENT_SECRET (Put these values in Step 1)
1. Now, Goto https://<Name of Your App>.herokuapp.com/setup
3. Fill out the rest and you'll be able to generate TOKEN value. Put this value in config vars manually.

You are done, GOTO https://<Name of Your App>.herokuapp.com and Enjoy 😍😍😍
  
  Put these OPTIONAL values if you want 👇👇👇

| Variable name                            | Value                                                                                                                           |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| CLIENT_ID                                | Client id your recived in step 2                                                                                                |
| CLIENT_SECRET                            | Client secret your recived in step 2                                                                                            |
| TOKEN                                    | Token you got in step 3                                                                                                         |
| PARENT_FOLDER (optional but recommended) | The id of the folder you want to be root of index                                                                               |
| AUTH (optional)                          | Username and password for index home (should be like username:password) share links will be available publically even with auth |
| SCOPE (optional)                         | Scope of the auth in array eg. ["https://www.googleapis.com/auth/drive"]                                                        |
