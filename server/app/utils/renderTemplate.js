const Handlebars = require("handlebars");

const renderTemplate = (templateContent, context) => {
    try {
        const template = Handlebars.compile(templateContent);
        return template(context);
    } catch (error) {
        console.error("Error rendering template:", error);
        return "";
    }
};

module.exports = { renderTemplate };
