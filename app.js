const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { throwError } = require("rxjs");
const employeeDB = []

function menu (){

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is your id number?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is your email?',
            name: 'email',
        },
        {
            type: 'list',
            message: 'What is your job position?',
            name: 'role',
            choices: ["Manager", "Engineer", "Intern"]
        }

    ])
    .then(conditional)
}

//globally calling menu questions
menu()

//Specific questions to specific roles
function inquirerEngineer() {
    const promptArr = [{
        type: "input",
        message: "What is your github username?",
        name: "github"
    }]

    return inquirer.prompt(promptArr)
}
function inquirerIntern() {
    const promptArr = [{
        type: "input",
        message: "What school do you attend?",
        name: "school"
    }]
    return inquirer.prompt(promptArr)
}
function inquirerManager() {
    const promptArr = [{
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }]
    return inquirer.prompt(promptArr)
}
function createTeam() {
    const promptArr = [{
        type: "list",
        message: "Do you want to create the team?",
        name: "team",
        choices: ["yes", "no"]
    }]
    return inquirer.prompt(promptArr)
}

//CONDITIONALS
function conditional(userInput) {
    if (userInput.role === "Manager") {

        inquirerManager().then(function (response) {
            userInput.officeNumber = response.officeNumber
            let manager = new Manager(userInput.name, userInput.id, userInput.email, userInput.officeNumber)
            employeeDB.push(manager)

            createTeam().then(function(answer){
                if(answer.team === "yes"){
                   let teamHtml =  render(employeeDB)
                   fs.writeFile(outputPath, teamHtml,function(err){
                       if(err){
                           throw err
                       } 
                       console.log("Success!")
                   })
                }
                else {
                    menu()
                }
            })
        })

    } else if (userInput.role === "Intern") {
        inquirerIntern().then(function (response) {
            userInput.school = response.school
            let intern = new Intern(userInput.name, userInput.id, userInput.email, userInput.school)
            employeeDB.push(intern)

            createTeam().then(function(answer){
                if(answer.team === "yes"){
                   let teamHtml =  render(employeeDB)
                   fs.writeFile(outputPath, teamHtml,function(err){
                       if(err){
                           throw err
                       } 
                       console.log("Success!")
                   })
                }
                else {
                    menu()
                }
            })
        })
    } else if (userInput.role === "Engineer") {
        inquirerEngineer().then(function (response) {
            userInput.github = response.github
            let engineer = new Engineer(userInput.name, userInput.id, userInput.email, userInput.github)
            employeeDB.push(engineer)

            createTeam().then(function(answer){
                if(answer.team === "yes"){
                   let teamHtml =  render(employeeDB)
                   fs.writeFile(outputPath, teamHtml,function(err){
                       if(err){
                           throw err
                       } 
                       console.log("Success!")
                   })
                }
                else {
                    menu()
                }
            })
        })
    }
    
}
