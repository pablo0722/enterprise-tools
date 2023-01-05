/*****************************************************************************
 * PUBLIC FUNCTIONS
 *****************************************************************************/

function MirgorJiraGet() {
    let url = generateUrlGet({
        project: ['FAMPPLTDEV', 'FAMPVW', 'COMMONACT'],
        fields: ['summary'],
        limit: 1000,
        assignee: '620bdfd1f97d180071738aa0',
        openIssue: true,
        currentSprint: true
    });
    let response = JSON.parse(/*await*/ getJiraFromUrl(url));
    file.writeJSON('./logs/MyOpenSprintIssues.json', response);
    let issues = [];
    response.issues.forEach(e => {
        issues.push(`<${e.key}>: ${e.fields.summary}`);
    });
    print(issues)
}





/*****************************************************************************
 * PRIVATE FUNCTIONS
 *****************************************************************************/

function generateUrlGet(arg) {
    let apiUrl = 'https://mirgor-engineering.atlassian.net/rest/api/3/search';
    let request = apiUrl;
    let hasQuestion = false;
    let question = [];
    let hasJql = false;
    let jql = [];
    
    // Questions
    if(arg.limit) {
        hasQuestion = true;
        question.push(`maxResults=${arg.limit}`);
    }
    if(arg.fields != undefined) {
        if(arg.fields.length > 0) {
            question.push(`fields=${arg.fields.join(',')}`);
        } else {
            question.push(`fields=""`);
        }
    } else {
        if(arg.brief) {
            question.push(`fields=${commonFields.join(',')}`);
        }
    }
    
    // JQL
    if(arg.project) {
        let projects = [];
        arg.project.forEach(p => {
            projects.push(`${p}`);
        })
        hasQuestion = true;
        hasJql = true;
        jql.push(`(project=${projects.join('|project=')})`);
    }
    if(arg.assignee) {
        hasJql = true;
        hasQuestion = true;
        jql.push(`assignee=${arg.assignee}`);
    }
    if(arg.openIssue) {
        hasJql = true;
        hasQuestion = true;
        jql.push(`status=open`);
    }
    if(arg.currentSprint) {
        hasJql = true;
        hasQuestion = true;
        jql.push(`sprint IN openSprints()`);
    }
    
    if(hasQuestion) {
        if(hasJql) {
            question.push(`jql=${jql.join(' and ')}`);
        }
        request = `${request}?${question.join('&')}`;
    }
    
    return request;
}

function generateUrlPost(issueName) {
    let apiUrl = 'https://mirgor-engineering.atlassian.net/rest/api/3/issue';
    let request = `${apiUrl}/${issueName}/worklog`
    
    return request;
}

function encodeBase64(deencoded) {
    return btoa(deencoded);
}

async function getJiraFromUrl(url) {
    let ret = '';
    let email = 'rodrigo.dangelo@mirgor.com.ar';
    let apiKey = 'EryHFP2X53PVvSoucl1M1A9D';
    let deencoded = `${email}:${apiKey}`;
    let encoded = encodeBase64(deencoded);
    
    ret = await jiraApiGetData(url, 
        {
            'Authorization': `Basic ${encoded}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        });
    
    return ret;
}

async function postJiraFromUrl(url, data) {
    let ret = '';
    let email = 'rodrigo.dangelo@mirgor.com.ar';
    let apiKey = 'EryHFP2X53PVvSoucl1M1A9D';
    let deencoded = `${email}:${apiKey}`;
    let encoded = encodeBase64(deencoded);
    
    ret = await jiraApiPostData(url, data, 
        {
            'Authorization': `Basic ${encoded}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        });
    
    return ret;
}
