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

Generate your jira token by following this [link](https://id.atlassian.com/manage-profile/security/api-tokens)

## Instalation

Install the project globally :

```bash
npm install -g
```
## Usage

```bash
jira --help
```                                                  

**View list of project**
```bash
jira project list
```
**View list of issues in one project**
```bash
jira issue list -p <project_key>
```
The -s can be used to filter issues by status.
Ex :
``` bash
jira issue list -p <project_key> -s="In Progress"
```

**Open an issue in the browser**<br>
When invoqued from a git repo, this command attempt to open the issue in the browser,
assuming that the issue key matchs the git branch name.
The `-i` option can be used to provide the issue key.
```bash
jira issue view
```
