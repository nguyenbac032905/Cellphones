export const zodToAntFormErrors = (error: any) => {
    const issues = error.issues;

    const formErrors: Record<string, string[]> = {};

    issues.forEach((issue: any) => {
        const key = issue.path[0];
        if (!key) return;

        if (!formErrors[key]) {
            formErrors[key] = [];
        }

        formErrors[key].push(issue.message);
    });

    return formErrors;
};