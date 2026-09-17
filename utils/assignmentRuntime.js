let assignmentTitle = '';

function setAssignmentTitle(title) {
    assignmentTitle = title.trim();
}

function getAssignmentTitle() {
    return assignmentTitle;
}

module.exports = { getAssignmentTitle, setAssignmentTitle };