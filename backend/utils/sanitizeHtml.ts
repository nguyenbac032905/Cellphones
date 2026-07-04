import sanitizeHtml from "sanitize-html";

export const sanitizeEditorContent = ( html: string ) => {
    return sanitizeHtml(html, {
        allowedTags: [ "p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "a", "img" ],

        allowedAttributes: {
            a: ["href", "target"],
            img: ["src", "alt"]
        },

        allowedSchemes: [
            "http",
            "https"
        ],

        allowedSchemesByTag: {
            img: ["http", "https"]
        },

        allowProtocolRelative: false,

        disallowedTagsMode: "discard"
    });
};