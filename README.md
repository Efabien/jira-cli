# jira-ify

## Description
A cli tool for jira interaction

## Prerequiste and configuration
You need to have node.js installed on your computer.
Then clone this repo and create a .env file at the root of the project.
There you will set the following lines:

`JIRA_EMAIL_ADDRESS=<your_email_address_used_in_jira>`<br>
`JIRA_TOKEN=<your_jira_token>`<br>
`JIRA_HOST=<your_jira_server_url>`

Generating your jira token by following this [link](https://id.atlassian.com/manage-profile/security/api-tokens)

## Instalation

Install the project globally :

```bash
npm install -g
```
## Usage

```bash
jira --help
```
`jira [command]`                                                               
                                                                                
`Commands:                                                                       
  jira issues [subCmd]   Commad relative to issues               
  jira project [subCmd]  Commad relative to project`

`Options:                                           
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -p, --project  project key on which the command applies               [string]
  -i, --issue    issue key on which the command applies                 [string]`

**View list of project**
```bash
jira project list
```
**View list of issues in one project**
```bash
jira issues list -p <project_key>
```
**Open one issue in the browser**
When invoqued from a git repo, this command attempt to open the issue in the browser,
assuming that the issue key matchs the git branch name.
The `-i` flag can be used to provide the issue key.
```bash
jira issues view
```


