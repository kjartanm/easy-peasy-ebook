const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const convertHTMLToPDF = require("pdf-puppeteer");

const featureDirPath = process.argv.pop();
const acitityFilePath = process.argv.pop();

const createHead = (metadata) => {
    return `
    <head>
        <title>${metadata.title}</div>
    </head>
`;
}

const createChapter = (chapter) => {
    return `
    <section>
    ${action.operation.reduce((acc,operation, idx)=> acc + createOperation(operation, idx), ``)}
    </section>
`;
}



const createOperation = (operation, operationIdx) => {
    return `
    <tr>
        <td>${operationIdx + 1}</td>
        <td>Scenario:</td>
        <td>${operation.intenttype + ' ' +  operation.operation_verbal}</td>
        <td></td>
    </tr>
    ${operation.condition.reduce((acc,condition, idx)=> acc + createCondition(condition, idx, operationIdx), ``)}
`;
}
const createCondition = (condition, condIdx, parentIdx) => {
    return `
    <tr>
        <td>${parentIdx + 1}.${condIdx + 1}</td>
        <td>${condition.conditionttype}</td>
        <td>${condition.criteria}</td>
        <td></td>
    </tr>
`;
}

const activityData = JSON.parse(fs.readFileSync(acitityFilePath, { encoding: 'utf8' }));

activityData.activity.map((activity, activityIdx) => {
    activity.action.map((action, actionIdx) => {
        const targetPath = path.join(featureDirPath, slugify(activity.activity_verbal) + '-' + slugify(action.action_verbal));
        let feature = `<html>
    <body>
        ${createFeature(action)}
    </body>
</html>
`;

        convertHTMLToPDF(feature, pdf=>{
            fs.writeFile(targetPath + '.pdf', pdf, 'binary', (err, data) => console.log(err ? err : "success: " + targetPath + '.pdf'));
        })

        fs.writeFile(targetPath + '.html', feature, 'utf-8', (err, data) => console.log(err ? err : "success: " + targetPath + '.html'));
    })
})
